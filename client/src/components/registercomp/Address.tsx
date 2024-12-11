import FormWrapper from './FormWrapper'

type UserData = {
    homeAddr: string,
    city: string,
    state: string,
    zip: string,
    email: string,
    phone: string,
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

const Address = ({
    homeAddr,
    city,
    state,
    zip,
    email,
    phone,
    updateFields
}: UserFormProps) => {
  return (
    <FormWrapper title='Contact Info'>
         <label className="input input-bordered flex items-center gap-2">
        Home
        <input required type="text" className="grow" placeholder="Enter Home Address" value={homeAddr} 
        onChange={e => updateFields({homeAddr: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        City
        <input required type="text" className="grow" placeholder="Enter City" value={city} onChange={e => updateFields({city: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        State
        <input required type="text" className="grow" placeholder="Enter State" value={state} onChange={e => updateFields({state: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Zip
        <input required type="text" className="grow" placeholder="Enter Zip Code" value={zip} onChange={e => updateFields({zip: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Favourite Email
        <input required type="text" className="grow" placeholder="fname@gmail.com" value={email} onChange={e => updateFields({email: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Phone Number
        <input required type="text" className="grow" placeholder="Enter Phone Number" value={phone} onChange={e => updateFields({phone: e.target.value})}/>
        </label>
    </FormWrapper>
  )
}

export default Address