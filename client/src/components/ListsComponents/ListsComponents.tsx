import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { GrAddCircle } from "react-icons/gr"

type Products = {
  name: string,
  calories: string,
  quantity: string,
}

type ProductsWithoutQuantity = Omit<Products, "quantity">

type List = {
  listName: string,
  products: ProductsWithoutQuantity[],
  finalCalories: number
}

const ListsComponents = () => {


  const [products, setProducts] = useState<Products[]>([])
  const [listToSend, setListToSend] = useState<List>()
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
    console.log(product)
  }


  console.log(products)
  console.log(searchbar)

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
        <input className="input rounded-0 w-full border" placeholder="List name" />
        </div>
      </div>
      <div className="flex flex-col p-3 max-w-sm mx-auto mt-3 justify-center items-center gap-x-8 bg-base-100 rounded-lg">
        <div className="flex bg-base-100">
          <div className="form-control w-full max-w-lg">
          <label className="label"> 
          <span className="label-text-alt"> Food name </span>
          </label>
          <input className="input rounded-0 w-full border bg-black" placeholder="Food" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchbar(e.target.value)}/>
          <div className="bg-black list-none flex flex-col py-3 gap-3">
            {searchbar.length >= 3 && products?.map((product, index) => {
              return (
                <li className="cursor-pointer" onClick={() => handleList(product)}> {product.name} </li>
              )
            })}
          </div>
          </div>
        </div>
        <div className="flex flex-row mx-auto rounded-lg border-black border-2 p-3 mt-4">
         <p className="text-center flex justify-center items-center gap-3 cursor-pointer"> Add product <GrAddCircle className="text-red-600 cursor-pointer text-[2rem]" /> </p>
        </div>
      </div>
    </div>
  </>
  )
}

export default ListsComponents