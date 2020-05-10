import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import createHistory from 'history/createBrowserHistory'
const history = createHistory({ forceRefresh: true });

const CustomLink = (props) => {
  const {
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props
  return (
    <button
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(CustomLink)