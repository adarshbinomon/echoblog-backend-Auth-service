import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { createAccessToken } from "./jwt";

export const verifyUser = (req:Request,res:Response,next:NextFunction)=>{
    const userAccessToken = req.cookies.accessToken;
    const userRefreshToken = req.cookies.refreshToken;

    if(!userRefreshToken){
        res.status(401).json({status:false,message:'invalid refresh token'})
    }
    console.log('accessToken',userAccessToken);
    console.log('userRefreshToken',userRefreshToken);
    next()
    

    jwt.verify(userAccessToken,process.env.ACCESS_SECRET_KEY || '', )
}