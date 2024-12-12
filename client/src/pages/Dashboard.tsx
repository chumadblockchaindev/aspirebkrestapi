import { FormEvent, useEffect, useState } from "react"
import History from "../components/History"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

export interface User {
     _id: string, email: string, name: string, account: string, balance: string, history: HistoryInterface}

export type HistoryInterface = {
    _id: string,
    date: string,
    amount: string,
    txnType: string,
    status: string
}

const Dashboard = () => {
    const storedData = JSON.parse(localStorage.getItem("user_data") as string)
    const[userData, setUserData] = useState<User>()
    const navigate = useNavigate()
    const[depositModal, setDepositModal] = useState(false)
    const[transferModal, setTransferModal] = useState(false)
    const[notifyModal, setNotifyModal] = useState(false)
    const[loading, setLoading] = useState(true)


    useEffect(() => {
        // check if no token then redirect to login page
        // if there is token, use the _id in the storage to fetch userdata afresh
        async function fetchData(){
            try {
                    if(!storedData){
                        console.log(storedData)
                        navigate('/login')
                    }

                await axios.post(`https://aspirebk-server.onrender.com/api/user`, {id: storedData.user._id})
                .then(res => {
                    setUserData(res.data.user)
                    setLoading(false);  
                })
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [userData]);

    function logout() {
     localStorage.setItem("user_data", '');

     setTimeout(() => {
        navigate('/login')
     }, 3000)
     toast.success("Logout Successful", {position: "top-center"})
    }


    
function handleDeposit(e: FormEvent) {
    // Get form values and store in the database 
    // The rest api would return the response and the app should update
    e.preventDefault()
    // Get form values and store in the database 
    let formData = new FormData(e.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData.entries());

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    console.log(formObj)
    const finalData = {
        id: userData?._id,
        newdeposit: {
            date: currentDate,
            ...formObj,
            txnType: 'deposit',
            status: 'pending',
        }
    }

    console.log(finalData)

    axios.put("https://aspirebk-server.onrender.com/api/user/deposit", finalData)
    .then(res => {
        if(res.statusText === 'OK')
        toast.success("Deposit Pending Contact Customer Support", { position: 'top-center' })
        setDepositModal(!depositModal)
    })
    .catch(err => console.error(err))
}

function handleTransFer(e: FormEvent) {
    e.preventDefault()
    // Get form values and store in the database 
    let formData = new FormData(e.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData.entries());

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    
    const finalData = {
        id: userData?._id,
        newtransfer: {
            date: currentDate,
            ...formObj,
            txnType: 'transfer',
            status: 'pending',
            step: 5,
            code: ""
        }
    }

    axios.put("https://aspirebk-server.onrender.com/api/user/transfer", finalData)
    .then(res => {
        if(res.data.message == 'Pin Incorrect')
            toast.success("Pin Incorrect", { position: 'top-center' })
        if(res.statusText === 'OK')
        toast.success("Transfer Sent", { position: 'top-center' })
        setTransferModal(!transferModal)
    })
    .catch(err => console.error(err))
}

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

  return (
        <div className="max-w-[500px] h-screen drop-shadow-xl mx-auto p-4">
            <div className="bg-neutral-300 rounded-lg">
            <div className="flex justify-between items-center p-4">
                <div className="avatar">
                    <div className="w-24 border-stone-800 border-2 rounded-full">
                        <img src="" />
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {/* <i className="fa-sharp fa-solid fa-user fa-xl"></i> */}
                    <button onClick={() => setNotifyModal(true)} className="bg-neutral-300 p-2 rounded-full tooltip" data-tip="Notification"> <i className="fa-solid fa-bell fa-xl"></i></button> {/**Notification */}
                    <button className="bg-neutral-300 p-2 rounded-full tooltip" data-tip="Logout" onClick={logout}><i className="fa-duotone fa-solid fa-right-from-bracket fa-xl"></i></button>
                </div>
            </div>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-black">
                    Welcome<br /> back,<br /> {userData && userData?.name}
                </h1>
                <h2 className="text-lg font-bold text-black">Account Number: {userData && userData?.account}</h2>
            </div>
            <div className="card bg-neutral text-primary-content w-72 h-44 mx-auto">
                <div className="card-body text-center">
                    <h3>Your Savings Account Balance </h3>
                    <h6 className="text-xl">${userData && userData?.balance}</h6>
                    <div className="card-actions justify-center">
                        <button onClick={() => setDepositModal(true)} className="btn btn-xs"><i className="fa-solid fa-piggy-bank"></i>Deposit</button>
                        <button onClick={() => setTransferModal(true)} className="btn btn-xs"><i className="fa-solid fa-money-bill">Transfer</i></button>
                    </div>
                </div>
            </div>
            
                <History history={userData?.history} />
        </div>
        <dialog id="my_modal_1" className={notifyModal ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Notification</h3>
                <p className="py-4">No Notification found</p>
                <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={() => setNotifyModal(!notifyModal)}>Close</button>
            </form>
            </div>
            </div>
            </dialog>

            <dialog id="my_modal_3" className={transferModal ? 'modal modal-open': 'modal'}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setTransferModal(!transferModal)}>✕</button>
          </form>

          <form className="space-y-2 mx-auto" onSubmit={handleTransFer} id="form-Doc">
            <label className="input input-bordered flex items-center gap-2">
                Account Number
                <input type="text" className="grow" placeholder="account number" name="accnum"/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                Account Name
                <input type="text" className="grow" placeholder="name" name="accname"/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                Amount
                <input type="text" className="grow" placeholder="amount" name="amount"/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                Enter Transaction pin
                <input type="text" className="grow" placeholder="pin" name="pin"/>
                </label>
                <button type="submit" className="btn btn-secondary">Transfer</button>
          </form>
        </div>
      </dialog>

      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
        <dialog id="my_modal_5" className={!depositModal ? 'modal modal-bottom sm:modal-middle' : 'modal modal-bottom sm:modal-middle modal-open'}>
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setDepositModal(!depositModal)}>✕</button>
          </form>
            <h3 className="font-bold text-lg">Deposit</h3>
            <div className="modal-action">
            <form method="dialog" className="space-y-2 mx-auto" onSubmit={handleDeposit}>
                <label className="input input-bordered flex items-center gap-2">
                Amount
                <input type="text" className="grow" placeholder="amount" name="amount"/>
                </label>
                <select  className="select select-success w-full max-w-xs" name="paymethod">
                    <option disabled selected>Payment Method</option>
                    <option>Card</option>
                    <option>Paypal</option>
                    <option>Cryptocurrency</option>
                </select>
                <button className="btn btn-secondary">Deposit</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default Dashboard