import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import CartRoute from './components/CartRoute'
import LoginPage from './components/LoginPage'
import CartContext from './context/CartContext'
import './App.css'

// write your code here
class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dish_id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (dish_id === eachItem.dish_id) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = dish_id => {
    const {cartList} = this.state
    const productObj = cartList.find(eachItem => eachItem.dish_id === dish_id)
    if (productObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (dish_id === eachItem.dish_id) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(dish_id)
    }
  }

  removeCartItem = dish_id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachItem => eachItem.dish_id !== dish_id,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObj = cartList.find(
      eachItem => eachItem.dish_id === product.dish_id,
    )

    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (productObj.dish_id === eachItem.dish_id) {
            const updatedQuantity = eachItem.quantity + product.quantity

            return {...eachItem, quantity: updatedQuantity}
          }

          return eachItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
