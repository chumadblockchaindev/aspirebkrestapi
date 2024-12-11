import styles from '../styles/Contact.module.css'
import AboutImg from '../assets/white-crossed-male-room-laptop.jpg'

const Contact = () => {
  return (
    <div className={styles.contact}>
      <nav className={styles.contact_nav}>
        <div className={styles.brand}>
            <h1 style={{ margin: 0 }}>Aspire Bank</h1>
        </div>
        <div className={styles.menu_btn} id="menu-btn">
            <i className="fas fa-bars"></i>
        </div>
        <ul className={styles.mobile_menu} id="mobile-menu">
            <li><a href="index.html">Home</a></li>
        </ul>
    </nav>

    <div className={styles.about_header}>
        <h1>About Aspire Bank</h1>
    </div>

    <section className={styles.contact_section}>
        <div className={styles.image_container}>
            <img src={AboutImg} alt="Our Team" className="team-photo" />
        </div>

        <h2>Welcome to Aspire Bank</h2>
        <p>At Aspire Bank, we turn your financial aspirations into reality. Founded with a vision of providing
            exceptional banking services, we are committed to meeting the needs of our clients with integrity,
            transparency, and innovation. Moreso we have a good team of workers serving our customers both virtually
            (AdelaideSA Australia) and Online.</p>

        <h2>Our Mission</h2>
        <p className={styles.mission}>To empower individuals and businesses by offering tailored financial solutions that foster
            growth and stability.</p>

        <h2>Who We Are</h2>
        <p>With years of experience in the banking sector, our team is dedicated to understanding your unique needs. We
            strive to develop solutions that not only meet your financial objectives but also exceed your expectations.
            Our state-of-the-art technology ensures that your banking experience is seamless and secure, giving you
            peace of mind.</p>

        <h2>Our Services</h2>
        <p>From personal and business accounts to loans and investment opportunities, our range of services is designed
            to cater to all aspects of your financial life. Whether you are saving for a home, planning for retirement,
            or needing personal advice, Aspire Bank is here for you.</p>

        <h2>Join Us</h2>
        <p>Become a part of the Aspire Bank community, where your aspirations are valued. Together, we can create a
            brighter financial future.</p>
        <a href="getstarted.html" className="cta-button">Get Started Today</a>
    </section>

    <footer className={styles.footer_style}>
        <p>&copy; 2024 Aspire Bank. All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Contact