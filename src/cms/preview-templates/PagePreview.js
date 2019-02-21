import React from 'react'
import PropTypes from 'prop-types'
import { IndexTemplate } from '../../pages/index'

const PagePreview = ({ entry, getAsset }) => {
  return <IndexTemplate data={entry} />
}

PagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PagePreview
