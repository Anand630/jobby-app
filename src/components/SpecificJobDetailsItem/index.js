import {FaStar} from 'react-icons/fa'
import {IoBriefcase} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import './index.css'

const SpecificJobDetailsItem = props => {
  const {jobDetails, lifeAtCompanyDetails, skills} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,

    jobDescription,

    location,
    packagePerAnnum,
    rating,

    title,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompanyDetails
  // console.log(props)

  return (
    <div className="specific-job-details-card">
      <div className="specific-job-company-logo-job-role-rating-container">
        <img
          className="specific-job-company-logo"
          src={companyLogoUrl}
          alt="job details company logo"
        />
        <div className="specific-job-role-and-rating-container">
          <h3 className="specific-job-role-title">{title}</h3>
          <div className="specific-job-star-icon-and-rating-container">
            <FaStar color="#fbbf24" size={17} />
            <p className="specific-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="specific-job-location-job-type-package-container">
        <div className="specific-job-icon-and-text-container">
          <MdLocationOn size={26} color="#ffffff" />
          <p className="specific-job-location-emp-type-text">{location}</p>
        </div>
        <div className="specific-job-icon-and-text-container">
          <IoBriefcase size={26} color="#ffffff" />
          <p className="specific-job-location-emp-type-text">
            {employmentType}
          </p>
        </div>
        <p className="specific-job-package-per-annum">{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="description-heading-visit-text-icon-container">
        <h3 className="specific-job-headings-text">Description</h3>

        <a href={companyWebsiteUrl} className="visit-text-icon-container">
          Visit
          <FiExternalLink color="#6366f1" size={19} />
        </a>
      </div>
      <p className="specific-job-description">{jobDescription}</p>
      <h3 className="specific-job-headings-text">Skills</h3>
      <ul className="skills-required-container">
        {skills.map(eachSkill => (
          <li className="each-skill-item-container" key={eachSkill.name}>
            <img
              className="skill-logo"
              src={eachSkill.imageUrl}
              alt={eachSkill.name}
            />
            <h4 className="skill-name">{eachSkill.name}</h4>
          </li>
        ))}
      </ul>
      <h3 className="specific-job-headings-text">Life at Company</h3>
      <div className="life-at-company-description-and-image-container">
        <p className="life-at-company-description">{description}</p>
        <img
          className="life-at-company-image"
          alt="life at company"
          src={imageUrl}
        />
      </div>
    </div>
  )
}

export default SpecificJobDetailsItem
