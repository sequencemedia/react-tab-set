import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

import ParentComponent from './parent-component'
import StaticParentComponent from './static-parent-component'
import RenderParentComponent from './render-parent-component'

const handleChange = action('change')
const handleClick = action('click')

storiesOf('TabSet component', module)
  .add('With default props', () => {
    return (
      <ParentComponent onClick={handleClick} onChange={handleChange}>
        <TabSet>
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
      </ParentComponent>
    )
  })
  .add('With default props and conditional render', () => {
    return (
      <ParentComponent onClick={handleClick} onChange={handleChange}>
        <TabSet>
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
      </ParentComponent>
    )
  })
  .add('With parent component and default props', () => (
    <StaticParentComponent onClick={handleClick} onChange={handleChange} />
  ))
  .add('With parent component, default props, and conditional render', () => (
    <RenderParentComponent onClick={handleClick} onChange={handleChange} />
  ))
