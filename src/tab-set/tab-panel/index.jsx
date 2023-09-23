import React from 'react'
import PropTypes from 'prop-types'

export default function TabPanel (props) {
  const {
    tab,
    selectedTab
  } = props

  if (tab === selectedTab) {
    const {
      render = () => null,
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
  selectedTab: PropTypes.string.isRequired,
  render: PropTypes.func
}
