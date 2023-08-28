import axios from "axios"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { GrAddCircle } from "react-icons/gr"

type Products = {
  name: string,
  calories: string,
  quantity: string,
  caloriesPerQuantity: number
}

type ProductsWithoutQuantity = Omit<Products, "quantity">

type List = {
  listName: string,
  products: ProductsWithoutQuantity[],
  finalCalories: number
}

const ListsComponents = () => {


  const [products, setProducts] = useState<Products[]>([])
  const [listToSend, setListToSend] = useState<List>({
    listName: "",
    products: [],
    finalCalories: 0,
  })
  const [searchbar, setSearchbar] = useState<string>("")
  

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
      setListToSend({...listToSend, products: [...listToSend.products, {...product, caloriesPerQuantity: Math.floor(parseInt(product.calories.split(" ")[0]))}],})
  }

  console.log(listToSend)

  useEffect(() => {
    if (products !== null && products.length > 5) {
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


  const searchRef = useRef<HTMLDivElement>(null)

  return (
    <> 
    <div className="bg-black mt-16 p-4 rounded-lg max-w-[1280px] mx-auto w-full text-center">  
    <div className="flex flex-row  justify-center items-center gap-x-12">
    <p className=""> Currently you have x lists. </p>
    <button className="btn rounded-0 bg-lime-500 text-slate-700 hover:text-slate-400"> See your lists </button>
    </div>
    <div className="flex flex-col mt-8 justify-center items-center">
      <p className="text-[1.25rem]"> Create a list or a meal </p> 
    </div>
    <div className="flex flex-row mt-3 justify-center items-center gap-x-8">
        <div className="form-control w-full max-w-lg">
        <label className="label"> 
        <span className="label-text-alt"> Name of list </span>
        </label>
        <input className="input rounded-0 w-full border" placeholder="List name" onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setListToSend({...listToSend, listName: e.target.value })
        }}/>
        </div>
      </div>
      <div className="flex flex-col p-3 max-w-sm mx-auto mt-4 justify-center items-center gap-x-8 bg-base-100 rounded-lg">
        <div className="flex bg-base-100">
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
                <div key={index} className="flex border-lime-500 border-[1px] gap-1 p-4 flex-row bg-base-100 w-max-md justify-between items-center gap-x-8">
                  <div className="flex flex-col text-left"> 
                  <p className="text-xl"> {product.name} </p>
                  <p className="text-sm"> {product.calories} per 100g </p>
                  </div>
                  <div className="flex flex-col text-center"> 
                  <p className="text-xl"> {product.calories} </p>
                  <input type="number" className="input remove-arrow bg-black max-w-[100px] flex justify-center items-center bar" placeholder="100g"/>
                  </div>
                </div>
              )
            }) : null
            }
       </div>}
    </div>
  </>
  )
}

export default ListsComponents