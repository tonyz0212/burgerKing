import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const layout = (props) => (
    // having adjacent JSX element, we could use HOC to solve the issue. Another way to to use Array(But it needs the key attribute)
    <Aux>
        <Toolbar/>
        {<SideDrawer /> }
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>

);


export default layout;