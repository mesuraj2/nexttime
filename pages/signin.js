import { getCsrfToken,getProviders, signIn,getSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import { useState } from "react"
import Router from "next/router"

export default function SignIn({ csrfToken,providers }) {
    const [email, setemail] = useState(" ")
    const [password, setpassword] = useState(" ")
    const [message, setmessage] = useState(null)

    const SigninUser= async (e)=>{
        e.preventDefault();
        let option ={redirect:false,email,password}
        const res=await signIn("credentials",option)
        setmessage(null)
        if(res?.error){
            setmessage(res.error)
        }
        else{
        return Router.push("/");
        }
        
        // console.log(email,password)
    }
    
    const signupUser= async (e)=>{
        e.preventDefault();
        setmessage(null)
        const res =await fetch('/api/register', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email,password}),
        })
        let data=await res.json()
        
        // if(data.message){
        //   setmessage(data.message)
        // }
        if(data.message=='registerd succesfully'){
          let option ={redirect:false,email,password}
          const res=await signIn("credentials",option)
          // console.log('reach till here')
          return Router.push("/");
        }
        else{
          setmessage(data.message);
        }
    }
  return (
    <>
    <form >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" value={email} onChange={e=>setemail(e.target.value)}/>
      </label>
      <label>
        Password
        <input type="email" id="email" name="email" value={password} onChange={e=>setpassword(e.target.value)} />
      </label>
      <p>{message}</p>
      <button onClick={(e)=>SigninUser(e)}>Sign In</button>
      <button onClick={(e)=>signupUser(e)}>Sign Up</button>
      
    </form>


    {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </>
  )
}

export async function getServerSideProps(context) {
    const {req}=context;
    const session = await getSession({req})
        if(session){
            return {
                redirect:{destination:"/"}
            }
        }
    
  const csrfToken = await getCsrfToken(context)
  const providers = await getProviders()
  return {
    props: { csrfToken,providers },
  }
}