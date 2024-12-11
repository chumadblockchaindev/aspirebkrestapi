import express from 'express'
import { create, deleteUser, fetchAllUsers, generateCode, 
        getSpecificUser, login, retryTransfer, updateUserBalance, 
        userDeposit, userTransfer } from '../controllers/userController.js'

const route = express.Router()

route.post("/create/account", create)
route.post("/login", login)
route.get("/fetchusers", fetchAllUsers)
route.put("/update/balance", updateUserBalance)
route.put("/user/transfer", userTransfer)
route.put("/user/deposit", userDeposit)
route.put("/retry/transfer", retryTransfer)
route.post("/user", getSpecificUser)
route.delete("/user/delete", deleteUser)
route.post("/user/code", generateCode)



export default route