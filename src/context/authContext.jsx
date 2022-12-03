import { createContext,useContext} from "react";
import useLocalStorage from '../hooks/useLocalStorage'

export const AuthContext = createContext()

export function AuthContextProvider ({children}){
  const [userInfo,setUserInfo]= useLocalStorage("USER_INFO_LIBRARY_APP",[{username:undefined, id:undefined,email:undefined}])
  const [isAuthenticated,setIsAuthenticated] = useLocalStorage("USER_IS_AUTH_LIBRARY_APP",false)

  function login(username,id,email){
    setUserInfo({username:username, id:id, email:email})
    setIsAuthenticated(true)
  }
  function logout(){
    setUserInfo(undefined)
    setIsAuthenticated(false)
  }

  function isLogged(){
    return isAuthenticated
  }
  function userInformation(){
    if(isLogged()){
      return userInfo
    }
  }

  return <AuthContext.Provider value={{
    login,logout,isLogged,userInformation
  }}>   
    {children}
  </AuthContext.Provider>

}

export function useAuthContext(){
  return useContext(AuthContext)
}