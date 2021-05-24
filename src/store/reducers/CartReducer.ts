import { CartType, ProductType } from "../../types";
import { Action } from "redux";
import CartActions from "../actions/CartActions";
type IAction = {
  product: ProductType;
  id: number;
  idno:number;
} & Action;
// state : initialise, immutable
function cartReducer(store: CartType[] = [], action: IAction) {
  switch (action.type) {
    case CartActions.ActionTypes.ADD_TO_CART:
      return [...store, { ...action.product, productQty: 1 }];
    case CartActions.ActionTypes.REMOVE_ITEM:
      return store.filter((prod) => prod.productId !== action.id);

      case CartActions.ActionTypes.INCREMENT:
      return (store.map((prod) => {
        if (prod.productId === action.idno) {
          prod.productQty++
         }
         return prod
    }));
    
    case CartActions.ActionTypes.DECREMENT:
      return (store.map((prod) => {
        if (prod.productId === action.id) {
          prod.productQty--
        }
        return prod
      }));

      case CartActions.ActionTypes.RESET:
            return [];
    default:
      return store;
  }
}
export default cartReducer;
