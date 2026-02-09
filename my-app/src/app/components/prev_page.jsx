"use client"
import { useEffect, useOptimistic, useState,startTransition } from "react";
import Form from "./components/Form";

export default function Home() {
  let [comments,setComments]=useState([{body:"hello",user:{username:"xyz"}}])
  let [optimisicComments,addComments]=useOptimistic(
      comments,
      (prevComment,newComment)=>[...prevComment,{...newComment,body:"optimisitic" + newComment.body}]
  )

  useEffect(()=>{async function fetchComments(){
    let data=await fetch('https://dummyjson.com/comments')
    data=await data.json()
    console.log(data)
    setComments(data.comments)
    startTransition(()=>{
      addComments(data.comments);}) // merge server data into optimistic state
  }
  fetchComments()
  },[])



  return (
    <div className=" text-black font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {optimisicComments && optimisicComments.map((c)=>(
        <div key={c.id} className="border p-2 flex justify-between w-full -mb-5">
          <div>
            {c.user?.username}
          </div>
          {c.body}
        </div>
      ))}

      <Form addComments={addComments} setComments={setComments}></Form>
    </div>
  );
}
