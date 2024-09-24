import { createContext, useContext, useReducer } from "react";

export const CartState = createContext();
export const CartDispatch = createContext();


const reducer = (state, action) => {
  switch(action.type) {
    case "ADD":
      return [...state, {id:action.id, name:action.name, image:action.image, price:action.price, count:action.count, size:action.size, ingredients:action.ingredients}]
      case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr
      case "DROP":
        let arr = []
        return arr
      default:
        return state; 
  }
}
export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <CartDispatch.Provider value = {dispatch}>
      <CartState.Provider value = {state}>
        {children}
      </CartState.Provider>
    </CartDispatch.Provider>
  )
}

export const useCart = () => useContext(CartState)
export const useDispatch = () => useContext(CartDispatch)


// export const CardELements = createContext({
//   price: {},
//   // count: Number,
//   size: '',
//   calculateTotal: ()=> {},
//   handleQtyChange: ()=> {},
//   handleSizeChange: ()=> {},
// })
