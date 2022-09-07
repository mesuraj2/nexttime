import bcrypt from  'bcrypt'
import  NextautUser from '../models/userModel'


export default async function handler(req, res) {
    const body =req.body;
    const exituser= await NextautUser.findOne({email:body.email})
    if(exituser){
        res.status(200).json({ message:"already exits" })
        return;
    }

    // const User =new NextautUser(body)

    const salt=await bcrypt.genSalt(10)
   const hasspass=await bcrypt.hash(body.password,salt)
   const User =new NextautUser({email:body.email,password:hasspass})
    await User.save()
    res.status(200).json({ message: 'registerd succesfully' })
  }