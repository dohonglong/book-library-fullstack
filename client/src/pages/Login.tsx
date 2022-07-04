import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../redux/auth/actions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (response: any) => {
    const tokenId = response?.tokenId;
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
      <GoogleLogin
        clientId="31611394858-kgo9mn1ei3fjrtsk50ic7hsk4j5ffmdr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
