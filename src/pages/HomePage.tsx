import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/Dashboard";

const HomePage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    if (!email) navigate("/", { replace: true });
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    navigate("/", { replace: true });
  };

  if (!email) return null;

  return <Dashboard email={email} onLogout={handleLogout} />;
};

export default HomePage;
