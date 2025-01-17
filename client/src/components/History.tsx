import { Link } from "react-router-dom"


const History = ({ history, title, userId }: {history:any, title: string, userId: string | undefined}) => {

  return (
        <div>
                            <h1 className="text-center text-2xl text-pink-700 font-bold mb-0">{title}</h1>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Txn. Id</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Txn. Type</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        { history[0].map((data : any, index: number) => (
                        <tr key={index}>
                            <th className="text-black">{data._id.slice(15,-4)}</th>
                            <td className="font-bold text-black">{data.date.slice(0,-5)}</td>
                            <td className="font-bold">${data.amount}</td>
                            <td className="text-error font-bold">{data.txnType}</td>
                            <td className={data.status == "completed" ? "text-green-600 font-bold" : "text-error font-bold"}>
                                <Link to={`/history/`+data._id} state={{...data, userId}}>{data.status}</Link></td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    {history[0].length == 0 && <div className="text-center">
                        <h3 className="mt-4">No transaction recorded</h3>
                        </div>}
                </div>    
    </div>
  )
}

export default History