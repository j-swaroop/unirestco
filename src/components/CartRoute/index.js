import CartContext from '../../context/CartContext'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const showEmptyView = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className='cart-page-container'>
              <div className='cart-page-content-container'>
                <h1 className='mycart-heading'> My Cart </h1>
                <button
                  type='button'
                  className='remove-all-btn'
                  onClick={onClickRemoveAll}
                >
                  Remove All
                </button>
                <CartListView />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartRoute
