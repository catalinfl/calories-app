import { useEffect } from "react"

const Footer = ({ absolute }: { absolute: boolean }) => {

  useEffect(() => {
    if (absolute) {
      document.querySelector('footer')?.classList.add('absolute')
      document.querySelector('footer')?.classList.add('bottom-0')
    }
  }, [])

  return (
    <footer className="footer p-6 flex flex-col mt-12 justify-center items-center bg-neutral text-neutral-content">
        <p className="text-center"> Made with &#10084; using React & Go Fiber </p>
        <p className="text-center -mt-10"> 	 Catalin Flintasu &#169; 2023 </p>
    </footer>
  )
}

export default Footer