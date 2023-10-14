"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const SearchForm = ({value = ""}) => {
    const router = useRouter()
    const [inputValue, setInputValue] = useState([]);
    const [inputValue2, setInputValue2] = useState(value);
    let timer;
    const runTimer = (arr) => {
        if(arr.length > 0){
            timer = setTimeout(() => {
                let last = arr.at(-1)
                last == "" ? router.push("/") : router.push("/?q="+ last)
            },250)
        }
    }
    useEffect(() => {
        runTimer(inputValue)
        return () => {
            clearTimeout(timer)
        }
    },[inputValue])
    const handleInputChange = (e) => {
        clearTimeout(timer)
        setInputValue([...inputValue,e.target.value]);
        setInputValue2(e.target.value);
    }

    return(
    <form className='mb-5 w-full' onSubmit={() => {}}>
        <div >
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input value={inputValue2} onChange={handleInputChange} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movies, Actors, Tv-Shows..." required />
          </div>
        </div>
    </form>
    )
}
export default SearchForm