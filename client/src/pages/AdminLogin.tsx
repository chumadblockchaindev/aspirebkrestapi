import axios from 'axios';
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const[loading, setLoading] = useState(false)
    const[errMsg, setErrMsg] = useState()

  const navigate =  useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(!loading)
    let formData = new FormData(e.target as HTMLFormElement);
    const finalData = Object.fromEntries(formData.entries());

    // set token after successful login
    axios.post("https://aspirebkrestapi.vercel.app/api/admin/login", finalData)
    .then(res => {
      if(res.statusText === 'OK'){
        localStorage.setItem(
          'adminToken',
          JSON.stringify({ adminToken: res.data.token })
        )
        toast.success("Login Sucessful", { position: 'top-center' })
        navigate('/admin', { state: res.data.users })
      }else if(res.status === 401) {
        console.log(res.data.message)
      }
    })
    .catch(err => {
      setErrMsg(err.response.data.message)
      setLoading(false)
    })
  }

  return (
    <div className='flex justify-center'>
        <div className='w-60 sm:w-[300px] mt-10 rounded-lg p-4'>
        <div><h1 className='text-center font-bold text-secondary'>Aspire Admin Login</h1></div>
            <form onSubmit={onSubmit} className='space-y-3 flex flex-col items-center'>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" name="email" required/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" name="password" placeholder="Password" required />
                </label>
                <button className="btn btn-outline btn-secondary">
                    {loading? <div className='flex items-center justify-center gap-1'>Signing in <span className="loading loading-dots loading-sm"></span>
                        </div>: "Sign in"}
                </button>
            </form>
            {errMsg && <div className='bg-green-700 p-2 text-neutral-50 font-semibold'>{errMsg}</div>}
        </div>
    </div>
  )
}

export default AdminLogin