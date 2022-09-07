import React from "react"
import {signIn, signOut, useSession} from 'next-auth/react'

export default function Home() {
  const{data:session} =  useSession();
  return (
    <>
  {
    !session && (
      <>
      <h1>not sign in</h1>
      <button onClick={()=>{signIn()}}>sign in</button>
      </>
    )
  }
    
  {
    session && (
      <>
      <h1>Sign In as  {session.user.email} {session.user.name} </h1>
      <img src={session.user.image}  />
      
      <button onClick={()=>{signOut()}}>sign Out</button>
      </>
    )
  }
  </>
  )
}