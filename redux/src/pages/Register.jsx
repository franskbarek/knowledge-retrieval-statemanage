import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/usersSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (user) return navigate("/");
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password }));
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="m-2">
      <h1 className="flex underline">Register</h1>
      <form className="m-2 block items-center" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="flex border p-1" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="email" placeholder="Email" className="flex border p-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" className="flex border p-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" className="flex bg-teal-400 p-2">
          Register
        </button>
      </form>
    </div>
  );
}
