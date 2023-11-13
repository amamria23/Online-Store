import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  Divider,
  styled,
  Badge,
} from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
import "./Cart.css";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  DeleteProduct,
} from "../../Redux/CartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 0,
    padding: "15px 0",
    borderRadius: "50%",
    color: "white",
    backgroundColor: "#1565c0",
  },
}));

const Cart = () => {
  // @ts-ignore
  const { selectorProducts } = useSelector((state) => state.Carttt);
  const dispatch = useDispatch();
  let SubTotal =0;
  return (
    <div>
      <Helmet>
        <title>create</title>
      </Helmet>
      <Box>
        {selectorProducts.map((item) => {
          SubTotal+=(item.price*item.quantity)
          return (
            <Paper dir="rtl" className="item-container" key={item.id}>
              <div className="img-title-parent">
                <img src={item.imageLink[0]} alt="" />
                <p className="product-name">{item.productName}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{ color: "#1976d2", ml: "10px" }}
                  onClick={() => {
                    dispatch(incrementQuantity(item));
                  }}
                >
                  <Add />
                </IconButton>

                <StyledBadge badgeContent={item.quantity} color="secondary" />

                <IconButton
                  sx={{ color: "#1976d2", mr: "10px" }}
                  onClick={() => {
                    dispatch(decrementQuantity(item));
                  }}
                >
                  <Remove />
                </IconButton>
              </div>

              <div className="price">${item.price*item.quantity}</div>

              <Button
                sx={{ display: { xs: "none", md: "inline-flex" } }}
                variant="text"
                color="error"
                onClick={() => {
                  dispatch(DeleteProduct(item));
                }}
              >
                delete
              </Button>

              <IconButton
                sx={{
                  color: "#ef5350",
                  display: { xs: "inline-flex", md: "none" },
                }}
                onClick={() => {
                  dispatch(DeleteProduct(item));
                }}
              >
                <Delete />
              </IconButton>
            </Paper>
          );
          
        })}
        <Paper sx={{ width: "200px", mx: "auto", my: 4 }}>
          <Typography
            sx={{ textAlign: "center", p: 2 }}
            variant="h5"
            color="inherit"
          >
            Cart Summary
          </Typography>
          <Divider />
          <Stack
            sx={{ flexDirection: "row", justifyContent: "space-between", p: 1 }}
          >
            <Typography variant="body1" color="inherit">
              SubTotal
            </Typography>
            <Typography variant="body1" color="inherit">
              {SubTotal}$
            </Typography>
          </Stack>
          <Button sx={{ flexGrow: 1, width: "100%" }} variant="contained">
            checkout
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default Cart;
