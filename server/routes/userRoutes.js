import express from 'express'
import { adminlogin, create, deleteUser, fetchAllUsers, generateCode, 
         getSpecificUser, 
         login, retryTransfer, updateUserBalance, 
        userDeposit, userTransfer } from '../controllers/userController.js'

const route = express.Router()

route.post("/create/account", create)
route.post("/login", login)
route.put("/update/balance/:id", updateUserBalance)
route.put("/user/transfer", userTransfer)
route.put("/user/deposit", userDeposit)
route.put("/retry/transfer/:id", retryTransfer)
route.delete("/user/delete/:id", deleteUser)
route.post("/user/code/:id", generateCode)
route.post("/admin/login", adminlogin)
route.post("/admin/allusers", fetchAllUsers)
route.post("/user", getSpecificUser)





export default route