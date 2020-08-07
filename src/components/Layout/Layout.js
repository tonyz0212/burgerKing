import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'

const layout = (props) => (
    // having adjacent JSX element, we could use HOC to solve the issue. Another way to to use Array(But it needs the key attribute)
    <Aux>
        <div> Toolbar, Sidedraw , backdrop </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>

);


export default layout;