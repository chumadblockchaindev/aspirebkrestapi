import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HistoryInterface } from '../pages/Dashboard'

const HistoryDetail = () => {
    // const {id} = useParams()
    const { state } = useLocation()
    const[user, setUser] = useState<HistoryInterface>()
    const[showDetail, setShowDetail] = useState(false)

    useEffect(() => {
        if(state){
            setUser(state)
        }
    }, [location])
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
                            <form method="dialog">
                            <input type="text" placeholder="Enter Code" className="input input-bordered w-full max-w-xs mb-4" />

                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn" type='button'>Submit</button>
                            </form>
                        </div>
                    </div>
            </dialog>
    </div>
  )
}

export default HistoryDetail