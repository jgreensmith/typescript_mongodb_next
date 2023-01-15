import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { Document } from "mongoose"

import User from "../../models/User";

interface IUserDoc extends Document {
    name: string,
    age: number
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { user } = req.body
           
            await dbConnect()
            

            const newUser: IUserDoc = new User({
                name: user.name,
                age: user.age,

            });
            

            await newUser.save() 
            
                

            res.status(200).json({newUser})
        } catch (error) {
            res.status(500).json({error});
        }
        
    }
}