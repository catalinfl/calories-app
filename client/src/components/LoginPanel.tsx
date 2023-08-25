import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../redux/slices/authSlice"

type LoginType = {
    username: string,
    password: string
}

type Error = string | null

const LoginPanel = () => {

    const [data, setData] = useState<LoginType>({username: "", password: ""})
    const [error, setError] = useState<Error>(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeFunc = (type: keyof LoginType, e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [type]: e.target.value})
    }

    const handleSubmit = () => {
      axios.post("http://localhost:3000/api/login", data, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
      }).then(res => {
        dispatch(login({...res.data, loggedIn: true }))
        navigate("/")
      })
    }

    const usernameRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)



    useEffect(() => {
        if (usernameRef.current || passRef.current) {
            if (usernameRef.current.value.length > 20) {
                setError("Username or password too long!")
                usernameRef.current.value = ""
            } 
            if (passRef.current.value.length > 20) {
                setError("Username or password too long!")
                passRef.current.value = ""
            }
        }
    }, [data])



  return (
    <div className="bg-black w-full max-w-[1280px] h-full flex flex-col md:flex-row mx-auto mt-[3rem] gap-4 md:gap-0"> 
      <div className="flex flex-col flex-1 py-28 items-center justify-center gap-4"> 
          <div className="flex flex-col"> 
          <p className="text-[3rem] mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-lime-500"> Sign-in. </p>
          </div>
          <div className="flex flex-col"> 
          <label className="label">
            <span className="label-text"> Username </span>
          </label>
          <input ref={usernameRef} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFunc("username", e)} placeholder="Username" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col"> 
          <label className="label">
            <span className="label-text"> Password </span>
          </label>
          <input ref={passRef} type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFunc("password", e)} placeholder="Password" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col mt-4"> 
            <button onClick={() => handleSubmit()} className="btn bg-lime-500 text-slate-700 hover:bg-purple-400 hover:shadow-2xl transition-all"> LOGIN </button>
          </div>
          <p> {error} </p>
      </div>
      <div className="flex flex-col flex-1 p-12 justify-center items-center bg-black border border-purple-700">
      <p className="text-[1.75rem]"> Login now to keep your lists <span className="font-bold text-purple-500"> saved. </span> </p>
      <p className="text-[1rem] mt-4"> Don't have an account? <Link to="/register"> <span className="text-purple-500 font-bold">  Click here to create one right now </span> </Link> </p>
      </div>
     </div>
    )
}

export default LoginPanel