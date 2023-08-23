import Calc from "../components/CalculatorComponents/Calc"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Calculator = () => {
  return (
    <>
      <Navbar />
      <Calc />
      <Footer absolute={false}/>
    </>
  )
}

export default Calculator