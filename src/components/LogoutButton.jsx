import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <button
      type="button"
      className="secondary-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
