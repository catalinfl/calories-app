import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import axios from "axios"
import { Products } from "./ListsComponents"
import { TbMeat } from "react-icons/tb"
import Footer from "./Footer"

type CustomList = {
    finalCalories: number,
    listname: string,
    products: Products[]
}

const AllListComp = () => {
    
    const [lists, setLists] = useState<CustomList[]>()
    const [absolute, setAbsolute] = useState<boolean>(false);
    const authSelector = useSelector((state: RootState) => state.authSlice)
    const [onHover, setOnHover] = useState<number>()


    useEffect(() => {
        axios.get(`http://localhost:3000/api/lists/${authSelector.username}`)
        .then(res => setLists(res.data))
    }, [])

    useEffect(() => {
        if ((lists?.length <= 1 && lists[0]?.products?.length === 3) || (lists?.length === 0))  {
            setAbsolute(true)
        }
        else {
            setAbsolute(false)
        }
    }, [lists])

    const deleteList = (listname: string) => {
        axios.delete(`http://localhost:3000/api/lists/${authSelector.username}/${listname}`)
        .then(res => {
            console.log(res.data)
        })
        setLists(lists?.filter(list => list.listname !== listname))
    }

    return (
    <> 
    <div className="flex flex-col max-w-6xl justify-center items-center mt-4 p-4 bg-black mx-auto ">
        <div className="text-center">
        <p> Currently have {lists?.length} lists made. </p>
        </div>
        {lists !== null && lists?.map((list, i) => {
            return (
            <div key={i} onMouseEnter={() => setOnHover(i)}  className="flex flex-col p-4 mt-4 max-w-3xl w-full mx-auto bg-base-100" >
                <div className="w-full">
                {i === onHover ? <p className="w-full text-right cursor-pointer" onClick={() => deleteList(list.listname)}> x </p> : null}
                    <p className="text-center my-4 bg-lime-500 p-4 text-3xl text-purple-700"> Name: {list.listname} </p>
                </div>
                <div className="w-full flex flex-col gap-4">
                    {list.products.map((product, i) => {
                        return(
                            <div key={i} className="flex flex-col bg-purple-500 p-4 text-lg text-lime-300">
                                <p> Product: {product.name} </p>
                                <p> Calories: {Math.floor(product["caloriesperquantity"])} </p>
                                <p> Grams: {product.grams} </p>
                            </div>
                        )
                    })}
                    <div className="flex flex-row items-center justify-center bg-lime-500 text-purple-500 font-bold p-4 gap-x-2 text-2xl">
                        Total calories: {list.finalCalories} <TbMeat className="text-4xl text-orange-700" /> 
                    </div>
                </div>
            </div>
            )
        }) }
    </div>
    <Footer absolute={absolute}/>
    </>
    )
}

export default AllListComp