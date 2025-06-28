import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryItem from "./pages/InventoryItem";
import Environment from "./pages/Environment";
import ProtectedRoute from "./hooks/useProtectedRoute";
import Page from "./components/Page";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page>Studio Infra</Page>} />
        <Route
          path="/inventory/:id"
          element={
            <ProtectedRoute>
              <InventoryItem />
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
        <Route
          path="/unauthenticated"
          element={<Page>Tap NFC tag near studio door to set auth token!</Page>}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
