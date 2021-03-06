import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MenuItem from "../menu-item/menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { DirectoryMenuContainer } from "./directory.styles";



// Directory component that contains all the Menu Items
const Directory = ({ sections }) => (
    <DirectoryMenuContainer>
        {/* Destructing */}
        {/* section -> { id, title, imageUrl, size, linkUrl } */}
        {/* ...otherProps - remaining properties in section with the same name passed through */}
        {sections.map(({ id, ...otherProps }) => (
            <MenuItem key={id} {...otherProps} />
        ))}
    </DirectoryMenuContainer>
);


// Retrieve props from store
const mapStateToProps = createStructuredSelector({
    // Caching - Memoization on Directory component

    // If state.directory doesn't change, memoize sections
    sections: state => selectDirectorySections(state)
});



export default connect(mapStateToProps)(Directory);