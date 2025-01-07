import { Router } from "express";
import { createNewUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userController";
const router = Router()

router.get('/list', getAllUsers)
router.post('/create', createNewUser)
router.get('/detail/:id', getSingleUser)
router.put('/update/:id', updateUser)


export default router