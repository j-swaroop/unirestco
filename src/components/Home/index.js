import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Tabs from '../Tabs'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'
import './index.css'

const apiConstants = {
  initial: 'INITITAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    data: [],
    activeTab: '',
    pageTitle: '',
  }

  componentDidMount() {
    this.dishesApiUrl()
  }

  dishesApiUrl = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.map(item => item.table_menu_list)
      const newData = updatedData.flat(1)
      const updatedTabs = newData.map(item => item.menu_category)

      this.setState({
        data: newData,
        apiStatus: apiConstants.success,
        activeTab: updatedTabs[0],
        pageTitle: data[0].restaurant_name,
      })
    }
  }

  setActiveTab = tabDetails => {
    this.setState({
      activeTab: tabDetails.menu_category,
    })
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" width={50} height={50} />
    </div>
  )

  renderPageContent = () => {
    const {pageTitle, data, activeTab} = this.state

    const dishes = data.find(item => item.menu_category === activeTab)

    return (
      <>
        <Header title={pageTitle} />
        <div className="home-container">
          <div className="home-responsive-container">
            <ul className="tabs-container">
              {data.map(item => (
                <Tabs
                  key={item.menu_category_id}
                  details={item}
                  setActiveTab={this.setActiveTab}
                  isActive={activeTab === item.menu_category}
                />
              ))}
            </ul>

            <ul className="dishes-container">
              {dishes.category_dishes.map(item => (
                <DishItem key={item.dish_id} details={item} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderPageContent()
      default:
        return null
    }
  }

  render() {
    return <> {this.renderData()} </>
  }
}

export default Home
