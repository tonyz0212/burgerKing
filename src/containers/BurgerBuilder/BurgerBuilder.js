import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 1.5,
    cheese: 0.5,
    meat: 2,
    bacon : 2.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        // base price for the burger
        totalPrice : 1 

    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        // do it in the immutable way by using the spread operator.
        const updatedIngredients= {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice =this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) =>{
        
    }

    render() {
        return (
            <Aux>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls />
            </Aux>
            );
    }
}


export default BurgerBuilder;