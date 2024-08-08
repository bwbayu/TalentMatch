import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from "./pages/Home";
import Result from "./pages/Result";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}