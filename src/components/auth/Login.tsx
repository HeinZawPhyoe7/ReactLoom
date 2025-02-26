import { useState } from "react";
import facLogo from "../../assets/facLogo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navgite = useNavigate();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleCreate = () => {
    navgite("/register");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email: email,
          password: password,
        }
      );

      console.log("Login successful:", response.data);
      if (response.data.access_token) {
        localStorage.setItem("accessToken", response.data.access_token);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-between bg-gray-200 h-screen">
      <div className="my-auto hidden md:block">
        <img src={facLogo} alt="" className="w-[320px] h-[106px] mx-auto" />
        <h4 className="w-1/2 mx-auto">
          Facebook helps you connect and share with the people in your life.
        </h4>
      </div>

      {/* right dev */}
      <div className="my-auto mx-auto">
        <div className="bg-gray-100 w-[400px] h-[400px] mx-auto space-y-4 p-10 rounded-md shadow">
          <div>
            <input
              type="email"
              onChange={handleEmailChange}
              placeholder="Email Address"
              className="p-4 border border-blue-400 rounded-md shadow-md w-full"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={handlePasswordChange}
              placeholder="Password"
              className="p-4 border border-blue-400 rounded-md shadow-md w-full"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 w-full rounded-md text-white p-2"
            >
              Log in
            </button>
          </div>
          <div>
            <p className="text-blue-500 text-center text-[12px] shadow p-2">
              Forgotten password?
            </p>
          </div>
          <div className="bg-green-400 flex justify-center rounded-md">
            <button className="text-gray-50 p-2 text-xs" onClick={handleCreate}>
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
