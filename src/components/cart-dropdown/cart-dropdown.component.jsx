import React from 'react';
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import './cart-dropdown.styles.scss';



// Cart Dropdown component that contains all the Cart Items
const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem}  />
            ))}
        </div>
        <CustomButton>Go to Checkout</CustomButton>
    </div>
);


// Cart Dropdown component needs cartItems prop
// Retrieve props from store
const mapStateToProps = state => ({
    // Caching - Memoization on Cart Dropdown component
    cartItems: selectCartItems(state)
});



export default connect(mapStateToProps) (CartDropdown);