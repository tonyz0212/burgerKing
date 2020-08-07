import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 1.5,
    cheese: 0.5,
    meat: 2,
    bacon: 2.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        // base price for the burger
        totalPrice: 1,
        canBuy : false
    }

    updatePurchaseState (){
        const ingredients = {
            ...this.state.ingredients
        };
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum +el;
        }, 0);
        this.setState({canBuy: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // do it in the immutable way by using the spread operator.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        // do it in the immutable way by using the spread operator.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceMinus = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceMinus;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    render() {
        const disableInfo = {  
            ...this.state.ingredients

        };
        for( let key in disableInfo){
            disableInfo[key] =disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientDeleted = {this.removeIngredientHandler}
                    disabled = {disableInfo}
                    buyable = {this.state.canBuy}
                    price = {this.state.totalPrice}
                    />
            </Aux>
        );
    }
}


export default BurgerBuilder;