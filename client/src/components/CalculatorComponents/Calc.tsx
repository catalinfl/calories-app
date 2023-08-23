import { ChangeEvent, useEffect, useRef, useState } from "react"
import { BiErrorAlt } from "react-icons/bi"
import { TbMeat } from "react-icons/tb"

type CalcProps = {
    age: number,
    weight: number,
    height: number,
    gender: Gender,
    activity: ActivityLevel
} 

type Gender = "male" | "female"
type AllPropsDefined<T> = keyof T extends never ? never : T
type Error = string | null
type ActivityLevel = "Sedentary" | "Lightly active" | "Moderately active" | "Active" | "Very active"

const Calc = () => {

    const buttonRef = useRef<HTMLDivElement | null>(null)
    const calculateRef = useRef<HTMLDivElement | null>(null)


    const [toCalculate, setCalculate]  = useState<CalcProps>({
        age: undefined,
        weight: undefined,
        height: undefined,
        gender: undefined,
        activity: "Sedentary"
    })

    const [error, setError] = useState<Error>(null);
    const [showCalculate, setShowCalculate] = useState<boolean>(false)
    const [calories, setCalories] = useState<number>(0)

    const handleChange = (calculate: keyof CalcProps, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if ((calculate === "age" && e.target.value.length <= 2) || ((calculate === "weight" || calculate === "height") && e.target.value.length <= 3)) {
            setCalculate({...toCalculate, [calculate]: e.target.value})
            setError("")        
        }
        else if (calculate === "gender") {
            setCalculate({...toCalculate, gender: e.target.value as Gender })
        }
        else if (calculate === "activity") {
            setCalculate({...toCalculate, activity: e.target.value as ActivityLevel })
        }
        else {
            setError("Put a valid value")
        }        
    }

    const allPropsDefined = (obj: CalcProps): obj is AllPropsDefined<CalcProps> => {
        return Object.values(obj).every(val => val !== undefined);
    }

    const handleSubmit = () => {
        const t = allPropsDefined(toCalculate) 
        if (t) {
            const calculatedCalories = calculateFormula(toCalculate)
            if (typeof(calculatedCalories) === "number") {
                setCalories(Math.floor(calculatedCalories/10)*10)
            }            
        }
        else {
            setError("Fill all the fields")
        }
    }

    const getCoefficient = (activity: ActivityLevel) => {
        switch (activity) {
            case "Sedentary":
                return 1.2
            case "Lightly active":
                return 1.375
            case "Moderately active":
                return 1.55
            case "Active":
                return 1.725
            case "Very active":
                return 1.9
        }
    }

    const calculateFormula = (props: CalcProps): number => {
        if (props.age > 99 || props.age < 10) {
            setError("Age must be between 10 and 99")
            return
        }
        if (props.weight > 200 || props.weight < 40) {
            setError("Weight must be between 40 and 200")
            return
        }
        if (props.height > 210 || props.height < 140) {
            setError("Height must be between 140 and 210")
            return
        }

        const activityCoefficient = getCoefficient(props.activity)
        setShowCalculate(true)
        if (props.gender === "male") {
            return (props.weight * 10 + props.height * 6.25 - props.age * 5 + 5) * activityCoefficient
        }
        else {
            return (props.weight * 10 + props.height * 6.25 - props.age * 5 - 161) * activityCoefficient
        }        
    }

    useEffect(() => {
        calculateRef.current?.scrollTo()
        calculateRef.current?.scrollIntoView({behavior: "smooth"})    
    }, [showCalculate])

    
    useEffect(() => {
        const handleColor = () => {
            if (toCalculate.gender === "male") {
                if (buttonRef.current.classList.contains("bg-purple-500")) {
                    buttonRef.current.classList.remove("bg-purple-500")
                }
                if (buttonRef.current.classList.contains("bg-base-100")) {
                    buttonRef.current.classList.remove("bg-base-100")
                }
                buttonRef.current.classList.add("bg-lime-500")
            }
            if (toCalculate.gender === "female") {
                if (buttonRef.current.classList.contains("bg-lime-500")) {
                    buttonRef.current.classList.remove("bg-lime-500")
                }
                if (buttonRef.current.classList.contains("bg-base-100")) {
                    buttonRef.current.classList.remove("bg-base-100")
                }
                buttonRef.current.classList.add("bg-purple-500")
            }
        }

        handleColor()
    
    }, [toCalculate])


  
    return (
        <>
    <div className="flex flex-col justify-center max-w-[1280px] rounded-lg bg-black p-12 mx-auto mt-12"> 
        <div className="table flex flex-col max-w-[1200px] mx-auto"> 
            <div className="display flex w-full">
                <p className="w-full sm:text-[3rem] text-center text-[1.5rem] p-3 mb-8"> Calories calculator </p>
            </div>
            <div className="form-control mx-auto max-w-xs gap-4">
                <div> 
                <label className="label">
                    <span className="label-text"> What's your age? </span>
                    <span className="label-text-alt"> 10-99</span>
                </label>
                <input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("age", e)} min={10} max={99} placeholder="Age" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                <label className="label">
                    <span className="label-text"> What's your weight? </span>
                    <span className="label-text-alt"> 40-200 kg </span>
                </label>
                <input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("weight", e)} min={40} max={200} placeholder="Weight" className="input input-bordered max-w-xs w-full" />
                </div>
                <div>
                <label className="label">
                    <span className="label-text"> What's your height? </span>
                    <span className="label-text-alt"> 140-210 cm </span>
                </label>
                <input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("height", e)} min={140} max={210} placeholder="Height" className="input input-bordered w-full max-w-xs" />
                </div>
                <div> 
                <label className="label">
                    <span className="label-text"> Gender </span>
                </label>
                    <div className="flex flex-row w-full rounded-lg justify-center gap-10 bg-base-100 p-2"> 
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-3"> Male </span> 
                                <input type="radio" value={"male"} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("gender", e)} name="radio-10" className="radio checked:bg-lime-500" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-3"> Female </span> 
                                <input type="radio" value={"female"} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("gender", e)}  name="radio-10" className="radio checked:bg-purple-500"/>
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full max-w-xs mt-4">
                        <label className="label">
                            <span className="label-text"> Activity level </span>
                        </label>
                        <select className="select select-bordered" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange("activity", e)}>
                            <option> Sedentary </option>
                            <option> Lightly active </option>
                            <option> Moderately active </option>
                            <option> Active </option>
                            <option> Very active </option>
                        </select>
                    </div>
                        {error && <div className="error flex justify-center flex-row w-full items-center gap-1 mt-3 p-3">
                            <BiErrorAlt className="text-lg text-red-400"/>
                            <p> { error } </p>
                        </div>}
                </div>
                <div ref={buttonRef} className="btn btn-primary bg-base-100 mt-4 hover:bg-slate-500" onClick={() => handleSubmit()}> Calculate </div>
            </div>
        </div>
    </div>
  { showCalculate &&  
    <div ref={calculateRef} className="mt-4 bg-black flex flex-col justify-center max-w-[1280px] mx-auto rounded-lg p-4">        
        <div> 
        <p className="text-center text-[1.5rem] sm:text-[2rem] flex flex-row justify-center items-center"> You need  <TbMeat className="text-[2rem] sm:text-[3rem] mr-1 ml-1 sm:mr-2 sm:ml-2 text-orange-800"/> {calories} calories daily &#128522; </p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className="bg-base-100 flex flex-row mt-4 text-center w-full max-w-[720px] rounded-lg"> 
                <div className="flex flex-1 justify-center items-center p-4 text-lg transition-all hover:bg-lime-500 hover:text-slate-700"> Mild weight loss </div>
                <div className="flex flex-1 flex-col justify-center items-center p-4 text-lg transition-all hover:bg-purple-500 hover:text-slate-700"> <span className="flex flex-row items-center gap-1"> {calories-250} calories <TbMeat className="text-[2rem] text-orange-800"/> </span>
                    <p className="text-sm"> -0.25kg/week </p>
                 </div>
             </div>
             <div className="bg-base-100 flex flex-row text-center w-full max-w-[720px] rounded-lg"> 
                <div className="flex flex-1 justify-center items-center p-4 text-lg transition-all hover:bg-lime-500 hover:text-slate-700"> Weight loss </div>
                <div className="flex flex-1 flex-col justify-center items-center p-4 text-lg transition-all hover:bg-purple-500 hover:text-slate-700"> <span className="flex flex-row items-center gap-1"> {calories-500} calories <TbMeat className="text-[2rem] text-orange-800"/> </span>
                    <p className="text-sm"> -0.50kg/week </p>
                 </div>
             </div>
             <div className="bg-base-100 flex flex-row text-center w-full max-w-[720px] rounded-lg"> 
                <div className="flex flex-1 justify-center items-center p-4 text-lg transition-all hover:bg-lime-500 hover:text-slate-700"> Extreme weight loss </div>
                <div className="flex flex-1 flex-col justify-center items-center p-4 text-lg transition-all hover:bg-purple-500 hover:text-slate-700"> <span className="flex flex-row items-center gap-1"> {calories-1000} calories <TbMeat className="text-[2rem] text-orange-800"/> </span>
                    <p className="text-sm"> -1.00kg/week </p>
                 </div>
             </div>
        </div>
        <div className="flex flex-col justify-center items-center"> 
        <p className="text-center mt-4 text-lg"> You need {calories} calories daily to maintain your weight. If you want to lose weight consider going under this number of calories. </p>
        <p className="text-center mt-4 text-lg"> Log-in to make a list of meals for a day </p>
        <button className="btn btn-base-100 w-full max-w-[280px] flex mt-4"> see programs </button>
        </div>
    </div>
  }
    </>
  )
}

export default Calc