import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../utils/api'
import { toast } from "react-toastify";

const initialState = {
    loading: true,
    error: '',
    data: '',
}

export const getProduct = createAsyncThunk("get-product", async () => {
    try {
        const data = await Api.get("/api/product/all-products")
        return data
    }
    catch (error) {
        return error
    }
});

export const createProduct = createAsyncThunk("create-product", async (value) => {
    try {
        const data = await Api.post("/api/product/create", value)
        return data
    }
    catch (error) {
        return error
    }
});

export const updateProduct = createAsyncThunk("update-product", async (values) => {
    try {
        const data = await Api.put(`/api/product/update/${values.id}`, { product: values.value })
        values.navigateTo()
        return data
    }
    catch (error) {
        return error
    }
});

export const deleteProduct = createAsyncThunk("delete-product", async (id) => {
    try {
        const data = await Api.delete(`/api/product/delete/${id}`)
        return data
    }
    catch (error) {
        return error
    }
});


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    state.data =''
                }
                else {
                    state.data = action?.payload?.data
                }
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                state.data = ''
            })


            .addCase(createProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 1000
                    })
                }
                else {
                    toast.success(action?.payload?.data?.message, {
                        autoClose: 1000
                    })
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
            
            })


            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 2000
                    })
                }
                else {
                    state.data = state?.data?.data?.map(
                        (item) => item.productID === action?.payload?.data?.data?.productID ? action.payload?.data?.data : item
                    );
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                    autoClose: 2000
                })
            })


            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 2000
                    })
                }
                else {
                    state.data.data = state.data.data.filter(
                        (item) => item.productID !== action?.payload?.data?.data
                    );
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                    autoClose: 2000
                })
            })
    }
})

export const { reset } = productSlice.actions;
export default productSlice.reducer;