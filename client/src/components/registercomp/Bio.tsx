import FormWrapper from './FormWrapper'

type UserData = {
    firstName: string,
    midName: string,
    lastName: string,
    surfix: string,
    dob: string,
    tfn: string,
    citizen: string,
    password: string,
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

const Bio = ({ 
    firstName,
    midName,
    lastName,
    surfix,
    dob,
    tfn,
    citizen,
    password,
    updateFields
}: UserFormProps) => {
  return (
    <FormWrapper title='Personal Information'>
        <label className="input input-bordered flex items-center gap-2">
        First Name
        <input required type="text" className="grow" placeholder="Enter First Name" value={firstName} 
        onChange={e => updateFields({firstName: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Middle Name
        <input required type="text" className="grow" placeholder="Enter Middle Name" value={midName} onChange={e => updateFields({midName: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Last Name
        <input required type="text" className="grow" placeholder="Enter Last Name" value={lastName} onChange={e => updateFields({lastName: e.target.value})}/>
        </label>
        <select className="select select-accent select-bordered" value={surfix} onChange={e => updateFields({surfix: e.target.value})}>
            <option selected>Surfix</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Sir</option>
        </select>
        <label className="input input-bordered flex items-center gap-2">
        Date of Birth
        <input required type="text" className="grow" placeholder="Enter Date of Birth" value={dob} onChange={e => updateFields({dob: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        TFN or CRN
        <input required type="text" className="grow" placeholder="TFN or CRN" value={tfn} onChange={e => updateFields({tfn: e.target.value})}/>
        </label>
        <select required className="select select-accent select-bordered" value={citizen} onChange={e => updateFields({citizen: e.target.value})}>
            <option selected>Citizenship</option>
            <option>Australian Citizen</option>
            <option>Permanent Resident</option>
            <option>Non Resident</option>
        </select>
        <label className="input input-bordered flex items-center gap-2">
        Password
        <input required type="password" className="grow" placeholder="Enter Passsword" value={password} onChange={e => updateFields({password: e.target.value})}/>
        </label>
    </FormWrapper>
  )
}

export default Bio