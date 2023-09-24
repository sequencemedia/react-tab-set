import React, {
  Children,
  cloneElement
} from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'

import isTab from './is-tab.mjs'

function mapChildren (
  children,
  selectedTab,
  onTabSelect
) {
  return Children.map(children, (child) => {
    const { type } = child

    if (type) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      const { props } = child

      if (isTab(type)) {
        return cloneElement(
          child,
          {
            ...props,
            selectedTab,
            onTabSelect
          }
        )
      }

      const {
        children
      } = props

      if (children) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        return cloneElement(
          child,
          {
            ...props,
            children: mapChildren(children, selectedTab, onTabSelect)
          }
        )
      }
    }

    return child
  })
}

export default function TabGroup (props) {
  const {
    children,
    selectedTab,
    onTabSelect
  } = props

  return (
    <ul className='tab-group'>
      {mapChildren(children, selectedTab, onTabSelect)}
    </ul>
  )
}

TabGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  selectedTab: PropTypes.string,
  onTabSelect: PropTypes.func
}

TabGroup.defaultProps = {
  selectedTab: v4(),
  onTabSelect () { }
}
