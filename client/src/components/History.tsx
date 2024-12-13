import { Link } from "react-router-dom"


const History = ({ history }: {history:any}) => {

  return (
        <div>
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
                            <th>{data._id.slice(15,-4)}</th>
                            <td>{data.date.slice(0,-5)}</td>
                            <td>${data.amount}</td>
                            <td>{data.txnType}</td>
                            <td className={data.status == "completed" ? "text-green-600" : "text-red-600"}>
                                <Link to={`/history/`+data._id} state={data}>{data.status}</Link></td>
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