import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./App.css";
import { loginSuccess } from "./redux/auth/actions";

function App() {
  const dispatch = useDispatch();
  const responseGoogle = async (response: any) => {
    const tokenId = response?.tokenId;
    const res = await axios.post("/google-login", { id_token: tokenId });
    const { user, token } = res.data;
    localStorage.setItem("access_token", token);

    dispatch(loginSuccess(user));
  };

  axios.get("/movies");

  return (
    <div className="App">
      <GoogleLogin
        clientId="498733308217-ppkb1g8dscc5h5o5bkcqtvvjtske6ju1.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default App;
