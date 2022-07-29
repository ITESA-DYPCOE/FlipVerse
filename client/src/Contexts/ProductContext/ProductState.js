import React, { useReducer } from "react";
import axios from "axios";
// import { API } from "../../config";
import productReducer from "./productReducer";
import productContext from "./productContext";
// import { setAuthSellerToken } from "../../utils/setAuthToken";
import {
	GET_ALL_PRODUCTS,
	GET_SINGLE_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
} from "../types";

const ProductState = (props) => {
	const initialState = {
		allProducts: [],
		product: {},
		categorizedProducts: [],
	};

	const [state, dispatch] = useReducer(productReducer, initialState);

	const getSingleProduct = async (id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.get(`/api/product/${id}`, config);
			console.log(res);
			dispatch({ type: GET_SINGLE_PRODUCT, payload: res.data });
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const orderProduct = async (productId, walletAddress) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(
				`/api/product/purchase/${productId}`,
				{ walletAddress },
				config,
			);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllProducts = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.get("/api/products", config);
			console.log(res);
			dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};
	const getCategorizedProducts = async (name) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.get("/api/products/category", name, config);
			console.log(res);
			dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	return (
		<productContext.Provider
			value={{
				allProducts: state.allProducts,
				product: state.product,
				categorizedProducts: state.categorizedProducts,
				getSingleProduct,
				getAllProducts,
				orderProduct,
				getCategorizedProducts,
			}}
		>
			{props.children}
		</productContext.Provider>
	);
};

export default ProductState;
