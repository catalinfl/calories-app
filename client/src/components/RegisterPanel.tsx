import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../redux/slices/authSlice"

type RegisterType = {
    username: string,
    password: string,
    confirmPass: string
}

type SendDataType = Omit<RegisterType, "confirmPass">

type Error = string | null

const RegisterPanel = () => {

    const [data, setData] = useState<RegisterType>({username: "", password: "", confirmPass: ""})
    const [error, setError] = useState<Error>(null)
    const [dataToSend, setDataToSend] = useState<SendDataType | null>(null)

    const navigate = useNavigate()
    
    const onChangeFunc = (type: keyof RegisterType, e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [type]: e.target.value})
    }

    const handleSubmit = () => {
        if (data.password !== data.confirmPass) {
            setError("Passwords don't match!")
            return
        }
        setDataToSend({username: data.username, password: data.password})
    }
    const dispatch = useDispatch()




    const usernameRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (usernameRef.current || passRef.current) {
            console.log(usernameRef.current.value.length)
            if (usernameRef.current.value.length > 20) {
                setError("Username or password too long!")
                usernameRef.current.value = ""
            } 
            if (passRef.current.value.length > 20) {
                setError("Username or password too long!")
                passRef.current.value = ""
            }
        }
        if (confirmPassRef.current.onclick) {
            setError("Passwords don't match!")
        }
        // else { setError("works") }
    }, [data])

    useEffect(() => {
        if (dataToSend) {
          axios.post("http://localhost:3000/api/register", dataToSend, {
            withCredentials: true
          })
          .then((res) => {
              console.log(res.data)
              dispatch(login({...res.data, loggedIn: true }))
              navigate("/about")
          })
          .catch(err => {
              console.error(err);
          });
        }
      }, [dataToSend, navigate, dispatch]); 


  return (
    <div className="bg-black w-full max-w-[1280px] h-full flex flex-col md:flex-row mx-auto mt-[3rem] gap-4 sm:gap-0"> 
      <div className="flex flex-col flex-1 items-center justify-center gap-4 p-[3rem]"> 
          <div className="flex flex-col"> 
          <p className="text-[3rem] mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-lime-500"> Sign-up. </p>
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
          <div className="flex flex-col"> 
          <label className="label">
            <span className="label-text"> Confirm password </span>
          </label>
          <input ref={confirmPassRef} type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFunc("confirmPass", e)} placeholder="Confirm pass" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col"> 
            <button onClick={() => handleSubmit()} className="btn bg-lime-500 text-slate-700 hover:bg-purple-400 hover:shadow-2xl  mt-4 transition-all"> LOGIN </button>
          </div>
          <p> {error} </p>
      </div>
      <div className="flex flex-col flex-1 p-12 justify-center items-center bg-black border border-purple-700">
      <p className="text-[2rem]"> Register to save your lists and more </p>
      <p className="text-[1rem] mt-4"> Already have an account? <Link to="/login"> <span className="text-purple-500 font-bold"> Login now to create a list. </span> </Link> </p>
      </div>
     </div>
    )
}

export default RegisterPanel