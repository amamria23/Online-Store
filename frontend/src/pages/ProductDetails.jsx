import {
  CircularProgress,
  Box,
  IconButton,
  styled,
  Badge,
  Button,
} from "@mui/material";
import { useGetOneProductsQuery } from "../Redux/ProductsAPI";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Colors from "../components/Colors";
import DetailsThumb from "../components/h";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  incrementQuantity,
  decrementQuantity,
} from "../Redux/CartSlice";
import { Add, Remove, AddShoppingCart } from "@mui/icons-material";

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

const ProductDetails = () => {
  const myRef = useRef(null);
  let { id } = useParams();
  const [index, setIndex] = useState(0);
  const { data, error, isLoading } = useGetOneProductsQuery(id);
  // @ts-ignore
  const { selectorProductsID, selectorProducts } = useSelector((state) => state.Carttt);
  const dispatch = useDispatch();
  const tab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  const getQuantity = (data) => {
    const myProduct= selectorProducts.find((item) => {
      return item.id===data.id
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
          <title>product details</title>
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
          <title>product details</title>
        </Helmet>
        <div className="app detailsP">
          <div className="details" key={data._id}>
            <div className="big-img">
              <img src={data.imageLink[index]} alt="T-shirt" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productName}</h2>
                <span>${data.price}</span>
              </div>
              <Colors colors={data.colors} />

              <p>{data.description}</p>

              <DetailsThumb myRef={myRef} images={data.imageLink} tab={tab} />
              {selectorProductsID.includes(data.id) ? (
                <div
                  style={{ display: "flex", alignItems: "center", marginTop:"15px" }}
                >
                  <IconButton
                    sx={{ color: "#1976d2", mr: "10px" }}
                    onClick={() => {
                      dispatch(decrementQuantity(data));
                    }}
                  >
                    <Remove />
                  </IconButton>

                  <StyledBadge
                    badgeContent={getQuantity(data)}
                    color="secondary"
                  />
                  <IconButton
                    sx={{ color: "#1976d2", ml: "10px" }}
                    onClick={() => {
                      dispatch(incrementQuantity(data));
                    }}
                  >
                    <Add />
                  </IconButton>
                  
                </div>
              ) : (
                <Button
                  sx={{ textTransform: "capitalize", mt:1 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(AddToCart(data));
                  }}
                >
                  <AddShoppingCart sx={{mr:1}}/>Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
