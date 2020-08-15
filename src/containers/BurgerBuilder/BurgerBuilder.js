import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';

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
        canBuy : false,
        buying: false
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
 
    purchaseHandler = () => {
        // 这个 this 是undefined的 因为它是被 event trigger的
        this.setState({buying: true});
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

    cancelOrderHandler = () =>{
        this.setState({buying: false});
    }

    continuelOrderHandler = () =>{
        //alert('continue');
        const order = {
            ingredients: this.state.ingredients,
            price : this.state.totalPrice,
            customer: {
                name: 'Steve ',
                address:{
                    street:'Taiwan # one'
                },
                email: 'steveRankOne@gmail.com' 
            },
            delieveryMethod: 'Airplane'
        }
        axios.post('./orders.json',order).then( response => console.log(response))
            .catch(error => console.log(error ));

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
                <Modal show = {this.state.buying} modalClosed={this.cancelOrderHandler}> 
                    <OrderSummary 
                    cancelOrder ={this.cancelOrderHandler}
                    price = {this.state.totalPrice.toFixed(2)}
                    continueOrder={this.continuelOrderHandler}
                    ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientDeleted = {this.removeIngredientHandler}
                    disabled = {disableInfo}
                    buyable = {this.state.canBuy}
                    price = {this.state.totalPrice}
                    confirmed = {this.purchaseHandler}
                    />
            </Aux>
        );
    }
}


export default BurgerBuilder;