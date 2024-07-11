import React from "react"

export const AllDates = () => {
    const dates: Date [] = []
    for(let i = 0; i < 20; i++){
        const date = new Date().setDate(new Date().getDate() + i)
        dates.push(new Date(date))
    }
    return(
        <div className={`w-10/12 flex gap-3 border-2 rounded-md mt-5 mx-auto py-3 overflow-auto touch-auto`} >
            {dates.map((d, i) => (
                <div key={i} className={`rounded-md px-5 py-2 ${i < Math.round(19/5)-1 ? "hidden": ""} ${i === Math.round(19/2)-1 ? "border-2 border-gray-300 shadow-lg" : "text-gray-600"}`}>
                    {/* get week day name */}
                    <p className={`text-md font-semibold w-full`}
                    >{`${d.toDateString().split(" ")[0]} ${d.toDateString().split(" ")[2]}`}</p>
                    <p className="text-sm w-full">{'from $200'}</p>
                </div>
            ))}
        </div>
    )
}

