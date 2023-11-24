import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const vegLogo =
  'https://res.cloudinary.com/drnrrd97f/image/upload/v1698934824/_d3f8423af5d5ceeeb5baca2d56a1caa8f9b7db5920170905-6221-j2o9ot_p1jezr.jpg'
const nonVegLogo =
  'https://res.cloudinary.com/drnrrd97f/image/upload/v1698935231/non-vegggg_dh8khm.jpg'

class DishItem extends Component {
  state = {
    quantity: 0,
  }

  onIncrementQuantityHome = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrementItemHome = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  render() {
    const {quantity} = this.state
    const {details} = this.props

    const dishType = details.dish_Type === 1 ? nonVegLogo : vegLogo
    // const description = details.dish_description.slice(0, 60)
    const isCustimizationAvail = details.addonCat.length !== 0

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onClickAddToCart = () => {
            addCartItem({...details, quantity})
          }

          return (
            <li className="dish-item-container">
              <div className="dish-details-container">
                <div className="dish-container">
                  <img
                    src={dishType}
                    className="dish-type-img"
                    alt="vegornonvegimage"
                  />
                  <div className="dish-text-details">
                    <h1 className="dish-heading"> {details.dish_name} </h1>
                    <p className="dish-currency">
                      {' '}
                      {details.dish_currency} {details.dish_price}{' '}
                    </p>
                    <p className="dish-description">
                      {details.dish_description}
                    </p>

                    {details.dish_Availability ? (
                      <div className="buttons-container">
                        <button
                          className="minus-btn"
                          type="button"
                          onClick={this.onDecrementItemHome}
                        >
                          {' '}
                          -{' '}
                        </button>

                        <p className="quantity"> {quantity} </p>

                        <button
                          className="plus-btn"
                          type="button"
                          onClick={this.onIncrementQuantityHome}
                        >
                          {' '}
                          +{' '}
                        </button>
                        {quantity > 0 && (
                          <button
                            className="add-to-cart-btn"
                            type="button"
                            onClick={onClickAddToCart}
                          >
                            ADD TO CART
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="not-available-text"> Not available </p>
                    )}

                    {isCustimizationAvail && (
                      <p className="custom"> Customizations available</p>
                    )}
                  </div>
                </div>
                <p className="calories-heading"> {details.dish_calories} calories</p>
                <img
                  src={details.dish_image}
                  alt={details.dish_name}
                  className="dish-img"
                />
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
