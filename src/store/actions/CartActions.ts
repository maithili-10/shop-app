import { ProductType } from "../../types";

const ActionTypes = {
  ADD_TO_CART: "[Cart] Add to cart",
  REMOVE_ITEM: "[Cart] Remove item",
  INCREMENT: "[increment]",
  DECREMENT: "DEC",
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

const incrementItem = () => {
  return {
    type: ActionTypes.INCREMENT,
  };
};
const decrementItem = () => {
  return {
    type: ActionTypes.DECREMENT,
  };
};
export default { ActionTypes, addToCart, removeItem,incrementItem,decrementItem };
