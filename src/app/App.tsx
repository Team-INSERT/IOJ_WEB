import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Main } from "../pages/main/ui/page/Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
