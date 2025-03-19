import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "@/components/Api";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = async (data: { userName: string, password: string }) => {
    try {
      // Send sign-in request to the backend
      const res = await api.post<{ token: string }>(
        "/auth/signin", 
        data
      );

      // Store the JWT token in localStorage
      localStorage.setItem("token", res.data.token);
      
      // Redirect to dashboard or another page
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return <AuthForm defaultTab="signin" onAuthSubmit={handleSignIn} />;
};

export default SignIn;
