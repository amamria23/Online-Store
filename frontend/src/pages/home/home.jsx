import "./home.css";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Stack,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  styled,
  Badge,
  IconButton,
} from "@mui/material";
import { useGetproductsByNameQuery } from "../../Redux/ProductsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/CartSlice";
import { Remove, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const { data, error, isLoading } = useGetproductsByNameQuery();
  // @ts-ignore
  const { selectorProducts, selectorProductsID } = useSelector((state) => state.Carttt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getQuantity = (itemAPI) => {
    const myProduct= selectorProducts.find((item) => {
      return item.id===itemAPI.id
    })
    return myProduct.quantity;
  }
  if (error) {
    return (
      <div>
        <Helmet>
          <title>home</title>
        </Helmet>
        <h1>error</h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <Helmet>
          <title>home</title>
        </Helmet>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
  if (data) {
    return (
      <div>
        <Helmet>
          <title>home</title>
        </Helmet>
        <Stack sx={{ flexFlow: "row wrap" }} gap={2} component="section">
          {data.map((item) => {
            return (
                <Card
                  className="card"
                  key={item.id}
                  sx={{
                    maxWidth: 277,
                    mx: "auto",
                    my: 5,
                    height: "380px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240px"
                    image={item.imageLink[0]}
                    alt="T-shirt"
                    onClick={() => {
                      navigate(`/product-details/${item.id}`);
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {selectorProductsID.includes(item.id) ? (
                      <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          sx={{ color: "#1976d2", ml: "10px" }}
                          onClick={() => {
                            dispatch(incrementQuantity(item));
                          }}
                        >
                          <Add />
                        </IconButton>
                
                        <StyledBadge
                          badgeContent={getQuantity(item)}
                          color="secondary"
                        />
                
                        <IconButton
                          sx={{ color: "#1976d2", mr: "10px" }}
                          onClick={() => {
                            dispatch(decrementQuantity(item));
                          }}
                        >
                          <Remove />
                        </IconButton>
                      </div>
                    ) : (
                      <Button
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          dispatch(AddToCart(item));
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                    <Box flexGrow={1} />
                    <Typography variant="body2" color="error">
                      {`${item.price} $`}
                    </Typography>
                  </CardActions>
                </Card>
            );
          })}
        </Stack>
      </div>
    );
  }
};

export default Home;
