import connectMongo from "@/database/connection"
import Users from '@/model/schema.js'
import { hash } from "bcryptjs"

export default async function handler(req, res){
connectMongo().catch(error => res.json({error: "Connection Failed"}))

//Only Post Method is Accepted Here
if(req.method === "POST"){
    if(!req.body) return res.status(404).json({error:"Don't have form data!"});
    const {username, email, password} = req.body

//Check Duplicate Users
    const checkExisting = await Users.findOne({email});
    if(checkExisting) return res.status(422).json({message: "User already exists."})

//Hash Password Before Storing In Database
Users.create({username, email, password : await hash(password, 12)}, function(err, data){
    if(err) return res.status(404).json({err});
    res.status(201).json({status : true, user: data})
})

} else{
    res.status(500).json({message: "HTTP Method not valid, only POST accepted."})
}
}