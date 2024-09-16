import React from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'

function DEFAULT_RENDER () {
  return null
}

export default function TabPanel (props) {
  const {
    tab,
    selectedTab = v4()
  } = props

  if (tab === selectedTab) {
    const {
      render = DEFAULT_RENDER,
      children = render()
    } = props

    if (children) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      return (
        <div className='tab-panel'>
          {children}
        </div>
      )
    }
  }

  return null
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string,
  render: PropTypes.func
}
