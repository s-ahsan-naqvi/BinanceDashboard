


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


const Card = ({ head, profit, value}) => {

    return (
    <div className="h-full  max-w-[400px] min-w-[300px] rounded-[10px] bg-gradient-to-b from-[#2AFBA2] to-blue-300 py-[2px] px-[2px] mt-6">
      <div className='bg-[#2A4565]  rounded-[8px] flex flex-col max-w-[400px] min-w-[300px] px-2 py-6'>
        <div className="flex flex-row items-center justify-between">
          <h2 className='text-blue-300 text-[24px] font-extrabold'>{head}</h2>
          <p className="bg-[#142232] rounded-md p-1 text-white text-[14px]">USD</p>
        </div>
          <div className="flex flex-row gap-2 items-center">
              {profit ? (
                  <>
                      <p className="text-white text-base font-medium">Total Assets: </p>
                      <div className="flex flex-row gap-1 items-center">
                          <span className='text-emerald-400 text-lg font-bold'>{CommaFormatted(value.toFixed(2))}</span>
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
                          <span className='text-[#D4222D] text-lg font-bold'>{CommaFormatted(value.toFixed(2))}</span>
                          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="5" y="8.5" width="2" height="8" transform="rotate(180 5 8.5)" fill="#FF1919"/>
                              <path d="M4 12.5L0.535898 8L7.4641 8L4 12.5Z" fill="#FF1919"/>
                          </svg>
                      </div>
                  </>) }
          </div>
      </div>
    </div>
    )
  }
  
  export default Card