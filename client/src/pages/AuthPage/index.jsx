import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { useMessage } from "hooks/message.hook";
import { AuthContext } from "context/AuthContext";

import "./auth.css";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldError, setFieldError] = useState({
    emailError: "",
    passwordError: "",
  });
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const regexEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!form.email || reg.test(form.email) === false) {
      setFieldError({ ...fieldError, emailError: "Email field is Invalid" });
      return false;
    }
    return true;
  };

  const minLength = () => {
    if (form.password.length <= 5) {
      setFieldError({ ...fieldError, passwordError: "Min length 6 symbols" });
      return false;
    }
    return true;
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const registerHandler = async () => {
    try {
      if (minLength() || regexEmail()) {
        const data = await request("/api/auth/register", "POST", { ...form });
        message(data.message);
      }
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      if (minLength() || regexEmail()) {
        const data = await request("/api/auth/login", "POST", { ...form });
        auth.login(data.token, data.userId);
      }
    } catch (e) {}
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });

    if (fieldError.emailError || fieldError.passwordError) {
      setFieldError({
        emailError: "",
        passwordError: "",
      });
    }
  };

  return (
    <div className="rowAuth">
      <div className="wrappAuth">
        <div className="cardHeader">
          <p className="title">Shorten the Link</p>
        </div>
        <div className="cardBody">
          <form autoComplete="off">
            <div className="input-field ">
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={changeHandler}
                className="input-field"
              />
              <label htmlFor="email">Email</label>
              {fieldError.emailError.length !== 0 && (
                <span className="error-message">{fieldError.emailError}</span>
              )}
            </div>
            <div className="input-field ">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={changeHandler}
                className="input-field"
              />
              <label htmlFor="password">Password</label>
              {fieldError.passwordError !== 0 && (
                <span className="error-message">
                  {fieldError.passwordError}
                </span>
              )}
            </div>
          </form>
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
