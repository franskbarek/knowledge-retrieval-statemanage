import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async () => {
    const res = await axios.post("http://localhost:3000/products", { title: title });

    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setLoading(true);
    await addProduct();
    setLoading(false);
    navigate("/");
  };

  if (loading) {
    return <div className="text-center m-10">Loading...</div>;
  }

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
