import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCollectionForPreview } from "./redux/shop/shop.selectors";
import './App.css';



// App component
class App extends React.Component
{
    // Function - unsubscribe the current user
    unsubscribeFromAuth = null;


    // Called when the component is first mounted
    componentDidMount()
    {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // If userAuth exists
            // Then set the state of currentUser
            if (userAuth)
            {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }
            else {
                setCurrentUser(userAuth);
            }
        });
    }


    // Called when the component is unmounted
    componentWillUnmount()
    {
        this.unsubscribeFromAuth();
    }


    // Rendering
    render()
    {
        return (
            <div>
                {/* Header */}
                <Header />

                {/* Switch ensure when one Route matches, remaining won't be rendered */}
                <Switch>
                    {/* Only the first component passing to the route has access to Route props:  */}
                    {/* history, location, match */}
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() =>
                        this.props.currentUser
                            ?
                        <Redirect to='/' />
                            :
                        <SignInAndSignUpPage />
                    } />
                </Switch>
            </div>
        );
    }
}


// Retrieve props from store
const mapStateToProps = createStructuredSelector({
    // Caching - Memoization

    // Same as currentUser: selectCurrentUser(state)
    // If state.user doesn't change, memoize currentUser
    currentUser: selectCurrentUser,
    collectionForPreview: selectCollectionForPreview
});

// Dispatch state to all Reducers
const mapDispatchToProps = dispatch => ({
    // setCurrentUser(user) - return an Action object
    // dispatch - packs up the argument as an Action object, and deliveries it to all Reducers
    setCurrentUser: user => dispatch(setCurrentUser(user))
});



export default connect(mapStateToProps, mapDispatchToProps)(App);