import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import RegisterPanel from "../components/RegisterPanel"

const Register = () => {
  return (
    <>
    <Navbar />
    <RegisterPanel />
    <Footer absolute={true} />
    </>
  )
}

export default Register