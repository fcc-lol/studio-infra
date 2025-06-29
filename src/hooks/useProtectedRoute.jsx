import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthValidation } from "./useAuthValidation";

export default function ProtectedRoute({ children }) {
  const isValid = useAuthValidation();

  if (isValid === null) return;
  if (!isValid) return <Navigate to="/" replace />;

  return children;
}
