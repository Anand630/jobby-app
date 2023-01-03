import {FaStar} from 'react-icons/fa'
import {IoBriefcase} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-job-details-card">
      <div className="similar-job-company-logo-job-role-rating-container">
        <img
          className="similar-job-company-logo"
          src={companyLogoUrl}
          alt="company logo"
        />
        <div className="similar-job-role-and-rating-container">
          <h3 className="similar-job-role-title">{title}</h3>
          <div className="similar-job-star-icon-and-rating-container">
            <FaStar color="#fbbf24" size={17} />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h3 className="similar-job-headings-text">Description</h3>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-job-type-package-container">
        <div className="similar-job-icon-and-text-container">
          <MdLocationOn size={26} color="#ffffff" />
          <p className="similar-job-location-emp-type-text">{location}</p>
        </div>
        <div className="similar-job-icon-and-text-container">
          <IoBriefcase size={26} color="#ffffff" />
          <p className="similar-job-location-emp-type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
