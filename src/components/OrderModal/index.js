import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addOrderThunk } from "../../store/modules/orders/thunks";
import "./style.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// import "./style.css";

//['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
// width: 200
// },

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#EED7D5",
    border: "2px solid #EC849D",
    padding: theme.spacing(2, 2, 3),
    "@media (max-width:490px)": {
      padding: theme.spacing(1, 1, 1),
      display: "inline",
    },
    display: "flex",
    flexWrap: "wrap",
  },
}));

/* background-color: #8e5e5b;
  display: flex;
  //#EED7D5
  flex-wrap: wrap;
  justify-content: space-around;
  color: #eed7d5;
  /* color: #657c93; */
/* color: #aaaaaa; */
/* color: #1a1727; */

const OrderModal = ({ handleClose, open, productId }) => {
  const products = useSelector((state) => state.products);

  const classes = useStyles();

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    nomeCliente: yup.string().required("Campo obrigatório"),
    dataFim: yup.string().required("Campo obrigatório").nullable(),
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

  const addOrder = (data) => {
    data.idUser = productId;
    console.log(data);

    dispatch(addOrderThunk(data));
    reset();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit(addOrder)}>
              <div style={{ margin: "0px 0px 20px 0px" }}>
                <TextField
                  type="text"
                  label="Nome do cliente"
                  {...register("nomeCliente")}
                  error={!!errors.nomeCliente}
                  helperText={errors.nomeCliente?.message}
                />
              </div>
              <TextField
                style={{ margin: "0px 0px 20px 0px" }}
                label="Data de expiração do pedido"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("dataFim")}
                error={!!errors.dataFim}
                helperText={errors.dataFim?.message}
              />
              <div>
                <Button
                  color="secondary"
                  variant="outlined"
                  className="modalButton"
                  type="submit"
                >
                  Adicionar pedido
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default OrderModal;
