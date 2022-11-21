import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  producto: [],
  total: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // lo integro al array de productos con su payload
      state.producto.push(action.payload);
      // recalculo el total
      state.total = state.producto.reduce(
        (previousValue, producto) => previousValue + producto.price,
        0
      );
    },

    // updateProduct: (state, action) => {
    //     const { id, title, description, price, img } = action.payload
    //     const findproduct = state.find(product => product.id === id)

    //     if (findproduct) {
    //         findproduct.title = title
    //         findproduct.description = description
    //         findproduct.price = price
    //         findproduct.img = img

    //     }

    // },

    deleteProduct: (state, action) => {
      // encuentro el id para eliminarlo
      const foundProduct = state.producto.find(
        (product) => product.id === action.payload
      );
      state.total
        ? (state.total = state.total - action.payload.price)
        : (state.total = action.payload.price);
      if (foundProduct) {
        state.producto.splice(state.producto.indexOf(foundProduct), 1); // primer parametro indice, segundo parametro la cantidad que se desea eliminar
      }
      // recalculo el total
      state.total = state.producto.reduce(
        (previousValue, producto) => previousValue + producto.price,
        0
      );
    },
  },
});

export const { addProduct, deleteProduct /*updatePoduct*/ } =
  productSlice.actions;

export const selectProducto = (state) => state.products.producto;
export const selectTotal = (state) => state.products.total;

export default productSlice.reducer;
