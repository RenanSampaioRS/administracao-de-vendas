const ordersReducer = (
  state = JSON.parse(localStorage.getItem("pedidos")) || [],
  action
) => {
  switch (action.type) {
    case "@/addOrder":
      const { order } = action;
      return [...state, order];

    case "@/removeOrder":
      const { orders } = action;
      return [...orders];

    default:
      return state;
  }
};

export default ordersReducer;
