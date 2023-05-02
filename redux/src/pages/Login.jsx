import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/usersSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (user) return navigate("/");
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="m-2">
      <h1 className="flex underline">Login</h1>
      <form className="m-2 block items-center" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="flex border p-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />

        <input type="password" placeholder="Password" className="flex border p-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />

        <p className="flex p-2 italic underline">
          <Link to="/register">Create new account</Link>
        </p>

        <button type="submit" className="flex bg-teal-400 p-2">
          Login
        </button>
      </form>
    </div>
  );
}
