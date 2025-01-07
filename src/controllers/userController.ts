import { Request, Response } from "express";
import { defaultErrorMessage } from "../constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface ICreateUserPyload {
    username : string
    password : string
    phone_number : string
}

// Get all users
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