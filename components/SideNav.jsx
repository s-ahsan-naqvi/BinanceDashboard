"use client"

import React, {useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx"
import { SiProtodotio } from "react-icons/si"
import { ImStatsDots } from "react-icons/im"
import { AiOutlineHome } from "react-icons/ai"
import { useRouter } from 'next/navigation'

const SideNav = () => {

  const router = useRouter();

  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState("home")

  return (
    <div className={`h-screen px-4 py-8 bg-[#ffffff] flex justify-start flex-col border border-r-2 border-r-[#142232] ${toggle ? "w-[165px] sm:w-[255px]" : "w-[80px]"} transition-all ease-in-out`}>
            <div className="ml-2 flex flex-row justify-between items-center mt">
                {toggle ? 
                    <h2 
                        className='text-[24px] text-[#142232] font-bold cursor-pointer'
                        onClick={() => 
                            {
                                router.push("/")
                                setPage("home")
                            }
                        }
                    >Binance Dashboard</h2> :
                     null}
                <RxHamburgerMenu 
                onClick={() => setToggle(!toggle)}
                className='text-[24px] font-bold text-[#142232] cursor-pointer mr-4'
                />
            </div>
        <div className="flex flex-col gap-2">
            <div className={`py-2 pl-2 rounded-[12px] flex flex-row gap-2 justify-start items-center mt-6 ${page === "home" ? "bg-gray-200" : null}`}>
                <AiOutlineHome 
                    onClick={() => 
                        {
                            router.push("/")
                            setPage("home")
                        }}
                    className='text-[20px] font-bold text-[#142232] cursor-pointer mr-4'
                />
                {toggle ? <h2 className='text-[18px] text-[#142232] font-medium'>Home</h2> : null}
            </div>
            <div className={`py-2 pl-2 rounded-[12px] flex flex-row gap-2 justify-start items-center ${page === "spot" ? "bg-gray-200" : null} `}>
                <SiProtodotio 
                    onClick={() => {
                        router.push("/spot")
                        setPage("spot")
                    }}
                    className='text-[20px] font-bold text-[#142232] cursor-pointer mr-4'
                />
                {toggle ? <h2 className='text-[18px] text-[#142232] font-medium'>Spot</h2> : null}
            </div>
            <div className={`py-2 pl-2 rounded-[12px] flex flex-row gap-2 justify-start items-center ${page === "futures" ? "bg-gray-200" : null}`}>
                <ImStatsDots
                    onClick={() => {
                        router.push("/futures")
                        setPage("futures")   
                    }}
                    className='text-[20px] font-bold text-[#142232] cursor-pointer mr-4'
                />
                {toggle ? <h2 className='text-[18px] text-[#142232] font-medium'>Futures</h2> : null}
            </div>
        </div>
        
    </div>
  )
}

export default SideNav