'use client'
import dynamic from 'next/dynamic';

const MultiStepForm = dynamic(
  () => import("@/components/studentForm/multiStepForm"),
  { ssr: false }
);


const Registration=()=>{
   return(
        <MultiStepForm   />
    )
}

export default Registration

export const dynamicSetting = "force-dynamic";