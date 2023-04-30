import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const Products = function ProductsComponent() {
  const { handleDelete, products } = useContext(ProductsContext);

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
            <button className="m-2 p-1 bg-red-600" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
