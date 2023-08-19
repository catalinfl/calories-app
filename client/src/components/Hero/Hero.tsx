import Info from './Info'
import Photo1 from "../../assets/photos/photo1.jpg"
import Photo2 from "../../assets/photos/photo2.jpg"
import Photo3 from "../../assets/photos/photo3.jpg"
import Brocolli from '../../assets/photos/broccoli.png'
import Milk from '../../assets/photos/milk.png'
import { useEffect } from 'react'

const Hero = () => {

  const randomPhoto = (): string | null => {
    const random = Math.floor(Math.random() * 3) + 1
    switch(random) {
      case 1:
        return Photo1
      case 2:
        return Photo2
      case 3:
        return Photo3
      default:
        return null
  }
}


  useEffect(() => {
    randomPhoto()
  }, [])

  return (
    <div className="hero max-w-[1280px] flex flex-col bg-primary mt-4 mx-auto p-5 rounded-lg justify-center">
        <div className="presentation flex my-4 px-8 py-16 rounded-lg max-w-[1200px] bg-base-100 sm:flex-row flex-col">
          <div className="leftPart flex flex-col sm:w-[50%] w-[100%]"> 
          <p className="text-5xl"> <span className="font-bold bg-gradient-to-r from-lime-500 to-purple-600 bg-clip-text text-transparent"> Calculate </span> your <span className="font-bold bg-gradient-to-r from-purple-600 to-lime-500 bg-clip-text text-transparent"> calories </span> </p>
          <p className="text-5xl mt-3" > Lose a few kilos. </p>
            <div className="flex flex-col justify-center items-center h-[50%]"> 
              <div className="mt-16 flex flex-row"> 
                <img src={Brocolli} className="w-32" />
                <img src={Milk} className="w-32" />
              </div>
              <div> 
              <button className="btn bg-lime-400 text-purple-600 font-bold mt-5 w-64 h-16"> Get started </button>
              </div>
            </div>
          </div>
          <div className="rightPart flex flex-col sm:w-[50%] sm:justify-center sm:mt-0 mt-16 w-[100%] border border-purple-500 rounded-lg justify-center items-center">
            <img src={randomPhoto() as string} className="photo p-3 flex justify-center" />
          </div>
        </div>
        <Info />
    </div>
    )
}

export default Hero