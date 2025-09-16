import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    // const found = users.find(
    //   (value) => value.email === user.email && value.pass === user.pass
    // );
    e.preventDefault();
    const url = `${API}/users/login`;
    const found = await axios.post(url, user);

    if (found.data.token) {
      setUser({ ...found.data.result, token: found.data.token });
      Navigate("/");
    } else {
      setMsg("Invalid User or Password");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="auth-form">
      <h3>Login</h3>
      {msg}
      <p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <p>
        <button type="button" onClick={goToRegister}>
          Create Account
        </button>
      </p>
    </div>
  );
}