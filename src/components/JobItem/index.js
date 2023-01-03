import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoBriefcase} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link className="job-nav-link-item" to={`/jobs/${id}`}>
      <li className="job-item-container">
        <div className="company-logo-job-role-rating-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-role-and-rating-container">
            <h3 className="job-role-title">{title}</h3>
            <div className="star-icon-and-rating-container">
              <FaStar color="#fbbf24" size={17} />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-job-type-package-container">
          <div className="icon-and-text-container">
            <MdLocationOn size={26} color="#ffffff" />
            <p className="job-location-emp-type-text">{location}</p>
          </div>
          <div className="icon-and-text-container">
            <IoBriefcase size={26} color="#ffffff" />
            <p className="job-location-emp-type-text">{employmentType}</p>
          </div>
          <h3 className="package-per-annum">{packagePerAnnum}</h3>
        </div>
        <hr />
        <h3 className="job-description-heading-text">Description</h3>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
