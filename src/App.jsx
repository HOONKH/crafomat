import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Day from "./pages/day";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/:day" element={<Day />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
