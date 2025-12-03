import React, { useState } from "react";
import { Loading,Facebook, Google, Herobg } from "../../Componenet";
import IMG from "../../Assets/River-inspired Japanese library becomes a favorite meeting point for kids.jfif";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";

import { BiLogoFacebook, BiLogoGmail, BiLogoLinkedin } from "react-icons/bi";
import { login } from "../../store/reducer/authenticationSlice";
import { Link } from "react-router-dom";
export const Login = () => {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.authentication);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  console.log(user);
  const submitHandler = (ev) => {
    ev.preventDefault();
    dispatch(
      login({
        email,
        password,
      })
    );
  };
  if (loading) return <Loading />;

  return (
    <div>
      <Herobg
        title1="Sign In"
        title2="join us to read any type of book that you want"
        img={IMG}
        page="Login"
      />
      <div className="login_page">
        <form onSubmit={submitHandler}>
          <h1>Sign in</h1>
          <span className="sub-heading"></span>
          <input
            type="email"
            placeholder="Your email"
            className="field"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
            className="field"
          />
          <div className="forget">
            <span>
              {" "}
              <input type="checkbox" />
              Remember me
            </span>
            <span className="forget_password">Forget password</span>
          </div>
          <div className="login_icons">
            <p>OR Login With</p>
          
            <div className="login-icon">
                <Facebook/>
            
            <Google />
             </div>
            
          </div>
          <button className="btn">Sign In</button>
          <p className="dont-have-account">don't have an account <Link to="/register">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};
