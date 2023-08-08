"use client"

import { useState, useEffect } from "react"
import Card from "@/components/Card"

export default function Home() {

  const [data, setData] = useState({
    "futureWalletBalance": 0,
    "futureMarginBalance": 0,
    "spotAssetBalance": 0
  })
  
  useEffect(() => {

    const getData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/futures")
        const d = await res.json()
        
        const res1 = await fetch("http://localhost:4000/api/v1/totalSpotBalance")
        const d2 = await res1.json()
        console.log(res)

        setData({
          "futureWalletBalance": d?.totalWalletBalance,
          "futureMarginBalance": d?.totalMarginBalance,
          "spotAssetBalance": d2?.amount,
        })
        console.log(data)
        

      } catch (err) {
        console.log(err)
      }
    }

    

    const getSpotData = async () => {
      try {

        const res = await fetch("http://localhost:4000/api/v1/totalSpotBalance")
        const d = await res.json()
        
        console.log(res)
        // snap.spotTotalAssets = data?.amount
        setData({
          ...data,
          "spotAssetBalance": d?.amount
        }
        )
        console.log(data)

      } catch (err) {
        console.log(err)
      }
    }

    getData()
    getSpotData()
    console.log(data)

  }, [])

  const roi = (netIncome, cost) => {
    let num = (netIncome / cost) * 100
    return num
  }



  const amounts = {
    "totalInit": 1100000,
    "totalCurrent": parseFloat((parseFloat(data.futureWalletBalance) + parseFloat(data.spotAssetBalance))),
    "PnL": parseFloat((parseFloat(data.futureWalletBalance) + parseFloat(data.spotAssetBalance)) - 1100000),
    "spotInit": 550000,
    "futureInit": 55000,
    "futureCurrent": (parseFloat(data.futureWalletBalance)),
    "spotCurrent": (parseFloat(data.spotAssetBalance))
    // "roi": roi((parseFloat(data.futureWalletBalance) + parseFloat(data.spotAssetBalance)), )
  }

  const isProfit = (type) => {
    switch (type) {
      case "F" : {
        if (amounts.futureCurrent > amounts.futureInit) return true
        else return false;
      }
      case "S" : {
        if (amounts.spotCurrent > amounts.spotInit) return true
        else return false;
      }

      default : {
        return false
      }
    }
  }

  useEffect(() => {

  },[])

  const isTotalLoss = () => {
    if (amounts.totalCurrent > amounts.totalInit) return false;
    else return true;
  }

  return (
    <section className="min-h-screen w-full p-3 sm:p-6" >

      <h1 className="text-4xl sm:text-3xl text-[#22D483] font-bold tracking-wide">My Account</h1>      
      
      <div className='flex flex-col sm:flex-row sm:gap-4'>
        <Card head="Spot" profit={isProfit("S")} value={amounts.spotCurrent} />
        <Card head="Futures" profit={isProfit("F")} value={amounts.futureCurrent} />
      </div>
      
      <div className='flex flex-col gap-4 mt-8'>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <h2 className='text-white text-2xl font-medium'>Total Initial Investment:</h2>
          <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-b from-[#2AFBA2] to-[#2F4BFF]">{amounts.totalInit} USD</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <h2 className='text-white text-2xl font-medium'>Current Valuation:</h2>
          <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-b from-[#2AFBA2] to-[#2F4BFF]">{amounts.totalCurrent} USD</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <h2 className='text-white text-2xl font-medium'>Profit/Loss:</h2>
          <h1 
            className={`font-bold text-transparent text-3xl bg-clip-text ${isTotalLoss() ? "bg-gradient-to-b from-[#fb4d2a] to-[#ff2fc1]" : "bg-gradient-to-b from-[#2AFBA2] to-[#2F4BFF]"}`}
          >
            {amounts.PnL} USD
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <h2 className='text-white text-2xl font-medium'>ROI:</h2>
          <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-b from-[#2AFBA2] to-[#2F4BFF]">{roi(amounts.PnL, amounts.totalInit)}%</h1>
        </div>
      </div>
    </section>
  )
}
