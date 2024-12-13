import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
            type: String,
            required: true
        },
        midName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        surfix: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        citizen: {
            type: String,
            required: true
        },
        homeAddr: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        accType: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        },
        confirmPin: {
            type: String,
            required: true
        },
        empStatus: {
            type: String,
            required: true
        },
        empName: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        },
        income: {
            type: String,
            required: true
        },
        tfn: {
            type: String,
            required: true
        },
        debitCard: {
            type: String,
            required: true
        },
        account: {
            type: String,
            required: false
        },
        balance: {
            type: Number,
            required: false
        },
        role: {
            type: String,
            required: false
        },
        history: [
            {
                    id: {
                        type: String,
                        required: false        
                    },
                    date: {
                        type: String,
                        required: true
                    },
                    amount: {
                        type: Number,
                        required: true
                    },
                    accname: {
                        type: Number,
                        required: true
                    },
                    accnum: {
                        type: Number,
                        required: true
                    },
                    txnType: {
                        type: String,
                        required: true
                    },
                    status: {
                        type: String,
                        required: true
                    },
                    code: {
                        type: String,
                        required: true
                    },
            }
        ]
});

export default mongoose.model("Users", userSchema);