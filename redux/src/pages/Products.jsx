import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, handleDelete, productSelectors } from "../redux/productsSlice";
import { useEffect } from "react";

const Products = function ProductsComponent() {
  const products = useSelector(productSelectors.selectAll);

  const dispatch = useDispatch();

  const onDelete = async (id) => {
    await dispatch(handleDelete(id));
    dispatch(getProducts());
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="m-10">
      <h1 className="underline">List barang:</h1>
      <button className="m-2 p-1 bg-green-500">
        <Link to="/add">Add new</Link>
      </button>

      {products.map((product, idx) => (
        <div key={idx} className="flex items-center">
          <p>
            {idx + 1}. {product.title}
          </p>
          <div className="flex">
            <button className="m-2 p-1 bg-orange-500">
              <Link to={`/edit/${product.id}`}>Edit</Link>
            </button>
            <button className="m-2 p-1 bg-red-600" onClick={() => onDelete(product.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
