import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";

export function useAuthValidation() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = getCookie("authToken");
    if (!token) {
      setIsValid(false);
      return;
    }
    fetch("https://studio-infra-server.fcc.lol/validate-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then((res) => res.json())
      .then((data) => setIsValid(data.valid))
      .catch(() => setIsValid(false));
  }, []);

  return isValid;
}

export function useTokenValidation(token) {
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch("https://studio-infra-server.fcc.lol/validate-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then((res) => res.json())
      .then((data) => {
        setIsValid(data.valid);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsValid(false);
        setIsLoading(false);
      });
  }, [token]);

  return { isValid, isLoading, error };
}
