import FormWrapper from './FormWrapper'

type UserData = {
    empName: string,
    jobTitle: string,
    income: string,
    empStatus: string,
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

const Employment = ({
    empName,
    jobTitle,
    income,
    empStatus,
    updateFields
}: UserFormProps) => {
  return (
    <FormWrapper title='Employment Info'>
         <label className="input input-bordered flex items-center gap-2">
         Employer Name
        <input type="text" className="grow" placeholder="Enter Employer Name" value={empName}  
        onChange={e => updateFields({empName: e.target.value})} required/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Job Title
        <input type="text" className="grow" placeholder="Enter Job Title" value={jobTitle} 
        onChange={e => updateFields({jobTitle: e.target.value})} required/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Annual Income
        <input type="text" className="grow" placeholder="Enter Annual Income" value={income} 
         onChange={e => updateFields({income: e.target.value})} required/>
        </label>
        <select required className="select select-accent select-bordered" value={empStatus} onChange={e => updateFields({empStatus: e.target.value})}>
            <option selected>Employment Status</option>
            <option>Employed</option>
            <option>UnEmployed</option>
            <option>SelfEmployed</option>
            <option>Student</option>
            <option>Retired</option>
        </select>
    </FormWrapper>
  )
}

export default Employment