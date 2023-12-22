import React, { useState } from "react";
import "../auth.css";
import axios from "axios";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const cookies = Cookie();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const user = { email, password };
  
    axios.post("http://localhost:8000/api/login", user)
      .then(response => {
        cookies.set("login_token", response.data.token);
        return response;
      })
      .then(response => {
        navigate("/dashboard/fournisseur");
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la connexion :', error);
      });
  };
  return (
    <div className="l">
      <div className="a">
        <h3>LOGIN</h3>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="form2Example1"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="form2Example2"
              className="form-control"
            />
          </div>

          <div className="row mb-1"></div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={login}
              className="btn btn-primary btn-block mb-4"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
