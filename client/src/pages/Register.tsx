import { FormEvent, useState } from 'react'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import Bio from '../components/registercomp/Bio'
import Address from '../components/registercomp/Address'
import BankInfo from '../components/registercomp/BankInfo'
import Employment from '../components/registercomp/Employment'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

type HistoryArray = Array<{}>

type FormData = {
  firstName: string
  midName: string,
  lastName: string,
  surfix: string,
  dob: string,
  tfn: string,
  citizen: string,
  password: string,
  homeAddr: string,
  city: string,
  state: string,
  zip: string,
  email: string,
  phone: string
  empName: string,
  jobTitle: string,
  income: string,
  empStatus: string,
  accType: string,
  debitCard: string,
  pin: string,
  confirmPin: string,
  account: string,
  balance:string,
  history: HistoryArray
}

const INITIAL_DATA: FormData = {
  firstName: "",
  midName: "",
  lastName: "",
  surfix: "",
  dob: "",
  tfn: "",
  citizen: "",
  password: "",
  homeAddr: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  phone: "",
  empName: "",
  jobTitle: "",
  income: "",
  empStatus: "",
  accType: "",
  debitCard: "",
  pin: "",
  confirmPin: "",
  account: "",
  balance: "",
  history: []
}
const Register = () => {
  const[data, setData] = useState(INITIAL_DATA)
  const[loading, setLoading] = useState(false)

  function updateFields(fields: Partial<FormData>) {
    setData(prev =>{
      return {...prev, ...fields}
    })
  }
  const { steps, currentStepIndex, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <Bio {...data} updateFields={updateFields}/>, <Address {...data} updateFields={updateFields} />,
    <Employment {...data} updateFields={updateFields}/>, <BankInfo  {...data} updateFields={updateFields}/>
  ])

  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(!isLastStep) return next()
    console.log(data)
    setLoading(true)
    // call the post api
    try {
      axios.post("http://localhost:5000/api/createaccount", data)
      .then(res => {
        if(res.status === 201){
          toast.success(res.data.message, {position: "top-right"})
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-center text-red-700 drop-shadow-md md:text-4xl text-2xl p-2'>Aspire Bank Registration Form</h1>
      <div className='relative bg-white shadow-lg p-2 rounded-xl md:w-[600px] mx-auto'>
      <form onSubmit={onSubmit}>
        <div className='absolute top-1 right-1 font-medium'>
            {currentStepIndex + 1} / {steps.length}
        </div>
        <div>
          {steps[currentStepIndex]}
        </div>
        <div className='mt-1 flex gap-2 p-2'>
          {!isFirstStep && <button className="btn btn-active btn-ghost" type='button' onClick={back}>Back</button>}
          <button className="btn btn-active btn-error">{isLastStep ? loading ? <div className='flex items-center justify-center gap-1'>Creating Account <span className="loading loading-dots loading-sm"></span>
            </div> : "Submit" : "Next"}</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register