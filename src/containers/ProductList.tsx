import React from "react";
import Column from "../components/Column";
import Product from "../components/Product";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType, StoreType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import Paginate from "../components/Paginate";
import LoadingWrapper from "../components/LoadingWrapper";
import LoadingActions from "../store/actions/LoadingActions";
import { Slider } from "@material-ui/core";
import classes from "*.module.css";

type Props = {
  selectedCurrency: string;
  showLoader: () => void;
  hideLoader: () => void;
  addItem: (product: ProductType) => void;
  selecterSearch: string;
} & RouteComponentProps;
type State = { plist: ProductType[]; totalPages: number; pageNumber: number ; value: any; sortName: string;
  sortPrice: string;searchData: string;};
class ProductList extends React.Component<Props, State> {
  state: State = { plist: [], totalPages: 0, pageNumber: 1 , value: [0,30000],sortName: "productId",
  sortPrice: "ASC",searchData: "",};



  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps: any, prevState: { sortName: string; sortPrice: string; }) {
    // this.getData();
    if (this.props.selecterSearch !== prevProps.selecterSearch) {
      this.getData();
  }
    if (
        this.state.sortName !== prevState.sortName ||
        this.state.sortPrice !== prevState.sortPrice
    ) {
        this.getData();
    }
}




  async getData() {
    try {
      this.props.showLoader();
      const { data } = await ProductService.getProducts(
        this.state.pageNumber,
        this.state.value[0],
        this.state.value[1],
        this.state.sortName,
        this.state.sortPrice,
        this.props.selecterSearch,
        
        
        
        );
      this.setState({
        plist: data.data,
        totalPages: data.totalPages,
        pageNumber: data.currentPage,
      });
      this.props.hideLoader();
    } catch (e) {
      console.log("error", e);
      this.props.hideLoader();
    }
  }
  addToCart(product: ProductType) {
    this.props.addItem(product); // add to cart logic
    this.props.history.push("/cart"); // redirect to cart page
  }

  
  updateData = (page: number) =>
    this.setState({ pageNumber: page }, () => this.getData());

    range = ( newValue: any) => {
      this.setState({ value: newValue });
      this.getData();
  };
  changeRedux = () => {
    this.getData();
};

  sort = (e: any) => {
    
    if (e.target.value === "PriceLowHigh") {
      console.log(e.target.value);
      this.setState({ sortName: "productSalePrice" });
      this.setState({ sortPrice: "ASC" });
    } else if (e.target.value === "PriceHighLow") {
      console.log(e.target.value);
        this.setState({ sortName: "productSalePrice" });
        this.setState({ sortPrice: "DESC" });
    } else if (e.target.value === "NameLowHigh") {
      console.log(e.target.value);
        this.setState({ sortName: "productName" });
        this.setState({ sortPrice: "ASC" });
    } else if (e.target.value === "NameHighLow") {
      console.log(e.target.value);
        this.setState({ sortName: "productName" });
        this.setState({ sortPrice: "DESC" });
    } else {
      console.log(e.target.value);
        this.setState({ sortName: "productId" });
        this.setState({ sortPrice: "nodata" });
    }
};

  render() {

    return (

<>

<div className="w-100 mt-5">
  <Row>
  <Column size={2}>
  <Slider
                        max={30000}
                        value={this.state.value}
                        onChange={this.range}
                        
                    />
                    <h5 className="text-primary">
                        {this.state.value[0]}-{this.state.value[1]}
                    </h5>
                   

  </Column>
  <Column size={4}></Column>
  <Column size={4}></Column>
  <Column size={2}><select name="sort" id="sort" onChange={this.sort}>
                        <option value=""> FILTER </option>
                        <option value="PriceLowHigh">Price Low-High</option>
                        <option value="PriceHighLow">Price High-Low</option>
                        <option value="NameLowHigh">Name Ascend</option>
                        <option value="NameHighLow">Name Descend</option>
                    </select>

  </Column>
  </Row>
 
  
                    
                    </div>
                    
      <LoadingWrapper>
        <Row>
          {this.state.plist.map((val) => (
            <Column size={3} classes={"my-3"}>
              <Product
                btnClick={() => this.addToCart(val)}
                pdata={val}
                key={val.productId}
                currencyCode={this.props.selectedCurrency}
              />
            </Column>
          ))}
          <Column size={12} classes={"text-center"}>
            <Paginate
              totalPages={this.state.totalPages}
              currentPage={this.state.pageNumber}
              changePage={this.updateData}
            />
          </Column>
        </Row>
      </LoadingWrapper>
      </>
    );
  }
}
// connect(how to connect)(what to connect/component)
// store data can be accessed thru the props of the component
const mapStoreToProps = (store: StoreType) => {
  return {
    selectedCurrency: store.currency,// undefined => INR => USD
    selecterSearch: store.search
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
    addItem: (p: ProductType) => dispatch(CartActions.addToCart(p)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(ProductList);
