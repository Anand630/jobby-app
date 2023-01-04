import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SpecificJobDetailsItem from '../SpecificJobDetailsItem'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompanyDetails: {},
    skills: [],
    similarJobDetails: [],
    jobDetailsApiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCompleteJobDetails()
  }

  getFormattedSkillsData = eachSkill => ({
    name: eachSkill.name,
    imageUrl: eachSkill.image_url,
  })

  getFormattedJobDetails = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    // lifeAtCompany: {
    //   description: jobDetails.life_at_company.description,
    //   imageUrl: jobDetails.life_at_company.image_url,
    // },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    // skills: jobDetails.skills.map(eachSkill =>
    //   this.getFormattedSkillsData(eachSkill),
    // ),
    title: jobDetails.title,
  })

  getFormattedSimilarJob = eachJob => ({
    companyLogoUrl: eachJob.company_logo_url,
    employmentType: eachJob.employment_type,
    id: eachJob.id,
    jobDescription: eachJob.job_description,
    location: eachJob.location,
    rating: eachJob.rating,
    title: eachJob.title,
  })

  getCompleteJobDetails = async () => {
    this.setState({jobDetailsApiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
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
    // console.log(jobDetailsData)
    if (response.ok) {
      const formattedJobDetails = this.getFormattedJobDetails(
        jobDetailsData.job_details,
      )

      const formattedLifeAtCompanyDetails = {
        description: jobDetailsData.job_details.life_at_company.description,
        imageUrl: jobDetailsData.job_details.life_at_company.image_url,
      }

      const formattedSkillsData = jobDetailsData.job_details.skills.map(
        eachSkill => this.getFormattedSkillsData(eachSkill),
      )

      const formattedSimilarJobs = jobDetailsData.similar_jobs.map(eachJob =>
        this.getFormattedSimilarJob(eachJob),
      )

      // console.log(formattedJobDetails)
      // console.log(formattedSimilarJobs)

      this.setState({
        jobDetails: {...formattedJobDetails},
        skills: [...formattedSkillsData],
        lifeAtCompanyDetails: {...formattedLifeAtCompanyDetails},
        similarJobDetails: [...formattedSimilarJobs],
        jobDetailsApiStatus: apiConstants.success,
      })
    } else if (!response.ok) {
      this.setState({jobDetailsApiStatus: apiConstants.failure})
    }
  }

  // testid="loader"
  getLoadingView = () => (
    <div className="job-item-details-loader-container">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  getJobItemDetailsView = () => {
    const {
      jobDetails,
      skills,
      lifeAtCompanyDetails,
      similarJobDetails,
    } = this.state
    return (
      <>
        <SpecificJobDetailsItem
          jobDetails={jobDetails}
          skills={skills}
          lifeAtCompanyDetails={lifeAtCompanyDetails}
        />
        <h3 className="similar-jobs-heading">Similar Jobs</h3>
        <ul className="similar-jobs-list-container">
          {similarJobDetails.map(eachJob => (
            <SimilarJobItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  refetchJobItemDetails = () => {
    this.getCompleteJobDetails()
  }

  getFailureView = () => (
    <div className="job-item-details-failure-view-container">
      <img
        className="job-item-details-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-item-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.refetchJobItemDetails}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  getResultantDisplay = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiConstants.success:
        return this.getJobItemDetailsView()
      case apiConstants.inProgress:
        return this.getLoadingView()
      case apiConstants.failure:
        return this.getFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-bg-container">
        <Header />
        <div className="job-details-bottom-container">
          {this.getResultantDisplay()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
