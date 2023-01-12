import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get('/api/users/refreshToken', {
      withCredentials: true
    })
    console.log(response)
    setAuth(prev => {
      return { 
        ...prev, 
        username:response.data.username,
        role:response.data.role,
        accessToken: response.data.accessToken,
        UserId:response.data.UserId
      }
    })
    return response.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken;