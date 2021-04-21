import { addOrder, removeOrder } from "./actions";

export const addOrderThunk = (order, productId, products) => (
  dispatch,
  getStore
) => {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(order);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  dispatch(addOrder(order));
};

export const removeOrderThunk = (product) => (dispatch, getStore) => {
  const { orders } = getStore();
  orders.splice(orders.indexOf(product), 1);
  localStorage.setItem("pedidos", JSON.stringify(orders));
  dispatch(removeOrder(orders));
};
