import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./App.css";
import { loginSuccess } from "./redux/auth/actions";

function App() {
  const dispatch = useDispatch();
  const responseGoogle = async (response: any) => {
    const tokenId = response?.tokenId;
    const res = await axios.post("/user/google-login", { id_token: tokenId });
    const { user, token } = res.data;
    localStorage.setItem("access_token", token);

    dispatch(loginSuccess(user));
  };

  axios.get("/book");

  return (
    <div className="App">
      <GoogleOAuthProvider clientId="31611394858-kgo9mn1ei3fjrtsk50ic7hsk4j5ffmdr.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => responseGoogle}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
