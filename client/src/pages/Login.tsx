import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../redux/auth/actions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (response: any) => {
    const tokenId = response?.credential;
    const res = await axios.post("/user/google-login", { id_token: tokenId });
    const { user, token } = res.data;
    if (res.status === 200) {
      navigate("/");
    }
    localStorage.setItem("access_token", token);
    dispatch(loginSuccess(user));
  };
  return (
    <div>
      <h1>Login with google</h1>
      <GoogleOAuthProvider clientId="31611394858-kgo9mn1ei3fjrtsk50ic7hsk4j5ffmdr.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(response) => responseGoogle(response)}
          onError={() => console.log("Login failed!")}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;
