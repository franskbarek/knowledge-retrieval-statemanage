import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ProductsContext } from "../context/ProductsContext";

export default function AddProduct() {
  const { addProduct } = useContext(ProductsContext);

  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(title);
    navigate("/");
  };

  return (
    <div className="m-10">
      <div className="underline">Add Product</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Input title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit" className="bg-green-500 p-1">
          Submit
        </button>
      </form>
    </div>
  );
}
