import React from 'react'
import { action } from '@storybook/addon-actions'

import TabSet from 'react-tab-set'
import TabGroup from 'react-tab-set/tab-set/tab-group'
import Tab from 'react-tab-set/tab-set/tab-group/tab'
import TabPanel from 'react-tab-set/tab-set/tab-panel'

function Component (props) {
  return ( // eslint-disable-line react/prop-types
    <TabSet {...props} selectedTab='one'>
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
  title: 'TabSet/Component',
  component: Component
}

export const Default = {
  args: {
    onChange: action('onChange')
  }
}

