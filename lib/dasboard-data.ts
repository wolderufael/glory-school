import React from "react";

export const quickStatsData= [
    {
        title: "Total Students",
        value: "1,200",
        change: "+5%",
        icon: (props:any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8v4l3.5 2.5M12 16h.01"></path></svg>,
        color: "text-blue-500"
    },
    {
        title: "New Admissions",
        value: "300",
        change: "+10%",
        icon: (props:any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8v4l3.5 2.5M12 16h.01"></path></svg>,
        color: "text-green-500"
    },
    {
        title: "Graduated Students",
        value: "150",
        change: "-3%",
        icon: (props:any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52-.01 9.99-4.49 9.99-9.99C22 .49 17.52-3 .01-3H0v1h1c5.52-.01 9.99-4.49 9.99-9.99C11 .49 .49-3 .01-3H0v1
    }
]