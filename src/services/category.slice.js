import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../utils/api'
import { toast } from "react-toastify";

const initialState = {
    loading: true,
    error: '',
    data: '',
}

export const getCategories = createAsyncThunk("get-categories", async () => {
    try {
        const data = await Api.get("/api/category/all-categories")
        return data
    }
    catch (error) {
        return error
    }
});

export const createCategory = createAsyncThunk("create-category", async (value) => {
    try {
        const data = await Api.post("/api/category/create", value)
        return data
    }
    catch (error) {
        return error
    }
});

export const deleteCategory = createAsyncThunk("delete-category", async (id) => {
    try {
        const data = await Api.delete(`/api/category/delete/${id}`)
        return data
    }
    catch (error) {
        return error
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    state.data = ''
                }
                else {
                    state.data = action?.payload?.data
                }
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                state.data = ''
            })

            .addCase(createCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(createCategory.fulfilled, (state, action) => {
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
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
            })


            .addCase(deleteCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 2000
                    })
                }
                else {
                    state.data.data = state.data.data.filter(
                        (item) => item.categoryId !== action?.payload?.data?.data
                    );
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false
                toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                    autoClose: 2000
                })
            })
    }
})

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;