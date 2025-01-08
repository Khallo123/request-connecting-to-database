import { Request, Response } from "express";
import { defaultErrorMessage } from "./contenents";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface ICreateUserPyload {
    username : string
    password : string 
    phone_number : string
}

// Create User 
export const createNewUser = async (req : Request, res : Response) => {
    try {
        const {username, password, phone_number} = req.body as ICreateUserPyload

        if(!username || !password || !phone_number) {
            res.status(404).json({
                isSuccess : false,
                message : "Validation error!"
            })

            return
        }

        const users = await prisma.users.create({
            data: {
                username,
                password,
                phone_number
            }
        })

        res.status(201).json({
            isSuccess : true,
            message : "Successfylly Created user!",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess : false,
            message : defaultErrorMessage
        })
    }
}

// Get All Users
export const getAllUsers = async (req : Request, res : Response) => {
    try {
        const users = await prisma.users.findMany()

        if(!users){
            res.status(404).json({
                isSuccess : false,
                message : "Users not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess : true,
            message : "Successfully fetched all users!",
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess : false,
            message : defaultErrorMessage
        })
    }
}

// Get Single User
export const getSingleUser = async (req : Request, res : Response) => {
    try {
        const {id} = req.params

        const user = await prisma.users.findUnique({
            where : {id : Number(id)}
        })

        if(!user){
            res.status(404).json({
                isSuccess : false,
                message : "User not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess : true,
            message : "Successfully fetched user!",
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess : false,
            message : defaultErrorMessage
        })
    }
}

// Update User 
export const updateUser = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const {username, password, phone_number} = req.body as ICreateUserPyload

        if(!id || (!username && !password && !phone_number)){
            res.status(404).json({
                isSuccess : false,
                message : "Validation error"
            })

            return
        }

        const users = await prisma.users.update({
            where: {id: Number(id)},
            data: {username, password, phone_number}
        }) 

        res.status(200).json({
            isSuccess : true,
            message : "Successfully updated user!",
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess : false,
            message : defaultErrorMessage
        })
    }
}