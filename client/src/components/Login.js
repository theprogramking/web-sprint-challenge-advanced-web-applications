import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginFormInput, setLoginFormInput] = useState({});

  const handleInputChange = (e) => {
    setLoginFormInput({
      ...loginFormInput,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/login", loginFormInput)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblepage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={login}>
        Username:{" "}
        <input type="text" name="username" onChange={handleInputChange} />
        Password:{" "}
        <input type="password" name="password" onChange={handleInputChange} />
        <br />
        <button>Login</button>
        {JSON.stringify(loginFormInput)}
      </form>
    </>
  );
};

export default Login;
