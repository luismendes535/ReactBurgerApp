import * as actionType from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (name)=>{
    return {
        type:actionType.ADD_INGREDINT,
        ingredientName: name
    }
}

export const removeIngredient = (name)=>{
    return {
        type:actionType.REMOVE_INGREDINT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients)=>{
    return{
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients    
    }
}

export const fetchIngredientsFailed = ()=>{
    return{
        type: actionType.FETCH_INGREDIENTS_FAIL
    } 
}

export const initIngredients = ()=>{
    return dispatch =>{
        axios
      .get("https://react-my-burguer-68df2.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data))
        // this.setState({ ingredients: response.data });
        // this.updatePrice(this.state.ingredients);
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
    });
  
    }
}
