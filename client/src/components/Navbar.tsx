import { Link } from "react-router-dom"

import { RxHamburgerMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { logoff } from "../redux/slices/authSlice"
import { useEffect } from "react"

const Navbar = () => {    

    const authSelector = useSelector((state: RootState) => state.authSlice)
    const dispatch = useDispatch()
    const expirationDate = new Date(authSelector.exp * 1000)


    useEffect(() => {
        if (new Date() > expirationDate) {
            dispatch(logoff())
        }
    }, [])

    const logOff = () => {
        dispatch(logoff())
    }

    return (
        <nav className="navbar flex flex-row z-10 bg-primary md:sticky top-[0.5rem] mt-2 max-w-[720px] mx-auto gap-2 border-lime-300 border-b-[1px] justify-center"> 
            <div className="flex w-full"> 
            <Link to="/"> <p className="mx-5 cursor-pointer"> CaloriesCalc</p> </Link>
            </div>
            <div className="w-[100%] justify-center hidden sm:flex gap-2 "> 
            <Link to="/"> 
            <button className="btn rounded-none join-item"> Home </button>
            </Link>
            <Link to="/calculator"> 
            <button className="btn rounded-none join-item"> Calculator </button>
            </Link>
            <Link to="/lists"> 
            <button className="btn rounded-none join-item"> Lists </button>
            </Link>
            <Link to="/about"> 
            <button className="btn rounded-none join-item"> About </button>
            </Link>
            <Link to="/login"> 
            <button className="btn rounded-none join-item" onClick={() => logOff()}> {authSelector.loggedIn ? "Logout" : "Login"} </button>
            </Link>
            </div>
            <div className="dropdown dropdown-end block sm:hidden">
                <label tabIndex={0} className="btn m-1 bg-black border-none"> <RxHamburgerMenu className="p-2 w-[2.5rem] h-[2.5rem] text-lg cursor-pointer  text-lime-500 bg-purple-700" /> </label>
                <ul tabIndex={0} className="dropdown-content z-50 text-center text-lg text-lime-500 menu p-2 shadow bg-purple-700 rounded-lg w-52">
                    <Link to="/"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Home </li> </Link>
                    <Link to="/calculator"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Calculator </li> </Link>
                    <Link to="/lists"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Lists </li> </Link>
                    <Link to="/about"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> About </li> </Link>
                    <Link to="/login"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4" onClick={() => logOff()}> {authSelector.loggedIn ? "Log off" : "Login"} </li> </Link>
                </ul>
            </div>
        </nav>
    )
}


export default Navbar