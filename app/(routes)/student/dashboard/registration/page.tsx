'use client'
import dynamic from 'next/dynamic';


const MultiStepForm = dynamic(
  () => import("@/components/studentForm/multiStepForm"),
  { ssr: false }
);


const Registration = () => {
  console.log("TEST1111111111111111111111111")
   return(
        <MultiStepForm   />
    )
}

export default Registration

export const dynamicSetting = "force-dynamic";