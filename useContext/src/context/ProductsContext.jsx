import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  products: [],
  loading: false,
  error: null,
  title: "",
};

export const ProductsContext = createContext(INITIAL_STATE);

/**Products reducer */

const ProductsReducer = (state, action) => {
  switch (action.type) {
    // create
    case "ADD_START":
      return {
        title: "",
        loading: true,
        error: false,
      };
    case "ADD_SUCCESS":
      return {
        title: action.payload,
        loading: false,
        error: false,
      };
    case "ADD_FAILURE":
      return {
        title: "",
        loading: false,
        error: true,
      };

    // get all
    case "PRODUCTS_START":
      return {
        product: [],
        loading: true,
        error: false,
      };
    case "PRODUCTS_SUCCESS":
      return {
        products: action.payload,
        loading: false,
        error: false,
      };
    case "PRODUCTS_FAILURE":
      return {
        products: [],
        loading: false,
        error: true,
      };

    // get by id
    case "PRODUCT_START":
      return {
        products: [],
        loading: true,
        error: false,
      };
    case "PRODUCT_SUCCESS":
      return {
        products: state.products.map((product) => product.id === action.payload.id),
        loading: false,
        error: false,
      };
    case "PRODUCT_FAILURE":
      return {
        product: [],
        loading: false,
        error: true,
      };

    // update
    case "UPDATE_START":
      return {
        products: [],
        loading: false,
        error: false,
      };
    case "UPDATE_SUCCESS":
      return {
        products: state.products.map((product) => product.id === action.payload.id),
        loading: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        products: [],
        loading: false,
        error: true,
      };

    // delete
    case "DELETE_START":
      return {
        products: [],
        loading: true,
        error: false,
      };

    case "DELETE_SUCCESS":
      return {
        products: action.payload,
        loading: false,
        error: false,
      };

    case "DELETE_FAILURE":
      return {
        ...state,
        loading: true,
        error: true,
      };

    default:
      return state;
  }
};

/**Products provider */

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, INITIAL_STATE);

  const getProducts = async () => {
    try {
      dispatch({ type: "PRODUCTS_START" });
      const res = await axios.get("http://localhost:3000/products");
      dispatch({ type: "PRODUCTS_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "PRODUCTS_FAILURE", payload: err.res.data });
    }
  };

  const addProduct = async (title) => {
    try {
      dispatch({ type: "ADD_START" });
      const res = await axios.post("http://localhost:3000/products", { title: title });
      dispatch({ type: "ADD_SUCCESS", payload: res.data });
      getProducts();
    } catch (err) {
      dispatch({ type: "ADD_FAILURE", payload: err.res.data });
    }
  };

  // Get Product by id

  const getProductById = async (id) => {
    try {
      dispatch({ type: "PRODUCT_START" });
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      dispatch({ type: "PRODUCT_SUCCESS", payload: res.data.id });
    } catch (err) {
      dispatch({ type: "PRODUCT_FAILURE", payload: err.res.data });
    }
  };

  // Update product

  const updateProduct = async (id, title) => {
    try {
      dispatch({ type: "UPDATE_START" });
      const res = await axios.patch(`http://localhost:3000/products/${id}`, { title: title });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      getProducts();
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE", payload: err.res.data });
    }
  };

  const handleDelete = async (id) => {
    dispatch({ type: "DELETE_START" });
    try {
      const res = await axios.delete(`http://localhost:3000/products/${id}`);
      dispatch({ type: "DELETE_SUCCESS", payload: res.data });
      getProducts();
    } catch (err) {
      dispatch({ type: "DELETE_FAILURE", payload: err.res.data });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (state.loading) {
    return <div className="text-center m-10">Loading..</div>;
  }

  return (
    <ProductsContext.Provider
      value={{
        title: state.title,
        updateProduct,
        getProductById,
        addProduct,
        getProducts,
        handleDelete,
        products: state.products,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
