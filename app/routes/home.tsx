import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
 
  return [
    { title: "ResumeMind"},
    { name: "description", content: "Smart Feedback For your dream job! " },
  ];
}

export default function Home() {

  const {auth,fs,kv}=usePuterStore();
  const  navigate=useNavigate();
  // const[resumeUrl,setResumeUrl]=useState('');
  const[resumes,setResumes]=useState<Resume[]>([]);
  const[loadingResumes,setLoadingResumes]=useState(false);
  
  useEffect(()=>{
     if(!auth.isAuthenticated) navigate('/auth?next=/');
     },[auth.isAuthenticated])
     
 
   useEffect(()=>{
    const  loadResumes=async()=>{
       setLoadingResumes(true);

       const resumes=(await kv.list('resume:*',true)) as KVItem[];
       const parsedResumes=resumes?.map((resume)=>(
             JSON.parse(resume.value) as Resume      
       ))
       console.log("parsedResumes",parsedResumes);
       setResumes(parsedResumes||[]);
       setLoadingResumes(false);
      };
      loadResumes();
   },[]);
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.puter?.ai?.chat) {
  //     window.puter.ai.chat();
  //   }
  // }, []);
  useEffect(() => {
  const runChat = async () => {
    try {
      if (window.puter?.ai?.chat) {
        const response = await window.puter.ai.chat([
         { role: "user", content: "Hello AI, give me resume feedback!" }
      ]);
        console.log("Chat response:", response);
      }
    } catch (error) {
      console.error("AI chat error:", error);
    }
  };

  runChat();
}, []);

  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/> 
        {/* {window.puter.ai.chat()}  it was causeing error so wrap it in useeffect */}
     <section className="main-section">
        <div className="page-heading py-16">
             <h1>
              Track Your Applications And Resume
             </h1>
             {!loadingResumes && resumes?.length===0?(
             <h2>
               No Resumes found.Upload your first resume to get feedback
             </h2>
             ):(
                <h2>Review your submission and check AI Powered feedback</h2>
             )}
            
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="" />
          </div>
        )}
    
      
    {!loadingResumes && resumes.length>0 && (
       <div className="resumes-section">
         {resumes.map((resume)=>(
          <ResumeCard key={resume.id} resume={resume}/>
     ))}

     {!loadingResumes && resumes.length===0 && (
      <div className="flex flex-col items-center justify-center mt-10 gap-4 ">
        <Link to="/upload" className="primary-button w-fit text-xl font-semibold ">
         Upload Resume
        </Link>
      </div>
     )}
      </div>
      )}
       </section>
    
    
  </main>
}
