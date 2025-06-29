import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTokenValidation } from "../hooks/useAuthValidation";
import { getCookie } from "../utils/cookies";
import { Card, Title, Icon } from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const AuthStatus = styled.div`
  font-size: 1.75rem;
  line-height: 2.5rem;
  font-weight: normal;
  padding-right: 1rem;
  text-align: left;
  margin-top: 1rem;

  ${({ $isLoading }) =>
    $isLoading &&
    `
      opacity: 0.5;
    `}
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("loading");
  const [statusText, setStatusText] = useState("Validating token...");

  const params = new URLSearchParams(location.search);
  const urlToken = params.get("token");
  const cookieToken = getCookie("authToken");
  const token = urlToken || cookieToken;

  const { isValid, isLoading, error } = useTokenValidation(token);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setStatusText("Tap NFC tag to authenticate");
      navigate("/", { replace: true });
      return;
    }

    if (isLoading) {
      setStatus("loading");
      setStatusText("Loading...");
      return;
    }

    if (error) {
      console.error("Token validation error:", error);
      setStatus("error");
      setStatusText("Authentication failed");
      navigate("/", { replace: true });
      return;
    }

    if (isValid === true) {
      document.cookie = `authToken=${token}; path=/; max-age=${
        60 * 60 * 24 * 365
      }`;
      setStatus("success");
      setStatusText("Authenticated");
      navigate("/", { replace: true });
    } else if (isValid === false) {
      setStatus("error");
      setStatusText("Invalid token");
      navigate("/", { replace: true });
    }
  }, [token, isValid, isLoading, error, navigate]);

  return (
    <Cards>
      <Card $status={status}>
        <Title>Studio Infra</Title>
        <AuthStatus $isLoading={isLoading}>{statusText}</AuthStatus>
      </Card>
      {status === "success" && (
        <>
          <Card $isClickable={true} onClick={() => navigate("/inventory")}>
            <Icon>
              <FontAwesomeIcon icon={fas["faBox"]} />
            </Icon>
            <Title>Inventory</Title>
          </Card>
          <Card $isClickable={true} onClick={() => navigate("/environment")}>
            <Icon>
              <FontAwesomeIcon icon={fas["faSun"]} />
            </Icon>
            <Title>Environment</Title>
          </Card>
        </>
      )}
    </Cards>
  );
}
