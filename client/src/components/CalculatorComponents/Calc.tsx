import { ChangeEvent, useEffect, useRef, useState } from "react"
import { BiErrorAlt } from "react-icons/bi"

type CalcProps = {
    age: number,
    weight: number,
    height: number,
    gender: Gender,
    activity: ActivityLevel
} 

type Gender = "male" | "female" | undefined
type AllPropsDefined<T> = keyof T extends never ? never : T
type Error = string | null
type ActivityLevel = "Sedentary" | "Lightly Active" | "Moderately Active" | "Active" | "VeryActive"

const Calc = () => {

    const buttonRef = useRef<HTMLDivElement | null>(null)

    const [toCalculate, setCalculate]  = useState<CalcProps>({
        age: undefined,
        weight: undefined,
        height: undefined,
        gender: undefined,
        activity: "Sedentary"
    })

    const [error, setError] = useState<Error>(null);

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
            console.log(calculateFormula(toCalculate))
        }
    }

    const getCoefficient = (activity: ActivityLevel) => {
        switch (activity) {
            case "Sedentary":
                return 1.2
            case "Lightly Active":
                return 1.375
            case "Moderately Active":
                return 1.55
            case "Active":
                return 1.725
            case "VeryActive":
                return 1.9
        }
    }

    const calculateFormula = (props: CalcProps): number => {
        const activityCoefficient = getCoefficient(props.activity)

        if (props.gender === "male") {
            return (props.weight * 10 + props.height * 6.25 - props.age * 5 + 5) * activityCoefficient
        }
        else {
            return (props.weight * 10 + props.height * 6.25 - props.age * 5 - 161) * activityCoefficient
        }
    }

    console.log(toCalculate)

    
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
  )
}

export default Calc