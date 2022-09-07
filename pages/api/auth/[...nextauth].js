import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
// import clientPromise from "./lib/mongodb"
import FacebookProvider from "next-auth/providers/facebook";
import connectDB from "./lib/connectDB";
import Users from '../../models/userModel'
import bcrypt from 'bcrypt'

connectDB();

export default NextAuth({
  // Configure one or more authentication providers
  // adapter: MongoDBAdapter(clientPromise),
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email=credentials.email;
        const password=credentials.password;
          const user=await Users.findOne({email})
          if(!user){
            throw new Error("you havent registered yet")
          }
          if(user){
            return signInUser({password,user});
          }
      }
    }),
  ],
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret:"secret",
  database:process.env.MONGODB_URI
})



const  signInUser =async ({password,user})=>{
  if(!password){
    throw new Error("please type password");
  }
  const match=await bcrypt.compare(password,user.password)
  if(!match){
    throw new Error("incorrect password");
  }
  else console.log("login in")
  return user
}