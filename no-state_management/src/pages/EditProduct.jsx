import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const location = useLocation();

  const id = location.pathname.split("")[6];

  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getProductById = async () => {
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    setTitle(res.data.title);
  };

  useEffect(() => {
    getProductById();
  }, []);

  const updateProduct = async () => {
    await axios.patch(`http://localhost:3000/products/${id}`, { title: title });
    getProductById();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setLoading(true);
    await updateProduct();
    setLoading(false);
    navigate("/");
  };

  if (loading) {
    return <div className="text-center m-10">Loading...</div>;
  }

  return (
    <div className="m-10">
      <div className="underline">Edit product</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Input title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit" className="bg-green-500 p-1">
          Update
        </button>
      </form>
    </div>
  );
}
