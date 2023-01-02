import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  componentDidMount() {
    this.getCompleteJobDetails()
  }

  getCompleteJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApiUrl, options)
    const jobDetailsData = await response.json()
    console.log(jobDetailsData)
  }

  render() {
    return (
      <div className="job-details-bg-container">
        <Header />
        <div className="job-details-bottom-container">
          <div className="job-details-container">a</div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
