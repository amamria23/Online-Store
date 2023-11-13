import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectorProducts:
    localStorage.getItem("selectorProducts") === null
      ? []
      : JSON.parse(localStorage.getItem("selectorProducts")),
  selectorProductsID:
    localStorage.getItem("selectorProductsID") === null
      ? []
      : JSON.parse(localStorage.getItem("selectorProductsID")),
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const productWithQU = { ...action.payload, quantity: 1 };
      state.selectorProducts.push(productWithQU);
      localStorage.setItem(
        "selectorProducts",
        JSON.stringify(state.selectorProducts)
      );
      state.selectorProductsID.push(productWithQU.id);
      localStorage.setItem(
        "selectorProductsID",
        JSON.stringify(state.selectorProductsID)
      );
    },

    DeleteProduct: (state, action) => {
      const deleteProduct = state.selectorProducts.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.selectorProducts = deleteProduct;
      const deleteProduct2 = state.selectorProductsID.filter((item) => {
        return item !== action.payload.id;
      });
      state.selectorProductsID = deleteProduct2;
      localStorage.setItem(
        "selectorProducts",
        JSON.stringify(state.selectorProducts)
      );
      localStorage.setItem(
        "selectorProductsID",
        JSON.stringify(state.selectorProductsID)
      );
    },

    incrementQuantity: (state, action) => {
      const CartProduct = state.selectorProducts.find((item) => {
        return item.id === action.payload.id;
      });
      CartProduct.quantity += 1;
      localStorage.setItem(
        "selectorProducts",
        JSON.stringify(state.selectorProducts)
      );
      console.log("done");
    },

    decrementQuantity: (state, action) => {
      const CartProduct2 = state.selectorProducts.find((item) => {
        return item.id === action.payload.id;
      });
      CartProduct2.quantity -= 1;

      if (CartProduct2.quantity === 0) {
        const deleteProduct = state.selectorProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        console.log(deleteProduct);
        state.selectorProducts = deleteProduct;
        const deleteProduct2 = state.selectorProductsID.filter((item) => {
          return item !== action.payload.id;
        });
        state.selectorProductsID = deleteProduct2;
        localStorage.setItem(
          "selectorProductsID",
          JSON.stringify(state.selectorProductsID)
        );
      }
      localStorage.setItem(
        "selectorProducts",
        JSON.stringify(state.selectorProducts)
      );

      console.log("done");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  AddToCart,
  DeleteProduct,
  incrementQuantity,
  decrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
