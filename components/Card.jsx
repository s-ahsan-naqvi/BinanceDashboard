
const Card = ({ head, profit, value}) => {

    return (
      <div className='bg-[#2A4565] py-6 px-4 my-6 rounded-[8px] flex flex-col max-w-[400px] min-w-[300px]'>
          <h2 className='text-blue-300 text-[32px] font-extrabold'>{head}</h2>
          <div className="flex flex-row gap-2 items-center">
              {profit ? (
                  <>
                      <p className="text-white text-base font-medium">Total Assets: </p>
                      <div className="flex flex-row gap-1 items-center">
                          <span className='text-emerald-400 text-lg font-bold'>{value}</span>
                          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="3" y="4.5" width="2" height="8" fill="#19FF19"/>
                              <path d="M4 0.5L7.4641 5L0.535898 5L4 0.5Z" fill="#19FF19"/>
                          </svg>
                      </div>
                  </>
              ) : (
                  <>
                      <p className="text-white text-base font-medium">Total Assets: </p>
                      <div className="flex flex-row gap-1 items-center">
                          <span className='text-[#D4222D] text-lg font-bold'>{value}</span>
                          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="5" y="8.5" width="2" height="8" transform="rotate(180 5 8.5)" fill="#FF1919"/>
                              <path d="M4 12.5L0.535898 8L7.4641 8L4 12.5Z" fill="#FF1919"/>
                          </svg>
                      </div>
                  </>) }
          </div>
      </div>
    )
  }
  
  export default Card