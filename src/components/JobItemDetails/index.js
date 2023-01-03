import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SpecificJobDetailsItem from '../SpecificJobDetailsItem'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompanyDetails: {},
    skills: [],
    similarJobDetails: [],
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

    console.log(formattedJobDetails)
    console.log(formattedSimilarJobs)

    this.setState({
      jobDetails: {...formattedJobDetails},
      skills: [...formattedSkillsData],
      lifeAtCompanyDetails: {...formattedLifeAtCompanyDetails},
      similarJobDetails: [...formattedSimilarJobs],
    })
  }

  render() {
    const {
      jobDetails,
      skills,
      lifeAtCompanyDetails,
      similarJobDetails,
    } = this.state
    return (
      <div className="job-details-bg-container">
        <Header />
        <div className="job-details-bottom-container">
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
        </div>
      </div>
    )
  }
}

export default JobItemDetails
