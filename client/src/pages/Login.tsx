import { FormEvent, useState } from 'react'
import styles from '../styles/Login.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    let formData = new FormData(event.target as HTMLFormElement);
    const finalData = Object.fromEntries(formData.entries());
    console.log(finalData)

    axios.post("http://localhost:5000/api/login", finalData)
    .then(res => {
      if(res.data.message === "success"){
        localStorage.setItem(
          'user_data',
          JSON.stringify({ userToken: res.data.token, user: res.data.user})
        )
        toast.success("Login Sucessful", { position: 'top-center' })
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    })
    .catch(err => console.error(err))
  } 

  return (
    <div className={styles.login_body}>
      <div className={styles.login_container}>
        <form onSubmit={onSubmit}>
            <h1>Aspire Bank</h1>
            <i className="fas fa-university"></i>
            <h2>Login</h2>

            <div className={styles.input_group}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" required placeholder="Enter your email" id='email' autoFocus />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id='password' required placeholder="Enter your password" />
            </div>

            <button className={styles.login_button} type="submit">
              {loading? <div className='flex items-center justify-center gap-1'>Logging in <span className="loading loading-dots loading-sm"></span>
                </div>: "Login"}
            </button>
            <p>Don't have an account? <a href="register.html">Register here</a></p>
        </form>
    </div>
    </div>
  )
}

export default Login