import React from 'react'
import PropTypes from 'prop-types'

export default function Tab (props) {
  const {
    children,
    tab,
    selectedTab,
    onTabSelect
  } = props

  const className = (tab === selectedTab)
    ? 'tab selected'
    : 'tab'

  return (
    <li
      className={className}
      onClick={() => {
        onTabSelect(tab)
      }}>
      {children}
    </li>
  )
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired
}
