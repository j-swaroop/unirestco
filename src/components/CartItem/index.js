import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDetails} = props

      const item = {
        dishId: cartItemDetails.dish_id,
        dishImage: cartItemDetails.dish_image,
        dishName: cartItemDetails.dish_name,
        dishPrice: cartItemDetails.dish_price,
        quantity: cartItemDetails.quantity,
      }

      const {dishId, dishImage, dishName, dishPrice, quantity} = item

      const onClickDecrement = () => {
        decrementCartItemQuantity(dishId)
      }

      const onClickIncrement = () => {
        incrementCartItemQuantity(dishId)
      }

      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }
      const totalPrice = dishPrice * quantity

      return (
        <li className="cart-dish-item-container">
          <img src={dishImage} alt={dishName} className="cart-dish-img" />
          <div className="cart-dish-details">
            <h1 className="cart-dish-heading"> {dishName} </h1>
            <p className="cart-dish-currency">{totalPrice}</p>
            <div className="quantity-container">
              <button
                className="cart-minus-btn"
                onClick={onClickDecrement}
                type="button"
              >
                -
              </button>
              <p className="quantity"> {quantity} </p>
              <button
                className="cart-plus-btn"
                onClick={onClickIncrement}
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <button
            className="cart-remove-btn"
            onClick={onRemoveCartItem}
            type="button"
          >
            {' '}
            Remove{' '}
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
