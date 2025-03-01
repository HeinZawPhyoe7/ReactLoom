import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navgite = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    console.log(accessToken);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Logout successful:", response.data.message);
      if (response.data.message == "Successfully logged out") {
        navgite("/login");
        console.log("arrive here");
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <button className="cursor-pointer" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
