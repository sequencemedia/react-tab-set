import React from 'react'
import PropTypes from 'prop-types'

export default class TabPanel extends React.Component {
  renderPanel () {
    const {
      render,
      children = render()
    } = this.props

    if (children) {
      return (
        <div className='tab-panel'>
          {children}
        </div>
      )
    }

    return null
  }

  render () {
    const {
      tab,
      selectedTab
    } = this.props

    return (tab === selectedTab)
      ? this.renderPanel()
      : null
  }
}

TabPanel.defaultProps = {
  render: () => {}
}

TabPanel.propTypes = {
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ]),
  render: PropTypes.func
}
