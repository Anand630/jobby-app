import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }

  const {history} = props

  const displayJobsPage = () => {
    history.push('/jobs')
  }

  return (
    <div className="home-page-container">
      <Header />
      <div className="home-page-bottom-container">
        <h1 className="home-page-main-heading">
          Find The Job That Fits Your Life
        </h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          onClick={displayJobsPage}
          type="button"
          className="find-jobs-button"
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
