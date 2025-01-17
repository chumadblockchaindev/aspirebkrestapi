import { FormEvent, useEffect, useState } from "react"
import History from "../components/History"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

export interface User {
     _id: string, 
     email: string, 
     name: string, 
     account: string, 
     balance: string, 
     history: HistoryInterface
}

export type HistoryInterface = {
    userId: string,
    _id: string,
    date: string,
    amount: string,
    txnType: string,
    status: string
}

interface ModalInterface {
    notifyModal: boolean,
    modalTitle: string,
    modalText: string
}

const Dashboard = () => {
    const storedData = JSON.parse(localStorage.getItem("user_data") as string)
    const[userData, setUserData] = useState<User>()
    const navigate = useNavigate()
    const[depositModal, setDepositModal] = useState(false)
    const[transferModal, setTransferModal] = useState(false)
    const[modal, setModal] = useState<ModalInterface>({
        notifyModal: false, 
        modalTitle: "",
        modalText: ""
    })
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        // check if no token then redirect to login page
        // if there is token, use the _id in the storage to fetch userdata afresh
        async function fetchData(){
            try {
                if(storedData.user._id == null) {
                    navigate('/login')
                } 

                await axios.post(`https://aspirebkrestapi.vercel.app/api/user`, {id: storedData.user._id})
                .then(res => {
                    setUserData(res.data.user)
                    setLoading(false) 
                })
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [userData]);

    function logout() {
     localStorage.setItem("user_data", '');
     toast.success("Logout Successful", {position: "top-center"})
     navigate('/login')
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

    axios.put("https://aspirebkrestapi.vercel.app/api/user/deposit", finalData)
    .then(res => {
        if(res.status === 200) {
            toast.success("Deposit Pending Contact Customer Support", { position: 'top-center' })
            setDepositModal(!depositModal)
        }
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
            code: ""
        }
    }

    axios.put("https://aspirebkrestapi.vercel.app/api/user/transfer", finalData)
    .then(res => {
        if(res.status === 200){
            toast.success("Transfer Sent", { position: 'top-center' })
            setTransferModal(!transferModal)
        }
    })
    .catch(err => toast(err.response.data.message, {position: "top-center"}))
}

    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-ring loading-lg text-pink-700"></span>
            </div>
        )
    }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>        
            <div className="max-w-[500px] h-screen drop-shadow-xl mx-auto p-4">
                <div className="flex justify-between items-center p-4">
                <div className="avatar online placeholder">
                    <div className="bg-pink-700 text-neutral-content w-24 rounded-full">
                        <span className="text-3xl">{userData && userData?.name.charAt(0)}</span>
                    </div>
                </div>
                    <div className="flex flex-col gap-8">
                        {/* <i className="fa-sharp fa-solid fa-user fa-xl"></i> */}
                        <button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Notifications", modalText: "No notification found"}))} className="bg-gray-50 text-pink-700 p-2 rounded-full tooltip" data-tip="Notification"> <i className="fa-solid fa-bell fa-xl"></i></button> {/**Notification */}
                        <button className="bg-gray-50 p-2 rounded-full tooltip text-pink-700" data-tip="Logout" onClick={logout}><i className="fa-duotone fa-solid fa-right-from-bracket fa-xl"></i></button>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-2xl font-bold text-black">
                        Welcome, {userData && userData?.name}
                    </h1>
                </div>
                <div className="bg-pink-700 text-primary-content w-full h-20 mx-auto">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-lg font-bold text-white drop-shadow-md">Account Number: {userData && userData?.account}</h2>
                        <h6 className="text-xl font-bold text-white drop-shadow-md">Account Balance: ${userData && userData?.balance}</h6>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-2">
                    <button onClick={() => setTransferModal(true)} className="btn btn-active btn-error text-white"><i className="fa-solid fa-money-bill"></i>Send</button>
                    <button onClick={() => setDepositModal(true)} className="btn btn-active btn-error text-white"><i className="fa-solid fa-piggy-bank"></i>Receive</button>
                    <button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Add Card", modalText: "Coming Soon"}))}  className="btn btn-active btn-error text-white"><i className="fa-solid fa-piggy-bank"></i>Add Card</button>
                    <button onClick={() => navigate('/txn-history')} className="btn btn-active btn-error text-white col-span-2"><i className="fa-solid fa-piggy-bank"></i>Transaction History</button>
                    <button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Loans", modalText: "Not Yet Eligible, Please Contact Support"}))}  className="btn btn-active btn-error text-white"><i className="fa-solid fa-piggy-bank"></i>Loans</button>
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn bg-error text-white m-1"><i className="fa-solid fa-money-bill"></i>Investment</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Stocks", modalText: "Stocks Investment Coming Soon"}))}>Stocks</button></li>
                            <li><button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Crypto", modalText: "Crypto Investment Coming Soon"}))}>Crypto</button></li>
                        </ul>
                    </div>
                    <button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Savings", modalText: "Coming Soon"}))} className="btn btn-active btn-error text-white"><i className="fa-solid fa-piggy-bank"></i>Savings</button>
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn bg-error text-white m-1">Request Card</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Request Debit Card", modalText: "Contact Customer Support To Apply"}))}>Request Debit Card</button></li>
                            <li><button onClick={() => setModal(prev => ({...prev, notifyModal: true, modalTitle: "Request Credit Card", modalText: "Contact Customer Support To Apply"}))}>Request Credit Card</button></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-2">
                    <History history={userData?.history} title="Transactions" userId={userData?._id} />
                </div>
            </div>
            <dialog id="my_modal_1" className={modal.notifyModal ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{modal.modalTitle}</h3>
                    <p className="py-4">{modal.modalText}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => setModal(prev => ({...prev, notifyModal: false}))}>Close</button>
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