import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/productsSlice";
import { useDispatch } from "react-redux";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addProduct(title));
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
