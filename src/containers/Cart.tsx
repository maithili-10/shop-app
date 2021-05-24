
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";

import { CartType, StoreType,ProductType } from "../types";
import formatter from "../utils/formatter";

import Container from "../components/Container";

import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
  cart: CartType[];
   removeItem: (id: number) => void;
   increment: (id: number) => void;
    decrement: (id: number) => void;
  
} & RouteComponentProps;

type State = {
  TotalAmt: number;
  quantity: number;

}



class Cart extends Component<Props,State> {
  
  state: State = { TotalAmt: 0, quantity:1}
  componentDidMount() {
    this.TotalAfterAdd()
}


TotalAfterAdd() {
    this.props.cart.map((val) => {
        const total: number = parseInt(val.productSalePrice)
        this.setState((prevState) => ({ TotalAmt: prevState.TotalAmt + total}))
    })
}

TotalAfterRem(price:string) {
    const total: number = parseInt(price)
    this.setState((prevState) => ({ TotalAmt: prevState.TotalAmt - total }))
    
}

render() {
  let finalPrice:number=0;
    return (
      <Container>
        <Row>
          <Column size={4}>
            <div className=" text-center">
              <h1 className="display-5 fw-bold">My Cart</h1>
            </div>
          </Column>
        
        
          {this.props.cart.map((val) => (
            <Row>
            <Column size={4}>
               <div className="card text-center">
        
            <div className="card-body">
            <ImageWithFallback
                  source={val.productImage}
                  classes={"w-75 h-75 img-thumbnail rounded float-start"}
                />
                 <h5 className="mt-4">
             
             <>{<h5 className={"mt-4"}>
                 {formatter.titlecase(val.productName)}
               </h5>}</>
           </h5>
           <h5 className="mt-3">
           SalePrice-
             <>{val.productSalePrice}</>
           </h5>
           <h5 className="mt-3">
           Stock
             <>{val.productStock}</>
           </h5>
           <h5 className="mt-3">
           Price
             <>{val.productPrice}</>
           </h5>
            </div>
            <button className="btn btn-warning m-2"   onClick={() => this.props.decrement(val.productId)}>-</button>{val.productQty}
            <button className="btn btn-success m-2"   onClick={() => this.props.increment(val.productId)}>+</button>

            <button className="btn btn-sm btn-danger" onClick={() =>{
              
              
              this.props.removeItem(val.productId);
              this.TotalAfterRem(val.productSalePrice)
              }}>Remove</button>                   
                                        
                                            
          </div>
         </Column>
            <Column size={4}>
              <div className="card">
                <div className="card-body"><h4><b></b>
                    <p style={{"display":'none'}}> {
                            (finalPrice =
                              finalPrice +
                              this.state.TotalAmt  * val.productQty)
                          }</p>     
                        </h4> </div>
              </div>
            
            </Column>
            </Row>

           
            
          ))}
          <h4>FinalPrice:{finalPrice}</h4>
          
       
      
          <Column size={12}>
          
             
              <Link className="btn btn-sm btn-primary mx-auto mt-3" to={"/checkout"}>
                      checkout
                    </Link>

                  

            
          </Column>

          <Column size={12}>
          <Link className="btn btn-sm btn-primary mx-auto mt-3" to={"/products"}>
                      Back to Products
                    </Link>

          </Column>
          </Row>
       
      </Container>
    );
  }
}

const mapStateToProps = (store: StoreType) => {
  return {
    cart: store.cart,
    
   
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    
    removeItem: (id: number) => dispatch(CartActions.removeItem(id)),
    increment: (id:number ) => dispatch(CartActions.incrementItem(id)),
    decrement: (id:number ) => dispatch(CartActions.decrementItem(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);



