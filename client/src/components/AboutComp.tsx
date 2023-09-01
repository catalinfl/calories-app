const AboutComp = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row w-full max-w-[1200px] lg:h-[800px]  mt-5 mx-auto">
    <div className="flex w-full lg:max-w-sm justify-center items-center"> 
    <ul className="steps steps-horizontal lg:steps-vertical lg:h-[500px] bg-lime-400 p-4 text-slate-600 rounded-lg">
        <li className="step step-primary"> Create an account or login </li>
        <li className="step step-primary"> Go on calculator and check calories </li>
        <li className="step"> Make a list </li>
        <li className="step"> Use it and control your weight </li>
    </ul>
    </div>
    <div className="flex flex-col w-full gap-2 bg-black p-4 mt-4"> 
        <div className="flex flex-col w-full items-end">
            <div className="bg-purple-500 p-8 rounded-md max-w-xs sm:max-w-md "> 
            <p className="text-slate-700"> <span className="font-bold"> Create an account </span> to make a list or a meal. You can use the calculator without an account to see how many calories you need per day, but you need account to make an list and save them.  </p>
            </div>
        </div>
        <div className="flex flex-col w-full bg-black p-4">
            <div className="bg-purple-500 p-8 rounded-md max-w-xs sm:max-w-md "> 
            <p className="text-slate-700"> <span className="font-bold"> Check the calculator. </span> Enter your details about your weight to see how many calories you need per day to maintain your calories. </p>
            </div>
        </div>
        <div className="flex flex-col w-full items-end bg-black p-4">
            <div className="bg-purple-500 p-8 rounded-md max-w-xs sm:max-w-md "> 
            <p className="text-slate-700"> <span className="font-bold"> Make a list. </span> Make a list and access them. You now can see what are you eating and how many calories has everything you put in plate. </p>
            </div>
        </div>
        <div className="flex flex-col w-full bg-black p-4">
            <div className="bg-purple-500 p-8 rounded-md max-w-xs sm:max-w-md "> 
            <p className="text-slate-700"> <span className="font-bold"> You know </span> now to use my simple application, it has thousands of foods to choose from. </p>
            </div>
        </div>
    </div>
    </div>
    </>
    )
}

export default AboutComp