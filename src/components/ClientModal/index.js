import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { removeOrderThunk } from "../../store/modules/orders/thunks";
import Button from "@material-ui/core/Button";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  paper: {
    backgroundColor: "#EED7D5",
    border: "2px solid #EC849D",
    padding: theme.spacing(2, 2, 3),
    "@media (max-width:490px)": {
      padding: theme.spacing(1, 1, 1),
      display: "inline",
    },
    maxHeight: "70vh",
    overflow: "auto",
    boxSizing: "border-box",
    flexDirection: "column",
    marginTop: "40px",
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

const ClientModal = ({ handleClose, open, productId }) => {
  const classes = useStyles();

  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const convertDate = (date) => {
    let newDate = new Date(date);

    let month = newDate.getMonth() + 1;

    let minutes = newDate.getMinutes();

    if (month < 10) {
      month = `0${newDate.getMonth() + 1}`;
    }

    if (minutes < 10) {
      minutes = `0${newDate.getMinutes()}`;
    }

    return `${newDate.getDate()}/${month}/${newDate.getFullYear()} ${newDate.getHours()}h:${minutes}min`;
  };

  function compare(a, b) {
    a.dataFim = new Date(a.dataFim);

    b.dataFim = new Date(b.dataFim);

    return a.dataFim - b.dataFim;
  }

  return (
    <div>
      <Modal
        style={{ overflowY: "auto" }}
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
            {orders.filter((ord) => ord.idUser === productId).length > 0 ? (
              orders
                .filter((ord) => ord.idUser === productId)
                .sort(compare)
                .map((ord, i) => (
                  <div className="client-card" key={i}>
                    <div>
                      Nome do cliente: {""}
                      <b style={{ fontSize: "20px" }}>{ord.nomeCliente}</b>
                    </div>
                    <div>
                      Data de expiração do pedido:{" "}
                      <b>{convertDate(ord.dataFim)}</b>
                    </div>
                    <Button
                      style={{
                        margin: "10px auto 0px auto",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      color="secondary"
                      variant="outlined"
                      onClick={() => dispatch(removeOrderThunk(ord))}
                    >
                      Concluir pedido
                    </Button>
                  </div>
                ))
            ) : (
              <div>Nenhum pedido ativo</div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ClientModal;
