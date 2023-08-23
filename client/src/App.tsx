import './App.css'
import Footer from './components/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar'



function App() {

  return (
    <> 
      <Navbar />
      <Hero />
      <Footer absolute={false}/>
    </>
  )
}

export default App
