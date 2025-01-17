import { Link } from 'react-router-dom'
import HeroImg from '../assets/finance-4858797_1280.jpg'
import { useEffect, useState } from 'react'
// import styles from '../styles/Home.css'

const Home = () => {
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    })

    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-ring loading-lg text-pink-700"></span>
            </div>
        )
    }

  return (
    <section className='bg-gray-50 text-red-600'>
       {/* Navbar */}
      <header className="fixed w-full z-50 transition duration-300 bg-red-600">
          <nav className="flex items-center justify-between px-6 py-4">
              <div className="text-lg md:text-2xl font-bold text-white">Aspire Bank</div>
              <ul className="hidden md:flex space-x-6">
                  <li><Link to="getstarted" className="text-white hover:text-gray-200">Open Account</Link></li>
                  <li><Link to="#benefits" className="text-white hover:text-gray-200">Benefits</Link></li>
                  <li><Link to="#faq" className="text-white hover:text-gray-200">FAQ</Link></li>
                  <li><Link to="aboutus" target="_blank" className="text-white hover:text-gray-200">Contact Us</Link></li>
              </ul>
              <Link to="/login">
              <button
                  className="hidden md:block text-white border-2 px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition">Login</button>
              </Link>
              <button id="menu-btn" className="md:hidden text-white text-2xl focus:outline-none">
                  <i className="fas fa-bars"></i>
              </button>
          </nav>
          <ul id="mobile-menu" className="md:hidden bg-gray-800 text-white text-center hidden space-y-4 py-4">
              <li><Link to="register" className="hover:text-gray-300">Open Account</Link></li>
              <li><Link to="#benefits" className="hover:text-gray-300">Benefits</Link></li>
              <li><Link to="#faq" className="hover:text-gray-300">FAQ</Link></li>
              <li><Link to="#contact" className="hover:text-gray-300">Contact Us</Link></li>
          </ul>
      </header>

      {/* Hero Section */}
      <section id="hero" className="h-screen bg-cover bg-center text-center text-white" 
        style={{ backgroundImage: `url(${HeroImg})` }}>
          <div className="flex items-center justify-center h-full backdrop-blur-md bg-black bg-opacity-30 px-4">
              <div className="animate__animated animate__fadeIn">
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Earn $300 with Aspire Smart Checking</h1>
                  <p className="text-md md:text-xl mb-6">Open an account today and enjoy exclusive benefits!</p>
                  <Link to="/login">
                    <button className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</button>
                  </Link>
              </div>
          </div>
      </section>

      {/* How to Qualify Section */}
      <section id="how-to-qualify" className="py-10 md:py-20 bg-gray-50">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 md:mb-12 animate__animated animate__fadeInUp">How to
              Qualify</h2>
          <div
              className="container mx-auto flex flex-col md:flex-row justify-around space-y-6 md:space-y-0 md:space-x-4 px-4">
              <div
                  className="qualify-step p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-gray-50 animate__animated animate__fadeInLeft">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">1. Open Your Account</h3>
                  <p>Open online by December 20, 2024.</p>
              </div>
              <div
                  className="qualify-step p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-gray-50 animate__animated animate__fadeInUp">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">2. Make Your Deposits</h3>
                  <p>Deposit at least $1,000 within 60 days.</p>
              </div>
              <div
                  className="qualify-step p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-gray-50 animate__animated animate__fadeInRight">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">3. Receive Your $300</h3>
                  <p>Your bonus will be credited within 60 days.</p>
              </div>
          </div>
      </section>

      {/* Account Overview Section */}
      <section id="account-overview" className="py-10 md:py-20 bg-gray-50 px-4">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 md:mb-12 animate__animated animate__fadeIn">Account
              Overview</h2>
          <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
              <div className="flex justify-between items-center py-2 border-b text-sm md:text-lg">
                  <span className="font-semibold text-gray-800">Monthly Maintenance Fee</span>
                  <span className="font-semibold text-red-600">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b text-sm md:text-lg">
                  <span className="font-semibold text-gray-800">Minimum Balance Requirement</span>
                  <span className="font-semibold text-red-600">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b text-sm md:text-lg">
                  <span className="font-semibold text-gray-800">ATM Access</span>
                  <span className="font-semibold text-red-600">Free</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b text-sm md:text-lg">
                  <span className="font-semibold text-gray-800">Online Banking</span>
                  <span className="font-semibold text-red-600">Available 24/7</span>
              </div>
          </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-10 md:py-20 bg-white animate__animated animate__fadeInUp">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 md:mb-12">See the Benefits of Banking with Aspire
              Bank</h2>
          <div className="container mx-auto flex flex-col md:flex-row justify-around">
              <div
                  className="benefit-item flex flex-col items-center bg-red-100 border border-red-300 p-6 rounded-lg shadow-lg m-4 w-full md:w-1/3 transition-all duration-300 hover:shadow-2xl">
                  <i className="fas fa-piggy-bank text-4xl text-red-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Save Smartly</h3>
                  <p className="text-gray-600 text-center">Earn high interest rates and manage your savings efficiently.</p>
              </div>
              <div
                  className="benefit-item flex flex-col items-center bg-red-100 border border-red-300 p-6 rounded-lg shadow-lg m-4 w-full md:w-1/3 transition-all duration-300 hover:shadow-2xl">
                  <i className="fas fa-hand-holding-usd text-4xl text-green-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Get Rewards</h3>
                  <p className="text-gray-600 text-center">Receive bonuses and cashback rewards with Aspire Bank.</p>
              </div>
              <div
                  className="benefit-item flex flex-col items-center bg-red-100 border border-red-300 p-6 rounded-lg shadow-lg m-4 w-full md:w-1/3 transition-all duration-300 hover:shadow-2xl">
                  <i className="fas fa-mobile-alt text-4xl text-purple-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Mobile Banking</h3>
                  <p className="text-gray-600 text-center">Manage your accounts and transactions on the go.</p>
              </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-10 md:py-20 bg-gray-100 px-4">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 md:mb-12 animate__animated animate__fadeIn">
              Frequently Asked Questions</h2>
          <div className="container mx-auto">
              <div className="faq-item mb-6">
                  <button
                      className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-red-50 transition duration-300">
                      <span className="text-md md:text-lg font-semibold">What information is needed to apply?</span>
                      <svg className="w-4 h-4 md:w-6 md:h-6 transition" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                  </button>
                  <div className="answer mt-2 hidden p-4 text-gray-700 bg-white rounded-lg shadow-inner">You'll need your
                      personal information and TFN.</div>
              </div>
              <div className="faq-item mb-6">
                  <button
                      className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-red-50 transition duration-300">
                      <span className="text-md md:text-lg font-semibold">How long does the application process take?</span>
                      <svg className="w-4 h-4 md:w-6 md:h-6 transition" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                  </button>
                  <div className="answer mt-2 hidden p-4 text-gray-700 bg-white rounded-lg shadow-inner">The application
                      typically takes 5-10 minutes.</div>
              </div>
              <div className="faq-item mb-6">
                  <button
                      className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-red-50 transition duration-300">
                      <span className="text-md md:text-lg font-semibold">Is there an age requirement to open an
                          account?</span>
                      <svg className="w-4 h-4 md:w-6 md:h-6 transition" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                  </button>
                  <div className="answer mt-2 hidden p-4 text-gray-700 bg-white rounded-lg shadow-inner">You must be at least
                      18 years old or have a guardian to apply.</div>
              </div>
              <div className="faq-item mb-6">
                  <button
                      className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-red-50 transition duration-300">
                      <span className="text-md md:text-lg font-semibold">Can I have multiple accounts?</span>
                      <svg className="w-4 h-4 md:w-6 md:h-6 transition" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                  </button>
                  <div className="answer mt-2 hidden p-4 text-gray-700 bg-white rounded-lg shadow-inner">Yes, you can have
                      multiple accounts with Aspire Bank.</div>
              </div>
          </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-red-600 text-white py-8">
          <div className="container mx-auto text-center">
              <div className="flex justify-center space-x-4 mb-4">
                  <Link to="aboutus" target="_blank" className="text-gray-300 hover:text-white">About Us</Link>
                  {/* <Link to="#services" className="text-gray-300 hover:text-white">Services</Link> */}
                  <Link to="#contact" className="text-gray-300 hover:text-white">Contact</Link>
                  <Link to="Aspire Policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </div>
              <div className="flex justify-center space-x-6 mb-4">
                  <Link to="https://facebook.com" target="_blank" className="text-gray-300 hover:text-white"><i
                          className="fab fa-facebook-f"></i></Link>
                  <Link to="https://twitter.com" target="_blank" className="text-gray-300 hover:text-white"><i
                          className="fab fa-twitter"></i></Link>
                  <Link to="https://instagram.com" target="_blank" className="text-gray-300 hover:text-white"><i
                          className="fab fa-instagram"></i></Link>
                  <Link to="https://linkedin.com" target="_blank" className="text-gray-300 hover:text-white"><i
                          className="fab fa-linkedin-in"></i></Link>
              </div>
              <p className="text-gray-400">&copy; 2024 Aspire Bank. All rights reserved.</p>
              <p>Location: Adelaide, SA, Australia</p>
          </div>
      </footer>
    </section>
  )
}

export default Home