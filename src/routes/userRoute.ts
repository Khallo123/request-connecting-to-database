import { Router } from "express";
import { createNewUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userController";
const router = Router()


router.post('/create', createNewUser)
router.get('/list', getAllUsers)
router.put('/update/:id', updateUser)
router.get('/details/:id', getSingleUser)


export default router 