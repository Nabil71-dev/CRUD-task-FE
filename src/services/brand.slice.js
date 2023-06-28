import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../utils/api'
import { toast } from "react-toastify";

const initialState = {
    loading: true,
    error: '',
    data: [],
}

export const getBrands = createAsyncThunk("get-brands", async () => {
    try {
        const data = await Api.get("/api/brand/all-brands")
        return data
    }
    catch (error) {
        return error
    }
});

export const createBrands = createAsyncThunk("create-brands", async (value) => {
    try {
        const data = await Api.post("/api/brand/create", value)
        return data
    }
    catch (error) {
        return error
    }
});

export const deleteBrands = createAsyncThunk("delete-brands", async (id) => {
    try {
        const data = await Api.delete(`/api/brand/delete/${id}`)
        return data
    }
    catch (error) {
        return error
    }
});

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.loading = true
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    state.data = []
                }
                else {
                    state.data = action?.payload?.data
                }
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                state.data = []
            })


            .addCase(createBrands.pending, (state) => {
                state.loading = true
            })
            .addCase(createBrands.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 1000
                    })
                }
                else {
                    state.data.data.push(action?.payload?.data?.data)
                    toast.success(action?.payload?.data?.message, {
                        autoClose: 1000
                    })
                }
            })
            .addCase(createBrands.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
            })

            .addCase(deleteBrands.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteBrands.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 2000
                    })
                }
                else {
                    state.data.data = state.data.data.filter(
                        (item) => item.brandId !== action?.payload?.data?.data
                    );
                }
            })
            .addCase(deleteBrands.rejected, (state, action) => {
                state.loading = false
                toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                    autoClose: 2000
                })
            })
    }
})

export const { reset } = brandSlice.actions;
export default brandSlice.reducer;