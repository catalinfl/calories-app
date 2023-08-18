import { Link } from "react-router-dom"

import { RxHamburgerMenu } from "react-icons/rx"

const Navbar = () => {

    return (
        <nav className="navbar flex bg-primary mt-2 max-w-[720px] mx-auto gap-2 border-lime-300 border-b-[1px] justify-center"> 
            <p className="mx-5"> CaloriesCalc</p>
            <div className="w-[100%] justify-center hidden sm:flex gap-2"> 
            <Link to="/"> 
            <button className="btn rounded-none join-item"> Home </button>
            </Link>
            <Link to="/calculator"> 
            <button className="btn rounded-none join-item"> Calculator </button>
            </Link>
            <button className="btn rounded-none join-item"> Make a list </button>
            <button className="btn rounded-none join-item"> Contact </button>
            </div>
            <div className="hamburger flex sm:hidden w-[100%] justify-end">
                <RxHamburgerMenu className="w-8 h-8" />
            </div>
        </nav>
    )
}

export default Navbar