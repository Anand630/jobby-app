import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getFormattedData = profileDetails => ({
    name: profileDetails.name,
    profileImageUrl: profileDetails.profile_image_url,
    shortBio: profileDetails.short_bio,
  })

  getProfileDetails = async () => {
    const profileDetailsUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    console.log(typeof jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileDetailsUrl, options)
    const profileData = await response.json()
    console.log(profileData)
    const formattedData = this.getFormattedData(profileData.profile_details)
    this.setState({profileDetails: formattedData})
  }

  render() {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-page-bottom-container">
          <div className="profile-and-filters-container">
            <div className="profile-container">
              <img className="profile-pic" alt={name} src={profileImageUrl} />
              <h1 className="profile-name">{name}</h1>
              <p className="job-role">{shortBio}</p>
            </div>
            <hr />
            <p className="filter-type">Type of Employment</p>
            {/*   employment types    */}
            <ul className="employment-types-list-container">
              {employmentTypesList.map(eachType => (
                <li
                  className="checkbox-input-and-label-container"
                  key={eachType.employmentTypeId}
                >
                  <input
                    className="emp-type-checkbox"
                    id={eachType.employmentTypeId}
                    type="checkbox"
                  />
                  <label
                    className="emp-type-label"
                    htmlFor={eachType.employmentTypeId}
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <p className="filter-type">Salary Range</p>
            {/*   salary ranges   */}
            <ul className="salary-ranges-list-container">
              {salaryRangesList.map(eachSalRange => (
                <li
                  className="radio-input-and-label-container"
                  key={eachSalRange.salaryRangeId}
                >
                  <input
                    className="salary-range-radio-input"
                    id={eachSalRange.salaryRangeId}
                    type="radio"
                  />
                  <label
                    className="salary-range-label"
                    htmlFor={eachSalRange.salaryRangeId}
                  >
                    {eachSalRange.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="all-job-cards-container">
            <div className="search-input-and-icon-container">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button className="search-icon-button" type="button">
                  <BsSearch size={18} color="#ffffff" className="search-icon" />
                </button>
              </div>
            </div>
            {/* JobDetailsItems to be added  */}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
