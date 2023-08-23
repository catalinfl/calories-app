import Footer from "../components/Footer"
import LoginPanel from "../components/LoginPanel"
import Navbar from "../components/Navbar"

const Login = () => {
  return (
    <> 
    <Navbar />
    <LoginPanel />
    <Footer absolute={true}/>
    </>
  )
}

export default Login