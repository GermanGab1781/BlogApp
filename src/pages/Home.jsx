import { useState } from "react";
import { useEffect } from "react";
import ButtonHome from "../components/ButtonHome";
import UseAuth from "../hooks/useAuth";
import { motion } from 'framer-motion';

const Home = () => {
  const { auth } = UseAuth()
  const [pathProfile, setPathProfile] = useState(undefined)


  useEffect(() => {
    setPathProfile(`/user/${auth.UserId}`)
  }, [auth])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delayChildren: 0.4 }} className="flex flex-col place-items-center">
      {/* Title */}
      <h1 className="text-3xl mb-12">What can you do here??</h1>
      <motion.div className="flex flex-row flex-wrap gap-x-4 md:gap-y-0 gap-y-5 place-content-center">
        <ButtonHome delay={0.1} text="Upload Blog" path="/blogUpload" />
        <ButtonHome delay={0.2} text="Users Registered" path="/usersCatalog" />
        <ButtonHome delay={0.3} text="Feed" path="/blogsCatalog" />
        <ButtonHome delay={0.4} text="Check your profile" path={pathProfile} />
      </motion.div>
    </motion.div>
  );
}

export default Home;
