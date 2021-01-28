import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { useMessage } from "hooks/message.hook";
import { AuthContext } from "context/AuthContext";

import "./auth.css";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="row">
      <div className="wrappAuth">
        <div className="cardHeader">
          <p className="title">Shorten the Link</p>
        </div>
        <div className="cardBody">
          <div className="input-field ">
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field ">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="cardFooter">
          <button
            type="submit"
            id="signup"
            className="authBtn"
            disabled={loading}
            onClick={loginHandler}
          >
            login
          </button>
          <button
            type="submit"
            id="signup"
            className="authBtn"
            onClick={registerHandler}
            disabled={loading}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
