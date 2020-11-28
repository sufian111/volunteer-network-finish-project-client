import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Login.css";
import Logo from "../../Image/logos/Group 1329.png";
import GoogleButton from "react-google-button";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { userContext } from "../../App";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const userInfo = {
          email: email,
          displayName: displayName,
          photo: photoURL,
        };
        setLoggedInUser(userInfo);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ textAlign: "center" }} className="">
        <Link to="/">
          <img style={{ width: "50%" }} src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="googlelogin">
        <GoogleButton onClick={googleLogin} />
      </div>
    </div>
  );
};

export default Login;
