import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { HistoryInterface } from '../pages/Dashboard'
import axios from 'axios'
import toast from 'react-hot-toast'

const HistoryDetail = () => {
    // const {id} = useParams()
    const { state } = useLocation()
    const[user, setUser] = useState<HistoryInterface>()
    const[showDetail, setShowDetail] = useState(false)
    const[errMsg, setErrMsg] = useState()
    const params = useParams()

    useEffect(() => {
        if(state){
            setUser(state)
        }
    }, [location])

    async function handleSubmit(event: FormEvent) {
            event.preventDefault()
            let formData = new FormData(event.target as HTMLFormElement);
            const finalData = Object.fromEntries(formData.entries());

            await axios.put(`https://aspirebkrestapi.vercel.app/api/retry/transfer/${params.id}`, finalData)
            .then(res => {
                if(res.statusText === 'OK') {
                    setShowDetail(!showDetail)
                    toast("Transfer Successful", { position: "top-center" })
                }
            })
            .catch(err => setErrMsg(err.response.data.message))
    }

  return (
    <div>
        <h3 className='uppercase bold text-xl p-4'>{user?.txnType} Details</h3>
        <div className='p-4'>
            <div className="label">
                <span className="label-text text-bold">id:</span>
                <input type="text" value={user?._id} className="input input-ghost w-full max-w-xs" />
            </div>
            <div className="label">
                <span className="label-text text-bold">date:</span>
                <input type="text" value={user?.date} className="input input-ghost w-full max-w-xs" />
            </div>
            <div className="label">
                <span className="label-text text-bold">status:</span>
                <input type="text" className={user?.status == "completed" ? "text-green-600 input input-ghost w-full max-w-xs" : "text-red-600 input input-ghost w-full max-w-xs"} value={user?.status} />
            </div>
            <div className="label">
                <span className="label-text text-bold">Txn. Type:</span>
                <input type="text" value={user?.txnType} className="input input-ghost w-full max-w-xs" />
            </div>
            <div className="label">
                <span className="label-text text-bold">Amount:</span>
                <input type="text" value={user?.amount} className="input input-ghost w-full max-w-xs" />
            </div>
            {user?.txnType == 'transfer' && user?.status == "pending" && <button className="btn btn-info" onClick={() => setShowDetail(!showDetail)}>Retry Transfer</button>}
        </div>

        
            <dialog id="my_modal_1" className={showDetail ? 'modal modal-bottom sm:modal-middle modal-open' : 'modal modal-bottom sm:modal-middle'}>
                    <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setShowDetail(!showDetail)}>✕</button>
                    </form>
                        <h3 className="font-bold text-lg pl-5">Enter Transaction Code</h3>
                        <div className="modal-action mt-2">
                            <form method="dialog" onSubmit={(event) => handleSubmit(event)}>
                            <input type="text" name='code' placeholder="Enter Code" className="input input-bordered w-full max-w-xs mb-4" />

                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn" >Submit</button>
                            </form>
                            {errMsg && <div className='bg-green-700 p-2 text-neutral-50 font-semibold'>{errMsg}</div>}
                        </div>
                    </div>
            </dialog>
    </div>
  )
}

export default HistoryDetail