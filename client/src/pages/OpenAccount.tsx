import styles from '../styles/OpenAccount.module.css'

const OpenAccount = () => {
  return (
    <div className={styles.openacc_body}>
        <div className={styles.openacc_container}>
          <h2 className={styles.openacc_heading}>Here's what you’ll need:</h2>
          <div className={styles.item}><i className="fas fa-money-check-alt"></i> Opening Deposit</div>
          <p>Fund your new account with an existing bank account or an external account.</p>

          <div className={styles.item}><i className="fas fa-id-card"></i> Current ID</div>
          <p>We'll need to make sure you're you, so get your driver's license, passport, or other ID ready.</p>

          <div className={styles.item}><i className="fas fa-clock"></i> About 5 Minutes</div>
          <p>This is about how long it usually takes to open a new account.</p>

          <div className={styles.checklist}>
              <p>Applying online is right for you if you're:</p>
              <div className={styles.checklist_item}><i className="fas fa-check-circle"></i> 18 years old or older</div>
              <div className={styles.checklist_item}><i className="fas fa-check-circle"></i> A U.S. citizen</div>
              <div className={styles.checklist_item}><i className="fas fa-check-circle"></i> A resident of an eligible state</div>
              <div className={styles.checklist_item}><i className="fas fa-check-circle"></i> Opening an individual account</div>
          </div>

          {/* <!-- Redirect button to registration form page --> */}
          <a href="register.html" className={styles.cta_button}>Let's Go!</a>
      </div>

    </div>
  )
}

export default OpenAccount