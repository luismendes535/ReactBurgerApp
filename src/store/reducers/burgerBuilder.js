import * as actionType from "../actions/actionTypes";
import {updateObject} from '../utility';

const initialState = {
  ingredients: null,  
  totalPrice: 4,
  error: false
};
const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 0.7
  };
  
const addIngredient = (state, action)=>{
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] +1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updateState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
      return updateObject(state, updateState);
}  

const removeIngredient =(state, action)=>{
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updateSt = {
      ingredients: updatedIngs,
      totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    }
      return updateObject(state, updateSt);  
}
const setIngredients =(state, action)=>{
  return updateObject(state,{
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false 
  })

}
const fetchIngredientsFail =(state)=>updateObject(state, {error:true})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDINT: return addIngredient(state, action);
    case actionType.REMOVE_INGREDINT: return removeIngredient(state, action)
    case actionType.SET_INGREDIENTS: return setIngredients(state, action)
    case actionType.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state)
    default: return state; 
  }
};

export default reducer;
