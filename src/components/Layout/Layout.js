import React from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) => (
    // having adjacent JSX element, we could use HOC to solve the issue. Another way to to use Array(But it needs the key attribute)
    <Aux>
        <div> Toolbar, Sidedraw , backdrop </div>
        <main>
            {props.children}
        </main>
    </Aux>

);


export default layout;