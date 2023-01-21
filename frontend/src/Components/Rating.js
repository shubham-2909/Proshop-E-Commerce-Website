import React from 'react'
import PropTypes from 'prop-types'

import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa'
const Rating = ({ text, color, value }) => {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt style={{ color: color }} />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt style={{ color: color }} />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt style={{ color: color }} />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt style={{ color: color }} />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt style={{ color: color }} />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        <p className='review'>{text && text}</p>
      </span>
    </div>
  )
}
Rating.defaultProps = {
  color: '#f8e825',
}
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}
export default Rating
