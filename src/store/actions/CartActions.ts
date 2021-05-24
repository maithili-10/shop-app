import { ProductType } from "../../types";

const ActionTypes = {
  ADD_TO_CART: "[Cart] Add to cart",
  REMOVE_ITEM: "[Cart] Remove item",
  INCREMENT: "[Cart] Increment",
  DECREMENT: "[Cart] Decrement",
  RESET: "[Cart] Reset"
};

const addToCart = (product: ProductType) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    product,
  };
};
const removeItem = (id: number) => {
  return {
    type: ActionTypes.REMOVE_ITEM,
    id,
  };
};

const incrementItem = (idno: number) => {
  return {
    type: ActionTypes.INCREMENT,idno,
  };
};
const decrementItem = (id:number) => {
  return {
    type: ActionTypes.DECREMENT,id,
  };
};

const reset = () => {
  return {
      type: ActionTypes.RESET,
  };
};
export default { ActionTypes, addToCart, removeItem,incrementItem,decrementItem ,reset};
