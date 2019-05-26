import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export default class RenderParentComponent extends React.Component {
  state = {
    selectedTab: 'one'
  }

  handleChange = (selectedTab) => {
    this.setState({ selectedTab })

    const { onChange } = this.props

    onChange(selectedTab)
  }

  render () {
    const { children } = this.props
    const { selectedTab } = this.state

    return Children.map(children, (child) => {
      const { props } = child

      return cloneElement(
        child,
        {
          ...props,
          onChange: this.handleChange,
          selectedTab
        }
      )
    })
  }
}

RenderParentComponent.defaultProps = {
  onChange: () => {},
  children: []
}

RenderParentComponent.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ]).isRequired
}
