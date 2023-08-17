"use client"

import {useState, useEffect} from 'react'
import Loader from './Loader'


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

const fields = ["Trading Component", "Portfolio Size", "Annual Forecast", "Entry Point", "%age Target Return", "USD Invested YTD", "%age Return - Actual", "Profit/Loss - Actual" ]


// function CommaFormatted(amount) {
// 	var delimiter = ","; // replace comma if desired
// 	var a = amount.split('.',2)
// 	var d = a[1];
// 	var i = parseInt(a[0]);
// 	if(isNaN(i)) { return ''; }
// 	var minus = '';
// 	if(i < 0) { minus = '-'; }
// 	i = Math.abs(i);
// 	var n = new String(i);
// 	var a = [];
// 	while(n.length > 3) {
// 		var nn = n.substr(n.length-3);
// 		a.unshift(nn);
// 		n = n.substr(0,n.length-3);
// 	}
// 	if(n.length > 0) { a.unshift(n); }
// 	n = a.join(delimiter);
// 	if(d.length < 1) { amount = n; }
// 	else { amount = n + '.' + d; }
// 	amount = minus + amount;
// 	return amount;
// }

const Data = ({ data }) => {
  return (
    <div className='h-full w-full py-2 flex flex-col'>
      {
        data.map((obj) => (
          <div className="flex flex-row py-2">
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{obj.component}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{CommaFormatted((obj.portfolioSize).toFixed(2))}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{CommaFormatted((obj.annualReturnForecast).toFixed(2))}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{obj.entryPoint}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{obj.percTargetReturnTotal}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{CommaFormatted((obj.investedYTD).toFixed(2))}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{obj.percReturnTotalActual}</p>
            <p className="text-sm font-bold text-blue-300 px-3 min-w-[200px]">{CommaFormatted(obj.actualPnlUSD)}</p>
          </div>
        ))
      }
    </div>
  )
}


const Fields = () => {
  return (
    <div className='h-full w-full py-2 flex flex-row'>
      {
        fields.map((obj) => (
          <p className="text-md font-bold text-emerald-400 px-3 min-w-[200px]">{obj}</p>
        ))
      }
    </div>
  )
}

const Totals = ({ data }) => {
  return (
    <div className='h-full w-full pb-2 flex flex-row'>
      {
        data.map((obj) => (
          <p className="text-sm font-bold text-emerald-200 px-3 min-w-[200px]">{obj.val}</p>
        ))
      }
    </div>
  )
}



const Table = () => {

  const [load, setLoad] = useState(true);

  const [loading, setLoading] = useState(true);
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
        

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    

    const getSpotData = async () => {
      try {

        setLoad(true);

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

  
const values = [
  {
    "component": "FUTURES",
    "portfolioSize": 250000,
    "annualReturnForecast": 480000,
    "entryPoint": "Every Month",
    "percTargetReturnTotal": `${41.7}%`,
    "investedYTD": 247273,
    "percReturnTotalActual": `${roi(amounts.futureCurrent - amounts.futureInit, 247273).toFixed(2)}%`,
    "actualPnlUSD": `${(amounts.futureCurrent - amounts.futureInit).toFixed(2)} USD`
  },
  {
    "component": "SPOT",
    "portfolioSize": 600000,
    "annualReturnForecast": 300000,
    "entryPoint": "Bottom Formation",
    "percTargetReturnTotal": `${27.3}%`,
    "investedYTD": 500000,
    "percReturnTotalActual": `${roi(amounts.spotCurrent - amounts.spotInit, 500000).toFixed(2)}%`,
    "actualPnlUSD": `${(amounts.spotCurrent - amounts.spotInit).toFixed(2)} USD`
  },
]

  
const totals = [
  {
    "val": "TOTALS"
  },
  {
    "val": CommaFormatted((850000).toFixed(2))
  },
  {
    "val": CommaFormatted((780000).toFixed(2))
  },
  {
    "val": "Varied"
  },
  {
    "val": "Target 94% Minimum 41%"
  },
  {
    "val": CommaFormatted((747273).toFixed(2))
  },
  {
    "val": `${CommaFormatted(roi(((amounts.futureCurrent - amounts.futureInit) + (amounts.spotCurrent - amounts.spotInit)), amounts.totalInit).toFixed(2))}%`
  },
  {
    "val": `${CommaFormatted(((amounts.futureCurrent - amounts.futureInit) + (amounts.spotCurrent - amounts.spotInit)).toFixed(2))} USD`
  },
  ]


  return (
    <>
      {
        loading && load ? (
          <div className='p-6'>
            <Loader />
          </div>
          
        ) : (
          <div className='flex flex-col w-full h-full bg-[#2A4565] rounded-[10px] overflow-x-scroll'>
            <Fields data={fields} />
            <Data data={values} />
            <Totals data={totals}/>
          </div>

        )
      }
    </>
  )
}

export default Table