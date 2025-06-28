import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTokenValidation } from "../hooks/useAuthValidation";
import Page from "../components/Page";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Validating token...");

  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const { isValid, isLoading, error } = useTokenValidation(token);

  useEffect(() => {
    if (!token) {
      setStatus("No token provided");
      navigate("/unauthenticated", { replace: true });
      return;
    }

    if (isLoading) {
      setStatus("Validating token...");
      return;
    }

    if (error) {
      console.error("Token validation error:", error);
      setStatus("Authentication failed");
      navigate("/unauthenticated", { replace: true });
      return;
    }

    if (isValid === true) {
      // Token is valid, save it to cookie
      document.cookie = `authToken=${token}; path=/; max-age=${
        60 * 60 * 24 * 365
      }`;
      setStatus("Authentication successful!");
      navigate("/", { replace: true });
    } else if (isValid === false) {
      setStatus("Invalid token");
      navigate("/unauthenticated", { replace: true });
    }
  }, [token, isValid, isLoading, error, navigate]);

  return <Page>{status}</Page>;
}
