import React from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'

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
  selectedTab: PropTypes.string,
  onTabSelect: PropTypes.func
}

Tab.defaultProps = {
  selectedTab: v4(),
  onTabSelect () { }
}
