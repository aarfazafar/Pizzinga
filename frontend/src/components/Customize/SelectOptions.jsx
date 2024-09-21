import React, { useEffect, useState } from "react";
import "./customcard.css";
const SelectOptions = ({ list, type, price, addIngredients }) => {
  const [item, setItem] = useState({name:'', value:''}) 
  const [itemCost, setItemCost] = useState(item.value) 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=> {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    // console.log(item.value);
    addIngredients(item, type, itemCost);
    
  },[item])
  useEffect(()=> {
    // setItem({name:'', value:''})
  },[])
  const  addItem = ()=> {
    addIngredients(item);
  }
  return (
    <div
      className="btn-group-vertical my-radio"
      role="group"
      aria-label="Vertical radio toggle button group"
    >
      {list.map((option, index) => {
        const inputId = `vbtn-radio${index + 1}${type}`;
        let ingredientCost = Math.floor((price * option.value)*30);
        // let total = Math.ceil((price*30 + ingredientCost));
        return (
          <React.Fragment key={index}>
            <input
              type="radio"
              className="btn-check"
              name={`vbtn-radio${type}`}
              id={inputId}
              autoComplete="off"
              value = {item}
              onClick={()=> {setItem(option);
                setItemCost(ingredientCost)
                // console.log(item);
                // addIngredients(item);
              }}
            />
            <label
              className="btn btn-outline-secondary radio-btn"
              htmlFor={inputId}
            >
              <div>{option.name} </div>
              <div>₹ {ingredientCost}</div>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SelectOptions;
