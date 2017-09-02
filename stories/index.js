import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

import StaticParentComponent from './static-parent-component'
import RenderParentComponent from './render-parent-component'

storiesOf('TabSet component', module)
  .add('With default props', () => (
    <TabSet selectedTab='one' onChange={action('change')}>
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
    <TabSet selectedTab='one' onChange={action('change')}>
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
    <StaticParentComponent n={0} onChange={action('change')} />
  ))
  .add('With parent component, default props, and conditional render', () => (
    <RenderParentComponent n={0} onChange={action('change')} />
  ))
