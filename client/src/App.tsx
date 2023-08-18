import './App.css'
import Footer from './components/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar'



function App() {

  return (
    <div className="bg-black mx-auto max-w-[1280px]">
      <Navbar />
      <Hero />
      <Footer />
    </div> 
  )
}

export default App
