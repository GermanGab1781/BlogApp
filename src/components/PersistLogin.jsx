import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth, persist } = useAuth()

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    return () => isMounted = false;
  }, [auth,refresh])

  useEffect(() => {
    console.log(`is loading = ${isLoading}`)
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading,auth]) 

  return (
    <>
      {!persist
        ? children
        : isLoading 
          ? <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Loading your page!!!</div>
          : children
      }
    </>
  );
}

export default PersistLogin;
