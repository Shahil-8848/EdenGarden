import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import HomePage from "./pages/HomePage";
import Teachers from "./pages/Teachers";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </div>
      <footer>
        <p>© 2023 Eden. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
