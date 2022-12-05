import { BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import BookDetail from "./pages/BookDetail";
import UserDetail from "./pages/UserDetail";
import BooksCatalog from "./pages/BooksCatalog";
import UsersCatalog from "./pages/UsersCatalog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import NoRoute from "./components/NoRoute";
import BookUpload from "./pages/BookUpload";

function App() {
  return (
    <div className='pt-20 bg-slate-700 h-screen w-screen text-white'>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar/>          
          <Routes>
            {/* Private Routes */}
            <Route path="/" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/librarycommerce" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/book/:id" element={<PrivateRoute><BookDetail/></PrivateRoute>}/>
            <Route path="/bookUpload" element={<PrivateRoute><BookUpload/></PrivateRoute>}/>
            <Route path="/booksCatalog" element={<PrivateRoute><BooksCatalog/></PrivateRoute>}/>
            <Route path="/user/:id" element={<PrivateRoute><UserDetail/></PrivateRoute>}/>
            <Route path="/usersCatalog" element={<PrivateRoute><UsersCatalog/></PrivateRoute>}/>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/*" element={<NoRoute/>}/>            
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
