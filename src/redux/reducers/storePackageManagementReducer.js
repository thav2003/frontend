import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {getStoreDashboardAPI, updatePackageAPI,getAllPackagesAPI } from "../../api/apis";

export const getAllPackages = createAsyncThunk('/package', async () => {
    const response = await getAllPackagesAPI();
    return response?.data?.data
})
export const getDashboard = createAsyncThunk('/store-dasboard', async () => {
    const response = await getStoreDashboardAPI();
    return response?.data?.data
})


export const updatePackageStatus = createAsyncThunk('/update-package-status', async (data) => {
    try {
        await updatePackageAPI(data, 'status')
        toast.success('Đã xác nhận !', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    } catch (e) {
        console.log(e)
    }
})

export const storePackageSlice = createSlice({
    name: 'store-package',
    initialState: {
        allPackages: [],
        dashboard:{},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPackages.fulfilled, (state, action) => {
            state.allPackages = action.payload
        });
        builder.addCase(getDashboard.fulfilled, (state, action) => {
            state.dashboard = action.payload
        });
    },
})


export default storePackageSlice.reducer;