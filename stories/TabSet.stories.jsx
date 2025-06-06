import React from 'react'
import {
  action
} from 'storybook/actions'

import TabSet from 'react-tab-set'
import TabGroup from 'react-tab-set/tab-set/tab-group'
import Tab from 'react-tab-set/tab-set/tab-group/tab'
import TabPanel from 'react-tab-set/tab-set/tab-panel'

function Component (props) {
  return (
    <TabSet {...props} onChange={action('onChange')}>
      <TabGroup>
        <Tab tab='one'>
          Tab One
        </Tab>
        <Tab tab='two'>
          Tab Two
        </Tab>
      </TabGroup>
      <TabPanel tab='one'>
        Tab Panel One
      </TabPanel>
      <TabPanel tab='two'>
        Tab Panel Two
      </TabPanel>
    </TabSet>
  )
}

export default {
  title: 'Components/TabSet',
  component: Component,
  argTypes: {
    selectedTab: {
      options: ['one', 'two'],
      control: { type: 'radio' },
      description: 'selectedTab'
    }
  }
}

export const ComponentStory = {
  args: {
    selectedTab: 'one'
  }
}
