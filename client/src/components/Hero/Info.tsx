import React, { useRef } from 'react'
import CountUp from 'react-countup'
import { IoFastFoodOutline } from 'react-icons/io5'
import { MdOutlineFoodBank } from 'react-icons/md'

const Info = () => {

    

    const countRef = useRef<HTMLDivElement | null>(null)
    const countRef2 = useRef<HTMLDivElement | null>(null)
    const countRef3 = useRef<HTMLDivElement | null>(null)


    const setPlus = (nb: React.MutableRefObject<HTMLDivElement>) => {
        switch(nb) {
            case countRef:
                if (!countRef.current.innerText.includes('+')) {
                    countRef.current.innerText = countRef.current.innerText + "+";
                }
                break;
            case countRef2:
                if (!countRef2.current.innerText.includes('+')) {
                    countRef2.current.innerText = countRef2.current.innerText + "+";
                }
                break;
            case countRef3:
                if (!countRef3.current.innerText.includes('+')) {
                    countRef3.current.innerText = countRef3.current.innerText + "+";
                }
                break;
        }
    }


  return (
<div className="info mr-3 w-[100%] flex justify-center"> 
        <div className="stats shadow">
        <div className="stat">
            <div className="stat-figure text-lime-300">
            <IoFastFoodOutline className="inline-block w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title"> Foods </div>
            <div className="stat-value" ref={countRef}> <CountUp delay={1} start={99} end={500} duration={4} onEnd={() => setPlus(countRef)} /></div>
            <div className="stat-desc"> you want to eat </div>
        </div>
        
        <div className="stat">
            <div className="stat-figure text-lime-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            <div className="stat-title"> People</div>
            <div className="stat-value" ref={countRef2}> <CountUp delay={1} start={0} end={50} duration={2} onEnd={() => setPlus(countRef2)} /></div>
            <div className="stat-desc"> visited our programme </div>
        </div>
        <div className="stat">
            <div className="stat-figure text-lime-300">
            <MdOutlineFoodBank className="inline-block w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">Meals </div>
            <div className="stat-value" ref={countRef3}> <CountUp delay={1} start={0} end={100} duration={3} onEnd={() => setPlus(countRef3)} /> </div>
            <div className="stat-desc"> made with our site </div>
            </div>
        </div>
        </div>
    )
}

export default Info