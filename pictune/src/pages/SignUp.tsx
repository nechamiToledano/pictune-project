import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "@/components/Api";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = async (data: { userName: string; email?: string; password: string }) => {
    try {
      // Send sign-up request to the backend
      await api.post("/auth/signup", data);
      
      // Redirect user to sign-in page after successful sign-up
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return <AuthForm defaultTab="signup" onAuthSubmit={handleSignUp} />;
};

export default SignUp;
