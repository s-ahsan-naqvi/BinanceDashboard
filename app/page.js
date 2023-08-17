"use client"

import { useState, useEffect } from "react"
import Card from "@/components/Card"
import Table from "@/components/Table"
import Loader from "@/components/Loader"
import Info from "@/components/Info"

function CommaFormatted(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [load, setLoad] = useState(true)

  const [data, setData] = useState({
    "futureWalletBalance": 0,
    "futureMarginBalance": 0,
    "spotAssetBalance": 0
  })
  
  useEffect(() => {

    const getData = async () => {
      try {
        setLoading(true)
        const res = await fetch("http://localhost:5000/api/v1/futures/getAccountInfo")
        const d = await res.json()
        
        const res1 = await fetch("http://localhost:5000/api/v1/spot/getTotalBalance")
        const d2 = await res1.json()
        console.log(res)

        setData({
          "futureWalletBalance": d?.totalWalletBalance,
          "futureMarginBalance": d?.totalMarginBalance,
          "spotAssetBalance": d2?.amount,
        })
        console.log(data)
        
        setTimeout(() => {}, 5000)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    

    const getSpotData = async () => {
      try {

        setLoad(true)

        const res = await fetch("http://localhost:5000/api/v1/spot/getTotalBalance")
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
      } finally {
        setLoad(false)
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
    "totalInit": 747723,
    "totalCurrent": parseFloat((parseFloat(data.futureWalletBalance) + parseFloat(data.spotAssetBalance))),
    "PnL": parseFloat((parseFloat(data.futureWalletBalance) + parseFloat(data.spotAssetBalance)) - 747723),
    "spotInit": 500000,
    "futureInit": 247723,
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

    <section className="min-h-screen w-full p-3 sm:p-9" >
      <h1 className="text-3xl sm:text-5xl text-[#22D483] font-bold tracking-wide">Project Curve</h1>      

      {
        !(loading && load) ? (
        <>
          
          <div className='flex flex-col sm:flex-row sm:gap-4'>
            <Card head="Spot" profit={isProfit("S")} value={amounts.spotCurrent} />
            <Card head="Futures" profit={isProfit("F")} value={amounts.futureCurrent} />
          </div>
          
          <div className='flex flex-col gap-4 mt-8'>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <h2 className='text-white text-xl font-medium'>Total Initial Investment:</h2>
              <h1 className="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-[#2AFBA2] to-blue-300">{CommaFormatted(amounts.totalInit.toFixed(2))} USD</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <h2 className='text-white text-xl font-medium'>Current Valuation:</h2>
              <h1 className="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-[#2AFBA2] to-blue-300">{CommaFormatted(amounts.totalCurrent.toFixed(2))} USD</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <h2 className='text-white text-xl font-medium'>Total Profit/Loss:</h2>
              <h1 
                className={`font-bold text-transparent text-xl bg-clip-text ${isTotalLoss() ? "bg-gradient-to-r from-[#fb4d2a] to-[#ff2fc1]" : "bg-gradient-to-r from-[#2AFBA2] to-blue-300"}`}
              >
                {CommaFormatted(amounts.PnL.toFixed(2))} USD
              </h1>
              <Info desc="Current Valuation - Total Initial Investment" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <h2 className='text-white text-xl font-medium'>ROI:</h2>
              <h1 className="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-[#2AFBA2] to-blue-300">{CommaFormatted(roi(amounts.PnL, amounts.totalInit).toFixed(2))}%</h1>
              <Info desc="Profit or Loss / Total Initial Investment"/>
            </div>
          </div>
        </>
        ) : (
          <div className="p-6">
            <Loader />
          </div>
        )
      }
      <h2 className="text-2xl font-bold text-emerald-400 mt-6 mb-3">Financials:</h2>
      <Table />
    </section>
  )
}
