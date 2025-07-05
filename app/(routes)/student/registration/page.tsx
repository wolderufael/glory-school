'use client'

import MultiStepForm from "@/components/studentForm/multiStepForm"


const Registration=()=>{
    console.log("window", typeof window);
    console.log("File exists?", typeof File);

    return(
        <MultiStepForm   />
    )
}

export default Registration