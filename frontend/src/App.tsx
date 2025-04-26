import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout></Layout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
