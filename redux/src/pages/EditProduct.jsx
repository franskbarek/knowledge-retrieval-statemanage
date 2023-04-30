import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

export default function EditProduct() {
  const { updateProduct, products } = useContext(ProductsContext);

  const location = useLocation();

  const id = location.pathname.split("").splice(6).join("").split(" ")[0];

  const navigate = useNavigate();

  const initialTitle = products
    .filter((product) => id.includes(product.id))
    .map((el) => el.title)
    .reverse()[0];

  const [titleComponent, setTitleComponent] = useState(initialTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, titleComponent);
    navigate("/");
  };

  return (
    <div className="m-10">
      <div className="underline">Edit product</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Input title" value={titleComponent} onChange={(e) => setTitleComponent(e.target.value)} />
        <button type="submit" className="bg-green-500 p-1">
          Update
        </button>
      </form>
    </div>
  );
}
