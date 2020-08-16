import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
 
const orderSummary = (props) => {

    // Object.keys 会把object里的所有property name都弄出来，返回一个array
  
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => { 
           
            return <li key={igKey}> 
                <span style={{textTransform: 'capitalize'}}> {igKey} </span> :{props.ingredients[igKey]} 
                </li>;
         }
        );
    //<li> Salad: 1 </li>

    return (
        <Aux>
            <h3> Your Order </h3>
            <p> Ingredients you have added: </p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total price : ${props.price.toFixed(2)}</strong></p>
            <p> Continue to checkout. </p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}> Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}> Continue</Button>
        </Aux>
    )

};
export default orderSummary;