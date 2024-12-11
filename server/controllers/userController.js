import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const create = async (req, res) => {
    try {
        const newUser = new  User(req.body);
        const { email } = newUser
        
        const userExist = await User.findOne({ email })
    
        if(userExist) {
            return res.status(400).json({ message: "User already exist"})
        }

        newUser.account = generateAccountNumber();
        newUser.balance = 10
        newUser.role = 'user'


        // const token = jwt.sign({id: newUser._id}, "secretkey123", {
        //     expiresIn: '1d'
        // })

        await newUser.save()
        return res.status(201).json({ message: "Account created successfully" })
    } catch (error) {
        return res.status(500).json({ errormessage: error.message})
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email })

        if(!userExist){
            return res.status(400).json({ message: "No account found with this email please register"})
        }
        // compare password of the corresponding email with the password provided
        if(userExist.password === password){
            const token = jwt.sign({id: userExist._id}, 'secretkey123', {
                expiresIn: '1d'
            })

            return res.status(200).json({ 
                message: "success", 
                token, 
                user: {
                    _id: userExist._id,
                    name: userExist.firstName,
                    account: userExist.account,
                    balance: userExist.balance,
                    history: userExist.history,
                    email: userExist.email
                }
            })
        }else {
            res.status(401).json({ message: "Passwprd does not match" })
        }
        // if successfull compare with a success message and 
        // user data that will show on the frontend
    
    } catch (error) {
        return res.status(500).json({ errormessage: error.message})
    }
}

export const fetchAllUsers = async (req, res) => {
    // admin api calls this when admins opens
        try {
            const userData = await User.find();
    
            if(!userData || userData.length === 0) {
                return res.status(404).json({ message: "User data not found"});
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
}

export const updateUserBalance = async (req, res) => {
//     // admin calls this api to update a specific balance of a User
        try {
            const id = req.body.id;
            const userExists = await User.findById(id);
            if(!userExists) {
                return res.status(404).json({ message: "User not found"});
            }

            const updatedData = await User.findByIdAndUpdate(id, req.body.balance)
            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
}

export const userTransfer = async (req, res) => {
    // creates a transaction history and save in history array
    try {
        const id = req.body.id;
        const userExists = await User.findById(id);
        if(!userExists) {
            return res.status(404).json({ message: "User not found"});
        }
        if(userExists.pin !== req.body.newtransfer.pin){
            return res.status(404).json({ message: "Pin Incorrect"});
        }   

        const updatedData = await User.findOneAndUpdate(
            { _id: req.body.id }, 
            { $push: { history: req.body.newtransfer  } },
            { new:true }
        )
                
        
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const userDeposit = async (req, res) => {
    // creates a transaction history and save in history array
    try {
        const id = req.body.id;
        const userExists = await User.findById(id);
        if(!userExists) {
            return res.status(404).json({ message: "User not found"});
        }

        const updatedData = await User.findOneAndUpdate(
            { _id: req.body.id }, 
            { $push: { history: req.body.newdeposit  } },
            { new:true }
        )
                
        
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}



export const retryTransfer = async (req, res) => {
    // creates a transaction history and save in history array
    try {
        const id = req.body.id;

        const userExists = await User.findById(id);
        if(!userExists) {
            return res.status(404).json({ message: "User not found"});
        }
        // check if code matcth if it matches  update txn. to success 
        const result = await User.findOne({'history': {$elemMatch: {code: req.body.code}}})

        // if code does not match reduce the step and update the db     
        if(!result){
           const updated = await User.updateOne({'history.id': req.body.historyid}, 
                {'$set': {
                    'history.$.step': 3 ,
                }})

                if (updated) return res.status(401).json({ message: "Code Incorrect" })
            } 
        // update transaction to success and deduct balance
            await User.updateOne({'history._id': req.body.historyid}, 
                {'$set': {
                    'history.$.status': 'completed',
                }})

             const finalUpdate = await User.findByIdAndUpdate(id, {'balance': '200'})

        res.status(200).json(finalUpdate)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getSpecificUser = async(req, res) => {
    try {
        const id = req.body.id;
        const userExists = await User.findById(id);
        if(!userExists) {
            return res.status(404).json({ message: "User not found"});
        }

        const token = jwt.sign({id: userExists._id}, 'secretkey123', {
            expiresIn: '1d'
        })

        res.status(200).json({
            message: "success", 
            token, 
            user: {
                _id: userExists._id,
                name: userExists.firstName,
                account: userExists.account,
                balance: userExists.balance,
                history: [userExists.history],
                email: userExists.email
            }
        });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteUser = async (req, res) => {
    // when this api is called it delete specific user
    try {
        const id = req.body.id;
        const userExists = await User.findById(id);
        if(!userExists) {
            return res.status(404).json({ message: "User not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully"}); 
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}


export const generateCode = async (req, res) => {
    // admin calls this api and it generates code and saves to the 
    // userDB in correspondence whith the txn
    try {
        const id = req.body.id;
        const userExists = await User.findById(id);
        if(!userExists) {
            return res.status(404).json({ message: "User not found"});
        }
        const txnCode = generateSixDigits()
                // update code of specific txn.
        await User.updateOne({'history._id': req.body.historyid}, 
                    {'$set': {
                        'history.$.code': txnCode.toString()
                    }})
    
        res.status(200).json({ txnCode });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

function generateAccountNumber() {
    // Generate a random number between 1e9 and 1e10 - 1
    const randomNumber = Math.floor(1e9 + Math.random() * 9e9);
    return randomNumber;
  }

  function generateSixDigits() {
    // Generate a random number between 1e9 and 1e10 - 1
    const randomNumber = Math.floor(1e5 + Math.random() * 9e5);
    return randomNumber;
  }