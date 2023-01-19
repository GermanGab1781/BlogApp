import { useState } from "react";
import { useEffect } from "react";
import ButtonHome from "../components/ButtonHome";
import UseAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = UseAuth()
  const [pathProfile, setPathProfile] = useState(undefined)
  

  useEffect(() => {
    setPathProfile(`/user/${auth.UserId}`)
  }, [auth])

  return (
    <div className="flex flex-col place-items-center">
      {/* Title */}
      <h1 className="text-3xl mb-12">What can you do here??</h1>
      <div className="flex flex-row flex-wrap gap-x-4  place-content-center">
        <ButtonHome text="Upload Blog" path="/blogUpload" />
        <ButtonHome text="Users Registered" path="/usersCatalog" />
        <ButtonHome text="Feed" path="/blogsCatalog" />
        <ButtonHome text="Check your profile" path={pathProfile} />
      </div>
    </div>
  );
}

export default Home;
