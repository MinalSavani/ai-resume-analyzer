import { cn } from "~/lib/utils";
const ATS=({
  score,
  suggestions,
}:{
  score:number;
  suggestions:{type:"good"|"improve";tip:string}[];

})=>{
   return (
    <div className={cn(
      "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
       score>69
       ?"from-green-100"
       :score>49
       ?"from-yellow-100"
       :"from-red-100"
    )}>
    <div className="flex flex-row gap-4 items-center">
        <img src={
          score>69
          ? "/icons/ats-good.svg"
          :score>49
          ?"/icons/ate-warning.svg"
          :"/icons/ats.bad.svg"
        } alt="" 
          className="w-0 h-10"
        />
        <p className="text-2xl font-semibold">
              ATS Score -{score}/100
        </p>
    </div>
    <div className="flex flex-col gap-2 ">
     <p className="font-medium text-xl">
            How well does your resume  through Applicant Tracking System?
     </p>
     <p className="text-lg text-gray-500">
        Your Resume Was Scanned like an employer woulld. Here's how it  performed:
     </p>
     {suggestions.map((suggestion,index)=>(
        <div className="flex flex-row  gap-3 items-center" key={index}>
         <img src={suggestion.type==="good"?"/icons/check.svg":"/icons/warning.svg"} alt="" className="w-4 h-4" />
         <p className="text-lg text-grayy-500">{suggestion.tip}</p>
        </div>
     ))}
     <p className="text-lg text-gray-500">
         Want a better score ?Improve your resume by appyling the suggestions listed below.

     </p>
    </div>
    </div>
   )
}

export default ATS;