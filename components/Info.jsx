"use client"

import {useState} from 'react'
import { BsInfo } from 'react-icons/bs'

const Info = ({ desc, children }) => {
    
  const [visible, setVisible] = useState(false);

  return (
    <div 
        className=" h-full p-1 w-auto rounded-[10px] bg-[#2A4565] cursor-pointer flex flex-row items-center transition-all ease-in-out"
        onMouseEnter={() => setVisible(true)}
        onMouseOut={() => {
          setTimeout(2000, () => {})
          setVisible(false)
        }}
        onClick={() => setVisible(true)}
    >
        <BsInfo className="text-white" />
        {
            visible ? (
                <p className="text-[12px] font-mono italic text-white">: {desc}</p>
            ) : null
        }
    </div>
  )
}

export default Info