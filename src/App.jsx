import { BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import NoRoute from "./components/NoRoute";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar/>          
          <Routes>
            <Route path="/" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/librarycommerce" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/book/:id" element={<PrivateRoute><BookDetail/></PrivateRoute>}/>
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/*" element={<NoRoute/>}/>            
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
