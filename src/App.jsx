import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/librarycommerce" element={<Home/>}/>
          <Route path="/book/:id" element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
