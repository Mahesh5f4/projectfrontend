import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import { Portfolio } from "./pages/Portfolio";
import SavedProjects from "./pages/Savedproject"; // make sure this exists
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ mt: 10, px: 3 }}>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/saved-projects" element={<SavedProjects />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
