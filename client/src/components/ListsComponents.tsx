import axios from "axios"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { GrAddCircle } from "react-icons/gr"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { TbMeat } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Link } from "react-router-dom"
import { addProduct, changeNickname } from "../redux/slices/listSlice"

export type Products = {
  name: string,
  calories: string,
  quantity: string,
  caloriesPerQuantity: number,
  grams: number
}

export type ProductsWithoutQuantity = Omit<Products, "quantity">

export type List = {
  username?: string
  listName: string,
  products: ProductsWithoutQuantity[],
  finalCalories: number
}

type Error = string

const ListsComponents = () => {

  const [products, setProducts] = useState<Products[]>([])
  const [error, setError] = useState<Error | null>("")
  const [listToSend, setListToSend] = useState<List>({
    listName: "",
    products: [],
    finalCalories: 0,
    username: ""
  })

  const [searchbar, setSearchbar] = useState<string>("")
  const [listFinished, setListFinished] = useState<boolean>(false)

  const listNameRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const authState = useSelector((state: RootState) => state.authSlice)
  const listState = useSelector((state: RootState) => state.listSlice)

  const dispatch = useDispatch()

  useEffect(() => {
    if (searchbar.length >= 3) {
      axios.get(`http://localhost:3000/api/lists/foods/${searchbar}`)
      .then(res => setProducts(res.data))
    }

    if (searchbar.length <= 3) {
      setProducts([])
    }
  }, [searchbar])

  const handleList = (product: Products) => {
      setListToSend({...listToSend, username: authState.username, products: [...listToSend.products, {...product, caloriesPerQuantity: Number(product.calories.split(" ")[0]), grams: 100}]})
  }

  console.log(listToSend.products)

  useEffect(() => {
    dispatch(addProduct(listToSend))
  }, [listToSend, dispatch])



  useEffect(() => {
    if (products !== null && products.length > 6) {
      searchRef.current?.classList.add("max-h-96")
      searchRef.current?.classList.add("overflow-x-hidden")
      searchRef.current?.classList.add("overflow-scroll")      
    }
    else {
      searchRef.current?.classList.remove("max-h-96")
      searchRef.current?.classList.remove("overflow-x-hidden")
      searchRef.current?.classList.remove("overflow-scroll")
    }
  }, [products])

  useEffect(() => {
    if (listToSend.products !== null && listToSend.products.length > 0) {
      const finalCalories = Math.floor(listToSend.products.reduce((acc, product) => {
        return acc + product.caloriesPerQuantity
      }, 0))
      setListToSend(prevList => ({...prevList, finalCalories}))
    }
  }, [listToSend.products])


 useEffect(() => {
    if (error !== "") {
      const timeoutId = setTimeout(() => {
        setError("")
      }, 10000)

      return () => {
        clearTimeout(timeoutId)
      };
    }  

  }, [error])



  const handleSubmit = () => {
    if (!authState.loggedIn) {
      setError((prevError) =>
        prevError !== "You aren't logged in. Click here to log in."
          ? "You aren't logged in. Click here to log in."
          : prevError
      );
      return null;
    }
    if (listToSend.listName.length < 3) {
      setError((prevError) =>
        prevError !== "List name must be at least 3 characters long"
          ? "List name must be at least 3 characters long"
          : prevError
      );
      return;
    }
    if (listToSend.products.length < 3) {
      setError((prevError) =>
        prevError !== "List must have at least 3 products"
          ? "List must have at least 3 products"
          : prevError
      );
      return;
    }


    axios.post("http://localhost:3000/api/lists", listToSend)
            .then(res => console.log(res))

    setListToSend({...listToSend, listName: "", products: [], finalCalories: 0})
    window.scrollTo(0, 0)
    setListFinished(true)
  };

  useEffect(() => {
    if (listToSend.finalCalories === 0 && listToSend.products.length === 0) {
      setListToSend({...listState, username: authState.username})
    }
 
  }, [])

  useEffect(() => {
    if (listNameRef.current !== null && listToSend.listName.length !== 0) {
      listNameRef.current.value = listToSend.listName
    } 
  }, [listToSend])

  console.log(listToSend)

  return (
    <div className="bg-black mt-16 py-12 rounded-lg max-w-[1280px] mx-auto w-full text-center">  
    <div className="flex flex-col gap-y-4 justify-center items-center ">
    {authState.loggedIn ? 
    <> 
    {listFinished ? <p className="bg-purple-500 p-4 text-3xl"> List successfully added </p> : null}
    <p className="mt-4 block text-sm sm:text-lg w-auto h-auto"> You need {authState.calories} calories to consume for a day to maintain your weight. </p> 
    <Link to="/allLists"> 
    <button className="btn rounded-none bg-lime-500 text-slate-700 hover:text-slate-400"> See your lists </button>
    </Link>
    </>
    :
    <p> You aren't logged in. Log-in to see information and make a list. </p>
    }
    </div>
    <> 
    <div className="flex flex-col mt-8 justify-center items-center">
      <p className="text-[1.25rem]"> Create a list or a meal </p> 
    </div>
    <div className="flex flex-row mt-3 justify-center items-center gap-x-8">
        <div className="form-control w-full max-w-sm mx-auto sm:max-w-xl">
        <label className="label"> 
        <span className="label-text-alt"> Name of list </span>
        </label>
        <input className="input rounded-0 w-full border" ref={listNameRef} placeholder="List name" onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setListToSend({...listToSend, listName: e.target.value })
          dispatch(changeNickname({ listName: e.target.value }))
        }}/>
        </div>
      </div>
      <div className="flex flex-col p-12 max-w-sm mx-auto mt-12 mb-12 justify-center items-center gap-x-8 bg-base-100 rounded-lg sm:max-w-xl">
        <div className="flex bg-base-100 max-w-sm mx-auto sm:max-w-xl">
          <div className="form-control w-full max-w-lg">
          <label className="label"> 
          <span className="label-text-alt"> Food name </span>
          </label>
          <input className="input rounded-none w-full border bg-black" placeholder="Food" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchbar(e.target.value)}/>
          <div ref={searchRef} className="bg-black list-none flex flex-col gap-3 mt-2 max-h-96 overflow-x-hidden overflow-scroll">
            {searchbar.length >= 3 && products !== null ? products.map((product, index) => {
                return (
                  <li key={index} className="cursor-pointer px-8 py-3 hover:bg-slate-500" onClick={() => handleList(product)}> {product.name} </li>
                  )
              }) : null}
              </div>
          </div>
        </div>
        <div className="flex flex-row mx-auto rounded-lg border-black border-2 p-3 mt-4">
         <p className="text-center flex justify-center items-center gap-3 cursor-pointer"> Add product <GrAddCircle className="text-red-600 cursor-pointer text-[2rem]" /> </p>
        </div>
      </div>
      {listToSend.products !== null && listToSend.products.length > 0 && <div className="bg-base-100 flex flex-col mt-4 p-4 w-full max-w-[1000px] mx-auto"> 
            {listToSend?.products !== null ? listToSend.products.map((product, index) => {
              return (
                <div key={index} className="flex border-lime-500 border-[1px] gap-1 p-4 flex-row bg-base-100 w-max-md w-full justify-between items-center gap-x-8">
                  <div className="flex flex-col w-full text-left"> 
                  <p className="text-xl"> {product.name} </p>
                  <p className="text-sm"> {product.calories} per 100g </p>
                  </div>
                  <div className="flex flex-row gap-4 items-center justify-end w-full max-w-[300px]"> 
                    <div className="flex flex-col text-center items-center justify-center">
                    <p className="text-md mb-3"> {product.caloriesPerQuantity} calories </p>
                    <input 
                      type="number"
                      className="input remove-arrow bg-black flex justify-center items-center bar"
                      placeholder="grams"
                      min={10}
                      max={1000}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length > 3) {
                          const newProducts = listToSend.products.map((p, i) => {
                            if (i === index) {
                              return { ...p, caloriesPerQuantity: Math.floor(parseInt(product.calories.split(" ")[0])), grams: 100 }
                            } else {
                              return p
                            }
                          }
                          )
                          setListToSend({ ...listToSend, products: newProducts })
                          return e.target.value = "100"
                        }
                        const newProducts = listToSend.products.map((p, i) => {
                          if (i === index) {
                            const caloriesPerQuantity = Number(e.target.value) * Number(product.calories.split(" ")[0]) / 100
                            return { ...p, caloriesPerQuantity, grams: Number(e.target.value) }
                          } else {
                            return p
                          }
                        })
                        setListToSend({ ...listToSend, products: newProducts })
                      }}
                    />
                    </div>
                    <div className="flex w-full justify-end max-w-[64px] p-4">
                    <AiOutlineCloseCircle className="text-[2rem] cursor-pointer transition-colors hover:text-slate-500" onClick={() => {
                      if (listToSend.products.length === 1) {
                        setListToSend({ ...listToSend, products: [], finalCalories: 0 })
                        return
                      }
                      const newProducts = listToSend.products.filter((_, i) => i !== index)
                      setListToSend({ ...listToSend, products: newProducts })
                    }}/>                        
                    </div>
                  </div>
                </div>
              )
            }) : null
          }
          <div className="mt-12">
            <div className="flex">
            <p className="text-[2rem] gap-x-2 flex w-full justify-center sm:justify-end items-center">Total calories: {listToSend.finalCalories} <TbMeat className="text-[2.5rem] text-orange-800"/> </p>
            </div>
            {error !== "" && error !== null ? (
              <p className="my-4 p-4 bg-purple-700"> Error: {error.split(" ")[0] === "You" ? 
              <Link to="/login"> {error} </Link>
              : error
            }
             </p>
              ) : null}
            <button type="button" className="mt-4 btn bg-lime-500 text-slate-700" onClick={() => handleSubmit()}> Create a list </button>
          </div>
       </div>}
       </>
    </div>
  )
}

export default ListsComponents