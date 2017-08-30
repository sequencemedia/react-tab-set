import React from 'react'
import PropTypes from 'prop-types'

import { storiesOf } from '@storybook/react'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from '~/src'

class StaticParentComponent extends React.Component {
  state = {
    n: this.props.n
  }

  handleClick = () => this.setState({ n: this.state.n + 1 })

  render () {
    const { n } = this.state

    return (
      <div onClick={this.handleClick}>
        Number {n} number
        <TabSet defaultTab='one'>
          <TabGroup>
            <Tab tab='one'>
              One {n}
            </Tab>
            <Tab tab='two'>
              Two {n}
            </Tab>
          </TabGroup>
          <TabPanel tab='one'>
            One {n}
          </TabPanel>
          <TabPanel tab='two'>
            Two {n}
          </TabPanel>
        </TabSet>
      </div>
    )
  }
}

StaticParentComponent.propTypes = {
  n: PropTypes.number.isRequired
}

class RenderParentComponent extends React.Component {
  state = {
    n: this.props.n
  }

  handleClick = () => this.setState({ n: this.state.n + 1 })

  render () {
    const { n } = this.state

    return (
      <div onClick={this.handleClick}>
        Number {n} number
        <TabSet defaultTab='one'>
          <TabGroup>
            <Tab tab='one'>
              One {n}
            </Tab>
            <Tab tab='two'>
              Two {n}
            </Tab>
          </TabGroup>
          <TabPanel tab='one' render={() => {
            return `One ${n}`
          }} />
          <TabPanel tab='two' render={() => {
            return `Two ${n}`
          }} />
        </TabSet>
      </div>
    )
  }
}

RenderParentComponent.propTypes = {
  n: PropTypes.number.isRequired
}

storiesOf('TabSet component', module)
  .add('With default props', () => (
    <TabSet defaultTab='one'>
      <TabGroup>
        <Tab tab='one'>
          One
        </Tab>
        <Tab tab='two'>
          Two
        </Tab>
      </TabGroup>
      <TabPanel tab='one'>
        One
      </TabPanel>
      <TabPanel tab='two'>
        Two
      </TabPanel>
    </TabSet>
  ))
  .add('With default props and conditional render', () => (
    <TabSet defaultTab='one'>
      <TabGroup>
        <Tab tab='one'>
          One
        </Tab>
        <Tab tab='two'>
          Two
        </Tab>
      </TabGroup>
      <TabPanel tab='one' render={() => {
        return 'One'
      }} />
      <TabPanel tab='two' render={() => {
        return 'Two'
      }} />
    </TabSet>
  ))
  .add('With parent component and default props', () => (
    <StaticParentComponent n={0} />
  ))
  .add('With parent component, default props, and conditional render', () => (
    <RenderParentComponent n={0} />
  ))
