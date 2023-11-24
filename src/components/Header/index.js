import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {title} = props
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <div className="header-container">
            <div className="header-responsive-container">
              <h1 className="restaurent-heading">
                <Link to="/" className="nav-link">
                  {title}
                </Link>
              </h1>
              <div className="cart-container">
                <p className="cart-heading"> My Orders</p>
                <Link to="/cart" className="nav-link-cart">
                  <AiOutlineShoppingCart size={25} />
                  {cartItemsCount > 0 ? (
                    <span className="cart-count ">{cartList.length}</span>
                  ) : null}
                </Link>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogout}
                >
                  {' '}
                  Logout{' '}
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
