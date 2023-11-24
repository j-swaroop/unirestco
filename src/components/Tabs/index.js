import './index.css'

const Tabs = props => {
  const {details, isActive, setActiveTab} = props

  const activeTabClassName = isActive ? 'tab-btn-active' : ''

  const activeTab = () => {
    setActiveTab(details)
  }

  return (
    <li className="tab-item">
      <button
        className={`tab-btn ${activeTabClassName}`}
        type="button"
        onClick={activeTab}
      >
        {details.menu_category}
      </button>
    </li>
  )
}

export default Tabs
