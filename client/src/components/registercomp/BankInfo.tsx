import FormWrapper from './FormWrapper'

type UserData = {
    accType: string,
    debitCard: string,
    pin: string,
    confirmPin: string
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

const BankInfo = (
    {
        accType,
        debitCard,
        pin,
        confirmPin,
        updateFields
    }: UserFormProps
) => {
  return (
    <FormWrapper title='Bank Information'>
          <select required className="select select-accent select-bordered" value={accType} 
          onChange={e => updateFields({accType: e.target.value})}>
            <option selected>Preferred Account Type</option>
            <option>Savings</option>
            <option>Checking</option>
            <option>Business</option>
        </select><br />
        <select required className="select select-accent select-bordered" value={debitCard} 
        onChange={e => updateFields({debitCard: e.target.value})}>
            <option selected>Would you like a Debit card?</option>
            <option>Yes</option>
            <option>No</option>
        </select>
        <label className="input input-bordered flex items-center gap-2">
         Enter Transaction Pin
        <input required type="text" className="grow" placeholder="Enter Transaction Pin" value={pin} 
        onChange={e => updateFields({pin: e.target.value})}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        Confirm Traction Pin
        <input required type="text" className="grow" placeholder="Confirm Traction Pin" value={confirmPin} 
        onChange={e => updateFields({confirmPin: e.target.value})}/>
        </label>
        <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text text-accent">I agree to the Terms & Conditions</span>
            <input required type="checkbox" defaultChecked className="checkbox checkbox-success" />
        </label>
        </div>
    </FormWrapper>
  )
}

export default BankInfo