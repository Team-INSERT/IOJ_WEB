import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Main } from "../pages/main/ui/page/Page";
import { Login } from "@/pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
