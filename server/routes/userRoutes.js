import express from 'express'
import { adminlogin, create, deleteUser, fetchAllUsers, generateCode, 
         login, retryTransfer, updateUserBalance, 
        userDeposit, userTransfer } from '../controllers/userController.js'

const route = express.Router()

route.post("/create/account", create)
route.get("/login", login)
route.put("/update/balance/:id", updateUserBalance)
route.put("/user/transfer", userTransfer)
route.put("/user/deposit", userDeposit)
route.put("/retry/transfer", retryTransfer)
route.delete("/user/delete/:id", deleteUser)
route.post("/user/code/:id", generateCode)
route.get("/admin/login", adminlogin)
route.post("/admin/allusers", fetchAllUsers)




export default route