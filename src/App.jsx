import { BrowserRouter, Route, Routes} from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import UserDetail from "./pages/UserDetail";
import BlogsCatalog from "./pages/BlogsCatalog";
import UsersCatalog from "./pages/UsersCatalog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import NoRoute from "./components/NoRoute";
import BlogUpload from "./pages/BlogUpload";
import PersistLogin from "./components/PersistLogin";


function App() {
  return (
    <div className='pt-20 bg-slate-700 min-h-screen min-w-screen text-white'>
      <BrowserRouter>
          <Navbar/>          
          <Routes>
            {/* Private Routes */}
            <Route path="/home" element={<PersistLogin><PrivateRoute><Home/></PrivateRoute></PersistLogin>}/>
            <Route path="/librarycommerce" element={<PersistLogin><PrivateRoute><Home/></PrivateRoute></PersistLogin>}/>
            <Route path="/blog/:id" element={<PersistLogin><PrivateRoute><BlogDetail/></PrivateRoute></PersistLogin>}/>
            <Route path="/blogUpload" element={<PersistLogin><PrivateRoute><BlogUpload/></PrivateRoute></PersistLogin>}/>
            <Route path="/blogsCatalog" element={<PersistLogin><PrivateRoute><BlogsCatalog/></PrivateRoute></PersistLogin>}/>
            <Route path="/user/:id" element={<PersistLogin><PrivateRoute><UserDetail/></PrivateRoute></PersistLogin>}/>
            <Route path="/usersCatalog" element={<PersistLogin><PrivateRoute><UsersCatalog/></PrivateRoute></PersistLogin>}/>
            
            {/* Public Routes */}
            <Route path="/login" element={<PersistLogin><PublicRoute><Login/></PublicRoute></PersistLogin>}/>
            <Route path="/" element={<PersistLogin><PublicRoute><Login/></PublicRoute></PersistLogin>}/>
            <Route path="/BlogApp" element={<PersistLogin><PublicRoute><Login/></PublicRoute></PersistLogin>}/>
            <Route path="/*" element={<PersistLogin><PublicRoute><NoRoute/></PublicRoute></PersistLogin>}/>            
          </Routes>  
      </BrowserRouter>
     
    </div>
  );
}

export default App;
