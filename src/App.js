import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Environment from "./pages/Environment";
import ProtectedRoute from "./hooks/useProtectedRoute";
import Auth from "./pages/Auth";
import Page from "./components/Page";

function App() {
  return (
    <Router>
      <Page>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory/:id"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/environment"
            element={
              <ProtectedRoute>
                <Environment />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Page>
    </Router>
  );
}

export default App;
