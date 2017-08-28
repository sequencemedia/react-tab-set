import React from 'react'

import { storiesOf } from '@storybook/react'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from '~/src'

storiesOf('TabSet component', module).add('With default props', () => (
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
//  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
