import { TabGroup } from './tab-set/tab-group'
import { Tab } from './tab-set/tab-group/tab'
import { TabPanel } from './tab-set/tab-panel'

export const isTabGroup = (type) => type === TabGroup
export const isTab = (type) => type === Tab
export const isTabPanel = (type) => type === TabPanel

export {
  TabGroup,
  Tab,
  TabPanel
}

export default from './tab-set'
