import axios from "axios";
import constants from "../constants";
import { ProductResponseType, ProductType } from "../types";

const getProducts = (page = 1, minPrice:any,
  maxPrice:any,sortName:any,
  sortPrice:any,
  searchData: any,) => {
  const url = `${constants.BASE_URL}/product?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortName=${sortName}&sortPrice=${sortPrice}&searchData=${searchData}`;
  console.log(sortName,sortPrice);
  return axios.get<ProductResponseType>(url);
};

const getProductById = (id: string) => {
  const url = `${constants.BASE_URL}/product/${id}`;
  return axios.get<ProductType>(url);
};

export default { getProducts, getProductById };
