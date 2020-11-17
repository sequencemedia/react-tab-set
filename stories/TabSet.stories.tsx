import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { Story, Meta } from '@storybook/react'

import TabSet, { TabSetProps } from 'react-tab-set/tab-set'
import {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

const Template: Story<TabSetProps> = ({ onChange }) => ( // eslint-disable-line react/prop-types
  <TabSet onChange={onChange} selectedTab={select('Selected Tab', ['one', 'two'], 'one')}>
    <TabGroup>
      <Tab tab='one'>
        {text('Tab One', 'One')}
      </Tab>
      <Tab tab='two'>
        {text('Tab Two', 'Two')}
      </Tab>
    </TabGroup>
    <TabPanel tab='one'>
      {text('Tab Panel One', 'One')}
    </TabPanel>
    <TabPanel tab='two'>
      {text('Tab Panel Two', 'Two')}
    </TabPanel>
  </TabSet>
)

export const Component = Template.bind({})
Component.args = {
  onChange: action('onChange')
}

export default { // eslint-disable-line @typescript-eslint/consistent-type-assertions
  title: 'TabSet/TabSet',
  component: Component,
  decorators: [withKnobs],
  template: Template
} as Meta
