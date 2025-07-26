import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
 
  return [
    { title: "ResumeMind"},
    { name: "description", content: "Smart Feedback For your dream job! " },
  ];
}

export default function Home() {

  const {auth}=usePuterStore();
  const  navigate=useNavigate();

  useEffect(()=>{
     if(!auth.isAuthenticated) navigate('/auth?next=/');
     },[auth.isAuthenticated])

  useEffect(() => {
    if (typeof window !== "undefined" && window.puter?.ai?.chat) {
      window.puter.ai.chat();
    }
  }, []);
  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/> 
        {/* {window.puter.ai.chat()}  it was causeing error so wrap it in useeffect */}
     <section className="main-section">
        <div className="page-heading py-16">
             <h1>
              Track Your Applications And Resume
             </h1>
             <h2>
               Review your submissions and check  AI-powered feedback
             </h2>
        </div>
    
      
      {resumes.length>0 && (
       <div className="resumes-section">
         {resumes.map((resume)=>(
          <ResumeCard key={resume.id} resume={resume}/>
     ))}
      </div>
      )}
       </section>
    
    
  </main>
}
