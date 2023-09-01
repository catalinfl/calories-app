import Footer from '../components/Footer'
import ListsComponents from '../components/ListsComponents'
import Navbar from '../components/Navbar'

const Lists = () => {
  return (
    <>
    <Navbar />
    <ListsComponents />
    <Footer absolute={false}/>
    </>
  )
}

export default Lists