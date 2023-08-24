import { Link } from "react-router-dom"

import { RxHamburgerMenu } from "react-icons/rx"

const Navbar = () => {    
    return (
        <nav className="navbar flex flex-row bg-primary md:sticky top-[0.5rem] mt-2 max-w-[720px] mx-auto gap-2 border-lime-300 border-b-[1px] justify-center"> 
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
            <button className="btn rounded-none join-item"> Login </button>
            </Link>
            </div>
            <div className="dropdown dropdown-end block sm:hidden">
                <label tabIndex={0} className="btn m-1 bg-black border-none"> <RxHamburgerMenu className="p-2 w-[2.5rem] h-[2.5rem] text-lg cursor-pointer  text-lime-500 bg-purple-700" /> </label>
                <ul tabIndex={0} className="dropdown-content text-center text-lg text-lime-500 z-[1] menu p-2 shadow bg-purple-700 rounded-lg w-52">
                    <Link to="/"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Home </li> </Link>
                    <Link to="/calculator"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Calculator </li> </Link>
                    <Link to="/lists"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Lists </li> </Link>
                    <Link to="/about"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> About </li> </Link>
                    <Link to="/login"> <li className="cursor-pointer hover:bg-purple-800 transition-all px-4"> Login </li> </Link>
                </ul>
            </div>
        </nav>
    )
}


export default Navbar