import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center m-10">Loading..</div>;
  }

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
}
