import React, { useState } from "react";
import { Facebook, Google, Herobg } from "../../Componenet";
import loader from "../../Assets/f606cbf26c0a18898b96ef6857953a75.gif";
import IMG from "../../Assets/River-inspired Japanese library becomes a favorite meeting point for kids.jfif";
import "./Register.scss";
 import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/reducer/authenticationSlice";

export const Register = () => {
  const { loading, user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  console.log(user);

  const submitHandler = (ev) => {
    ev.preventDefault();
    dispatch(
      register({
        username,
        email,
        password,
      })
    );
  };
  //return <Loading/>
  if (loading) return <img src={loader} alt="loader"/>;
  return (
    <div>
      <Herobg
        title1="Sign Up"
        title2="join us to read any type of book that you want"
        img={IMG}
        page="SignUp"
      />
      <div className="register_page">
        <form onSubmit={submitHandler}>
          <h1>Sign up</h1>
          <span className="sub-heading"></span>
          <input
            type="text"
            placeholder="Your Name"
            className="field"
            onChange={(ev) => setName(ev.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className="field"
            required
          />
          <input
            type="password"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
            className="field"
            required
          />

          <div className="login_icons">
            <p>OR Sign Up With</p>
            <div className="login-icon">
              <Facebook />

              <Google />
            </div>
          </div>
          <button className="btn">Sign In</button>
          <p className="dont-have-account">
            allready have an account <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
