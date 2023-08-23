import { Link } from "react-router-dom"

const LoginPanel = () => {
  return (
    <div className="bg-black w-full max-w-[1280px] max-h-[480px] h-full flex flex-col md:flex-row mx-auto mt-[3rem] gap-4 sm:gap-0"> 
      <div className="flex flex-col flex-1 items-center justify-center gap-4 p-12"> 
          <div className="flex flex-col"> 
          <p className="text-[3rem] mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-lime-500"> Sign-in. </p>
          </div>
          <div className="flex flex-col"> 
          <label className="label">
            <span className="label-text"> Nickname </span>
          </label>
          <input type="text" placeholder="Nickname" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col"> 
          <label className="label">
            <span className="label-text"> Password </span>
          </label>
          <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col mt-4"> 
            <button className="btn bg-lime-500 text-slate-700 hover:bg-purple-400 hover:shadow-2xl transition-all"> LOGIN </button>
          </div>
      </div>
      <div className="flex flex-col flex-1 p-12 justify-center items-center bg-black border border-purple-700">
      <p className="text-[2rem]"> Login now to keep your lists saved. </p>
      <p className="text-[1rem] mt-4"> Don't have an account? <Link to="/register"> <span className="text-purple-500 font-bold">  Click here to create one right now </span> </Link> </p>
      </div>
     </div>
    )
}

export default LoginPanel