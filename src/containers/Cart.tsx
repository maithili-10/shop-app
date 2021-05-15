
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";

import { CartType, StoreType } from "../types";
import formatter from "../utils/formatter";

import Container from "../components/Container";

import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
  cart: CartType[];
  qty: number;
 
  removeItem: (id: number) => void;
  
  

} & RouteComponentProps;
type State = {
  qty: number;
};
class Cart extends Component<Props> {
 
  state: State = {
    qty: this.props.qty,
  };

  incrementQty = () => {
    this.setState({
      qty: this.state.qty + 1,
    });
  };
  decrementQty = () => {
    this.setState({
      qty: this.state.qty - 1,
    });
  };
  

  removeItem(id: number) {
    this.props.removeItem(id); // add to cart logic
    
  }
   

   

 
 

  
  
  render() {
    return (
      <Container>
        <Row>
          <Column size={4}>
            <div className=" text-center">
              <h1 className="display-5 fw-bold">My Cart</h1>
            </div>
          </Column>
        
        
          {this.props.cart.map((val) => (
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
            <button className="btn btn-warning m-2"onClick={this.decrementQty}>-</button>{this.state.qty}
            <button className="btn btn-success m-2"onClick={this.incrementQty}>+</button>

            <button className="btn btn-sm btn-danger" onClick={() => this.props.removeItem(val.productId)}>Remove</button>                   
                                        
                                            
          </div>
         
                                           
            </Column>
          ))}
          <Column size={4}>

          </Column>
       
      
          <Column size={12}>
          
              <h4>TotalPrice:{}</h4>
              <button className="btn btn-sm btn-primary">Check Out</button>
            
          </Column>
          </Row>
       
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    cart: state.cart,
    
   
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    
    removeItem: (id: number) => dispatch(CartActions.removeItem(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);



