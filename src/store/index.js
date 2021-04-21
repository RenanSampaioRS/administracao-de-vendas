import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//A gente importa nossos reducers
// import cartReducer from "./modules/cart/reducer";
import productsReducer from "../store/modules/products/reducer";
import ordersReducer from "../store/modules/orders/reducer";

const reducers = combineReducers({
  // cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
