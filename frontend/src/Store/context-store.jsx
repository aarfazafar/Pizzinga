import { createContext } from "react";

export const CardELements = createContext({
  price: {},
  // count: Number,
  size: '',
  calculateTotal: ()=> {},
  handleQtyChange: ()=> {},
  handleSizeChange: ()=> {},
})