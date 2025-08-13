import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";



const ResumeCard = ({resume:{id,companyName,jobTitle,feedback,imagePath}}:{resume:Resume}) => {
   
   const {fs}=usePuterStore();
   const[resumeUrl,setResumeUrl]=useState('');
// doubt whay is blob
  //  useEffect(()=>{
  //    const loadResume=async()=>{
  //       const blob=await fs.read(imagePath);
  //       if(!blob) return;
  //        let url=URL.createObjectURL(blob);
  //        setResumeUrl(url);
  //   }
  //   loadResume();
  //  },[imagePath])

   useEffect(() => {
  const loadResume = async () => {
    console.log("Reading imagePath:", imagePath); // ✅ LOG 1
    const blob = await fs.read(imagePath);
    if (!blob) {
      console.warn("No blob found for:", imagePath); // ✅ LOG 2
      return;
    }
    let url = URL.createObjectURL(blob);
    console.log("Blob URL generated:", url); // ✅ LOG 3
    setResumeUrl(url);
  };
  loadResume();
}, [imagePath]);


  return (
   <Link to={`/resume/${id}`}
    className="resume-card animate-in fade-in duration-1000">
     <div className="resume-card-header">
      <div className="flex flex-col gap-2">
        {companyName && 
          <h2 className="text-black font-bold break-words">{companyName}  </h2>
       }
        {jobTitle && 
          <h3 className="text-lg break-words text-gray-500"> {jobTitle}</h3>
        }    

        {
          !companyName && !jobTitle && <h2 className="text-black font-bold">

          </h2>
        }    
    </div>
    <div className="flex-shrink-0 ">
          <ScoreCircle score={feedback.overallScore}/>
    </div>
     </div>
  
     {resumeUrl &&  (
          <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
             <img
                src={resumeUrl}
                alt=""
                className="w-full h-[350px] max-sm:h-[200px] object-cover  object-top  "
              />
          </div>
     </div>
     )}
    
    
    </Link>
  );
}

export default ResumeCard;
