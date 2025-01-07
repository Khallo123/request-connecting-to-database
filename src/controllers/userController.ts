import { Request, Response } from "express";
import { defaultErrorMessage } from "../constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface ICreateUserPyload {
    username : string
    password : string
    phone_number : string
}

// Get All Users
export const getAllUsers = async (req : Request, res : Response) => {
    try {
        const users = await prisma.users.findMany()

        res.status(200).json({
            isSuccess : true,
            message : "Successfylly fetched all users!",
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

// Create User
export const createNewUser = async (req : Request, res : Response) => {
    try {
        const {username, password, phone_number} = req.body as ICreateUserPyload

        if(!username || !password || !phone_number) {
            res.status(400).json({
                isSuccess : false,
                message : defaultErrorMessage
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
            message : 'Suceesfully created user!',
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
        const {id} = req.body 

        const user = await prisma.users.findUnique({
            where : {id: parseInt(id)}
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

export const updateUser = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const {username, password, phone_number} = req.body 

        if(!id || (!username && !password && !phone_number)){
            res.status(400).json({
                isSuccess : false,
                message : "User ID and at least one field to update are required"
            })

            return
        }

        const user = await prisma.users.update({
            where:{id: parseInt(id)},
            data: {username, password, phone_number}
        })

        res.status(200).json({
            isSuccess : true,
            message : "User successfully updated!",
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
