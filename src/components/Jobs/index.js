import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'

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

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobsFound: 'NO_JOBS_FOUND',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    jobs: [],
    profileApi: apiConstants.initial,
    jobsApi: apiConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getAllJobsDetails()
  }

  getFormattedJobData = eachJob => ({
    companyLogoUrl: eachJob.company_logo_url,
    employmentType: eachJob.employment_type,
    id: eachJob.id,
    jobDescription: eachJob.job_description,
    location: eachJob.location,
    packagePerAnnum: eachJob.package_per_annum,
    rating: eachJob.rating,
    title: eachJob.title,
  })

  getAllJobsDetails = async () => {
    this.setState({jobsApi: apiConstants.inProgress})
    const {employmentType, minimumPackage, searchInput} = this.state
    const empTypeString = employmentType.join(',')
    console.log(`emp string ${empTypeString}`)
    const jobsDetailsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeString}&minimum_package=${minimumPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsDetailsApiUrl, options)
    const jobsData = await response.json()
    console.log(jobsData)
    if (response.ok && jobsData.jobs.length > 0) {
      const formattedJobData = jobsData.jobs.map(eachJob =>
        this.getFormattedJobData(eachJob),
      )
      console.log(formattedJobData)
      this.setState({jobs: formattedJobData, jobsApi: apiConstants.success})
    } else if (response.ok && jobsData.jobs.length === 0) {
      this.setState({jobsApi: apiConstants.noJobsFound})
    } else if (!response.ok) {
      this.setState({jobsApi: apiConstants.failure})
    }
  }

  getFormattedData = profileDetails => ({
    name: profileDetails.name,
    profileImageUrl: profileDetails.profile_image_url,
    shortBio: profileDetails.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({profileApi: apiConstants.inProgress})
    const profileDetailsApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileDetailsApiUrl, options)
    const profileData = await response.json()
    if (response.ok) {
      console.log(profileData)
      const formattedData = this.getFormattedData(profileData.profile_details)
      this.setState({
        profileDetails: formattedData,
        profileApi: apiConstants.success,
      })
    } else if (!response.ok) {
      this.setState({profileApi: apiConstants.failure})
    }
  }

  storeInputText = e => {
    this.setState({searchInput: e.target.value})
  }

  storeEmploymentType = e => {
    const {employmentType} = this.state
    console.log(e.target.checked)
    if (!employmentType.includes(e.target.value) && e.target.checked) {
      this.setState({employmentType: [...employmentType, e.target.value]})
    } else if (!e.target.checked) {
      const targetIndex = employmentType.findIndex(
        eachItem => eachItem === e.target.value,
      )
      console.log(`target index: ${targetIndex}`)
      if (targetIndex >= 0) {
        const employmentTypeCopy = [...employmentType]
        // const updatedEmploymentTypeIds = [
        //   ...employmentTypeCopy.splice(targetIndex, 1),
        // ]
        // console.log(updatedEmploymentTypeIds)
        employmentTypeCopy.splice(targetIndex, 1)
        const updatedEmploymentTypeIds = [...employmentTypeCopy]

        this.setState({
          employmentType: updatedEmploymentTypeIds,
        })
      }
    }
  }

  storeSelectedRadioValue = e => {
    this.setState({minimumPackage: e.target.value})
  }

  searchData = e => {
    e.preventDefault()
    this.getAllJobsDetails()
  }

  profileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img className="profile-pic" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="job-role">{shortBio}</p>
      </div>
    )
  }

  // testid="loader"

  profileLoadingView = () => (
    <div className="profile-loader-container loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  refetchProfileData = () => {
    this.getProfileDetails()
  }

  profileFailureView = () => (
    <div className="profile-failure-container">
      <button
        onClick={this.refetchProfileData}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  displayProfileApiResult = () => {
    const {profileApi} = this.state
    switch (profileApi) {
      case apiConstants.inProgress:
        return this.profileLoadingView()
      case apiConstants.success:
        return this.profileSuccessView()
      case apiConstants.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }

  jobsLoadingView = () => (
    <div
      className="jobs-loading-view-container loader-container "
      testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsSuccessView = () => {
    const {jobs} = this.state
    return (
      <ul className="all-job-items-list-container">
        {jobs.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  refetchJobsData = () => {
    this.getAllJobsDetails()
  }

  jobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.refetchJobsData}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  noJobsFoundView = () => (
    <div className="no-jobs-view-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  getJobApiResults = () => {
    const {jobsApi} = this.state
    switch (jobsApi) {
      case apiConstants.inProgress:
        return this.jobsLoadingView()
      case apiConstants.success:
        return this.jobsSuccessView()
      case apiConstants.failure:
        return this.jobsFailureView()
      case apiConstants.noJobsFound:
        return this.noJobsFoundView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    // const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-page-bottom-container">
          <div className="profile-and-filters-container">
            <form className="search-input-and-icon-container-mobile">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.storeInputText}
                value={searchInput}
              />
              <div className="search-icon-container">
                <button
                  className="search-icon-button"
                  type="submit"
                  onClick={this.searchData}
                  testid="searchButton"
                >
                  <BsSearch size={18} color="#ffffff" className="search-icon" />
                </button>
              </div>
            </form>
            {this.displayProfileApiResult()}
            <hr />
            <h1 className="filter-type">Type of Employment</h1>
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
                    value={eachType.employmentTypeId}
                    onClick={this.storeEmploymentType}
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
            <h1 className="filter-type">Salary Range</h1>
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
                    name="salary-ranges"
                    value={eachSalRange.salaryRangeId}
                    onChange={this.storeSelectedRadioValue}
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
            <form className="search-input-and-icon-container-desktop">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.storeInputText}
                value={searchInput}
              />
              <div className="search-icon-container">
                <button
                  onClick={this.searchData}
                  className="search-icon-button"
                  type="submit"
                  testid="searchButton"
                >
                  <BsSearch size={18} color="#ffffff" className="search-icon" />
                </button>
              </div>
            </form>
            {/* JobDetailsItems   */}
            {this.getJobApiResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
