import { useEffect, useState } from "react";
import OrderModal from "../OrderModal";
import ClientModal from "../ClientModal";
import "./style.css";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const ProductsLeft = () => {
  const products = useSelector((state) => state.products);

  const orders = useSelector((state) => state.orders);

  const [openOrder, setOpenOrder] = useState(false);

  const [openClient, setOpenClient] = useState(false);

  const [productId, setProductId] = useState(0);

  const handleOpenOrder = (id) => {
    setOpenOrder(true);
    setProductId(id);
  };

  const handleCloseOrder = () => {
    setOpenOrder(false);
    setProductId(0);
  };

  const handleOpenClient = (id) => {
    setOpenClient(true);
    setProductId(id);
  };

  const handleCloseClient = () => {
    setOpenClient(false);
    setProductId(0);
  };

  return (
    <>
      <div className="prodLeft">
        {products.map((prod, i) => (
          <div className="prodLeft-card" key={i}>
            <p style={{ color: "#1a1727", fontSize: "23px" }}>{prod.nome}</p>
            <div>
              Esse produto possui{" "}
              <b style={{ backgroundColor: "#1a1727", padding: "1px 2px" }}>
                {orders.filter((ord) => ord.idUser === prod.id).length}
              </b>{" "}
              clientes
            </div>
            <div>
              <AddCircleIcon
                cursor="pointer"
                style={{ margin: "15px 20px 0px 0px" }}
                onClick={() => handleOpenOrder(prod.id)}
              ></AddCircleIcon>
              <VisibilityIcon
                cursor="pointer"
                onClick={() => handleOpenClient(prod.id)}
              ></VisibilityIcon>
            </div>
          </div>
        ))}
      </div>
      <OrderModal
        handleClose={handleCloseOrder}
        handleOpen={handleOpenOrder}
        open={openOrder}
        productId={productId}
      />
      <ClientModal
        handleClose={handleCloseClient}
        handleOpen={handleOpenClient}
        open={openClient}
        productId={productId}
      />
    </>
  );
};

export default ProductsLeft;
