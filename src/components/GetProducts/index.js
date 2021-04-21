import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import OrderModal from "../OrderModal";
import ClientModal from "../ClientModal";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const GetProducts = () => {
  const orders = useSelector((state) => state.orders);

  const products = useSelector((state) => state.products);

  const [filtProd, setFiltProd] = useState([]);
  const schema = yup.object().shape({
    produto: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleProduct = (data) => {
    data.produto = data.produto
      .toLocaleLowerCase("en-US")
      .replace(/[^a-z0-9]/gi, "")
      .trim();

    setFiltProd(
      products.filter((prod) =>
        prod.nome
          .toLocaleLowerCase("en-US")
          .replace(/[^a-z0-9]/gi, "")
          .trim()
          .includes(data.produto)
      )
    );
    reset();
  };

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

  const handleMinimize = () => {
    setFiltProd([]);
  };

  return (
    <>
      <div className="prodRight">
        <div>
          <form onSubmit={handleSubmit(handleProduct)}>
            <TextField placeholder="Nome do produto" {...register("produto")} />

            <button
              style={{
                background: "none",
                padding: "6px 0 0 10px",
                border: "0",
                cursor: "pointer",
              }}
              type="submit"
            >
              <SearchIcon />
            </button>
            <p style={{ margin: "0 0", color: "#8c3232" }}>
              {errors.produto?.message}
            </p>
          </form>
        </div>
        <div className="prodRight-filtered">
          {filtProd.map((filt, i) => (
            <div className="prodLeft-card" key={i}>
              <p style={{ color: "#1a1727", fontSize: "23px" }}>{filt.nome}</p>
              <div>
                Esse produto possui{" "}
                <b style={{ backgroundColor: "#1a1727", padding: "1px 2px" }}>
                  {orders.filter((ord) => ord.idUser === filt.id).length}
                </b>{" "}
                clientes
              </div>
              <div>
                <AddCircleIcon
                  style={{ margin: "15px 20px 0px 0px" }}
                  onClick={() => handleOpenOrder(filt.id)}
                ></AddCircleIcon>
                <VisibilityIcon
                  onClick={() => handleOpenClient(filt.id)}
                ></VisibilityIcon>
              </div>
            </div>
          ))}
          {filtProd.length > 0 && (
            <div>
              <button onClick={handleMinimize}>Minizar produtos</button>
            </div>
          )}
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
      </div>
    </>
  );
};

export default GetProducts;
