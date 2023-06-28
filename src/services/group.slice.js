import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../utils/api'
import { toast } from "react-toastify";

const initialState = {
    loading: true,
    error: '',
    data: '',
}

export const getGroups = createAsyncThunk("get-groups", async () => {
    try {
        const data = await Api.get("/api/group/all-groups")
        return data
    }
    catch (error) {
        return error
    }
});

export const createGroup = createAsyncThunk("create-group", async (value) => {
    try {
        const data = await Api.post("/api/group/create", value)
        return data
    }
    catch (error) {
        return error
    }
});

export const deleteGroup = createAsyncThunk("delete-group", async (id) => {
    try {
        const data = await Api.delete(`/api/group/delete/${id}`)
        return data
    }
    catch (error) {
        return error
    }
});

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state) => {
                state.loading = true
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    state.data = ''
                }
                else {
                    state.data = action?.payload?.data
                }
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                state.data = ''
            })


            .addCase(createGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(createGroup.fulfilled, (state, action) => {
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
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
            })

            .addCase(deleteGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.loading = false
                if (action?.payload?.response?.status >= 400) {
                    state.error = action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message
                    toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                        autoClose: 2000
                    })
                }
                else {
                    state.data.data = state.data.data.filter(
                        (item) => item.groupId !== action?.payload?.data?.data
                    );
                }
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.loading = false
                toast.error(action?.payload?.response?.data?.message ? action?.payload?.response?.data?.message : action?.payload?.message, {
                    autoClose: 2000
                })
            })
    }
})

export const { reset } = groupSlice.actions;
export default groupSlice.reducer;