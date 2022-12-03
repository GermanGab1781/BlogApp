import { BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>          
          <Routes >
            <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/*" element={<div className="w-screen h-screen m-auto text-3xl">No route Matched</div>}/>
            <Route path="/librarycommerce" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/book/:id" element={<PrivateRoute><BookDetail/></PrivateRoute>}/>
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
