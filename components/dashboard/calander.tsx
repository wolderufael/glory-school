'use client'

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

const AcademicCalendar = ()=>{
      const [date, setDate] = useState<Date | undefined>(new Date())

    return(
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-2xl font-bold mb-4">Academic Calendar</h1>
            <p className="text-lg">This is the academic calendar page.</p>
            <div className="mt-6">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border border-gray-300 rounded-lg shadow-sm"
                />
           </div>

        </div>


    )
}

export default AcademicCalendar;    