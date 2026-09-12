import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <a href="/" className="logo">
        RFQ<span>·</span>
      </a>

      <div className="nav-links">
        {user ? (
          <>
            <a href={user.role === "BUYER" ? "/buyer" : "/supplier"}>
              Dashboard
            </a>
            {user.role === "SUPPLIER" && <a href="/my-quotes">My Quotes</a>}
            {user.role === "BUYER" && <a href="/rfqs/new">Create RFQ</a>}
            <button type="button" className="signup-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login">Sign In</a>
            <a href="/register" className="signup-btn">
              Get Started <span>↗</span>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default AppNavbar;
