import TabPanel from './tab-panel/index.tsx'

export default function isTabPanel (component: any): component is TabPanel {
  return component === TabPanel
}
