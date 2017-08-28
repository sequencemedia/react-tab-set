import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

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

/*
 *  The selected tab default doesn't have to be unique/a uuid, but using the 'uuid' package reduces
 *  the likelihood that the default has the same value as a tab
 */
TabPanel.defaultProps = {
  tab: uuid.v4(),
  selectedTab: uuid.v4(),
  children: [],
  render: () => {}
}

TabPanel.propTypes = {
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.node,
  render: PropTypes.func
}
