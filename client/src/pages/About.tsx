import AboutComp from "../components/AboutComp"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const About = () => {
  return (
    <>
    <Navbar />
    <AboutComp />
    <Footer absolute={false} />
    </>
  )
}

export default About