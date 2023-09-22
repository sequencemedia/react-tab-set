import React from 'react'
import { action } from '@storybook/addon-actions'
import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

function Template (args) {
  return ( // eslint-disable-line react/prop-types
    <TabSet {...args} selectedTab='one'>
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

export const Component = Template.bind({})

Component.args = {
  onChange: action('onChange')
}

export default {
  title: 'TabSet/TabSet',
  component: Component,
  template: Template
}
