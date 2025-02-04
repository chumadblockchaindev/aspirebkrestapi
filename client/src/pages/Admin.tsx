import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Admin = () => {
  const[data, setData] = useState<{_id?: string, firstName?: string, email?: string, phone?: string, city?: string, balance?: Number}[]>()

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const storedData = JSON.parse(localStorage.getItem("adminToken") as string)
        await axios.post('https://aspirebkrestapi.vercel.app/api/admin/allusers', { adminToken: storedData.adminToken })
        .then(res => {
          const fliterAdmin = res.data.filter((val: any) => val.role != 'admin')
          setData(fliterAdmin)
      })
      } catch (error) {
        console.error(error)
      }
    }

    fetchAllUsers()
  }, [data])

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to="/admin">Users</Link></li>
              <li><Link to="/adminlogin">Logout</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="" className="btn btn-ghost text-xl">Admin Panel</Link>
        </div>
      </div>
      <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Email</th>
              <th>Balance</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            { data &&
              data.map((val, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{val.firstName}</td>
                  <td>{val.email}</td>
                  <td>${val.balance?.toString()}</td>
                  <td><Link className="bg-red-700 text-white font-medium p-3 drop-shadow-md" 
                      to={'/userdetail/'+val._id} state={val}>View</Link></td>
                </tr>
              )) 
            }
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Admin