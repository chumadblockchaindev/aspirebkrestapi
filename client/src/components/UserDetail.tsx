import axios from "axios"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const UserDetail = () => {
    const[compState, setCompState] = useState({ 
        code: '', codeModal: '', amount: '', 
        balanceModal: '', editModal: ''
    })
    const params = useParams()
    const navigate = useNavigate()
    const { state } = useLocation()

    async function deleteUser() {
        const { id } = params

        // make axios call to the delete api and go back to admin home
        await axios.delete(`https://aspirebkrestapi.vercel.app/api/user/delete/${id}`)
        .then(res => {
        if(res.status === 200){
            toast.success(res.data.message, { position: 'top-center' })
        }
        })
        .catch(err => console.error(err))
    }

    async function generateCode(_id: string) {
        const { id } = params
        
        // make axios call to the generate code api
        await axios.post(`https://aspirebkrestapi.vercel.app/api/user/code/${id}`,{ historyid: _id })
        .then(res => {
        if(res.status === 200){
            // set the code and open the modal
            setCompState(prev => ({...prev, codeModal: 'modal-open', code: res.data.txnCode }))
        }
        })
        .catch(err => console.error(err))
    }

    async function updateBalance(event: FormEvent) {
        event.preventDefault()        
        const { id } = params

        // make axios call to the update balance api
        await axios.put(`https://aspirebkrestapi.vercel.app/api/update/balance/${id}`, { amount: Number(compState.amount) })
        .then(res => {
            console.log(res.data)
            if(res.data.message === "success"){
                toast.success("Balance Updated", { position: 'top-center' })
                setCompState(prev => ({...prev, editModal: ''}))
                navigate('/admin')
            }
        })
        .catch(err => console.error(err))
    }

  return (
    <div>
        <div><h1 className="text-red-700 text-center pt-3">User Detail</h1></div>
        <div className="p-4">
        <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" value={state.firstName} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="text" value={state.email} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            Balance
            <input type="text" value={state.balance.toString()} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            Debit Card
            <input type="text" value={state.debitCard} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            DOB
            <input type="text" value={state.dob} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            INCOME
            <input type="text" value={state.income} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
        </label>
        </div>
        <div className="flex justify-around mt-2">
            {state.role === 'user' && <button onClick={() => setCompState(prev => ({...prev, editModal: 'modal-open', amount: state.balance.toString()}))} className="btn btn-outline btn-warning">Edit Balance</button>}
           {state.role === 'user' && <button onClick={deleteUser} className="btn btn-outline btn-error">Delete User</button>}
        </div>
        <div>
            {state.role === 'user' ? <h2 className="text-center">History</h2>: <h2 className="text-center uppercase text-green-700">You are Admin</h2>}
            {
                <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Txn. Type</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                { state.history.map((data : any, index: number) => (
                <tr key={index}>
                    <td>{data.date.slice(0,-5)}</td>
                    <td>${data.amount}</td>
                    <td>{data.txnType}</td>
                    <td>{data.txnType === 'transfer' && 
                        <button onClick={() => generateCode(data._id)} className="btn btn-active btn-xs btn-secondary">
                            Generate Code</button>
                    }</td>
                </tr>
                ))}
                </tbody>
            </table>
            }
        </div>

        <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${compState.codeModal}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Transfer Code!</h3>
                <p className="py-4 text-xl text-center">{compState.code}</p>
                <div className="modal-action">
                <form method="dialog">
                    <button onClick={() => setCompState(prev => ({...prev, codeModal: ''}))} className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>

        <dialog id="my_modal_3" className={`modal ${compState.editModal}`}>
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => setCompState(prev => ({...prev, editModal: ''}))} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Edit Amount:</h3>
                <form method="dialog" onSubmit={(event) => updateBalance(event)} className="space-y-2">
                    <input value={compState.amount} onChange={(e) => setCompState(prev => ({...prev, amount: e.target.value}))} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <button className="btn">Submit</button>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default UserDetail