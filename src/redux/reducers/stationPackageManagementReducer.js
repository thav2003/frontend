import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllStoreAPI,updatePackageAPI,assignShipperAPI, getStationDashboardAPI,createPackageAPI, getAllPackagesByStatusIdAPI, getAllOrdersByStatusIdAPI, getAllPackagesAPI } from "../../api/apis";

export const getDashboard = createAsyncThunk('/station-dasboard', async () => {
    const response = await getStationDashboardAPI();
    return response?.data?.data
})

export const getAllStores = createAsyncThunk('/stores', async () => {
    const response = await getAllStoreAPI();
    return response?.data?.data
})
export const getAllPackages = createAsyncThunk('/package', async () => {
    const response = await getAllPackagesAPI();
    return response?.data?.data
})

export const getAllOrdersByStatusId = createAsyncThunk('/order-by-status-id', async (statusId) => {
    const response = await getAllOrdersByStatusIdAPI(statusId)
    return response?.data?.data
})

export const getAllPackagesByStatusId = createAsyncThunk('/package-by-status-id', async (statusId) => {
    const response = await getAllPackagesByStatusIdAPI(statusId)
    return response?.data?.data
})

export const createPackage = createAsyncThunk('/create-package', async (data) => {
    try {
        await createPackageAPI(data)
        toast.success('Tạo kiện hàng thành công !!', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    } catch (e) {
        console.log(e);
    }
})

export const assignShipper = createAsyncThunk('/assign-shipper', async (data) => {
    try {
        await assignShipperAPI(data, 'shipperId')
        toast.success('Đã chỉ định shipper mới!', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    } catch (e) {
        console.log(e)
    }
})

export const updatePackageStore = createAsyncThunk('/update-package-store', async (data) => {
    try {
        await updatePackageAPI(data, 'storeid')
        toast.success('Đã xác nhận hàng !', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    } catch (e) {
        console.log(e)
    }
})

export const confirmPackage = createAsyncThunk('/confirm-package', async (data) => {
    try {
        await assignShipperAPI(data, 'status')
      
    } catch (e) {
        console.log(e)
    }
})

export const stationPackageSlice = createSlice({
    name: 'station-package',
    initialState: {
        allPackages: [],
        allOrdersByStatus: [],
        freeShippersList: [],
        allPackagesByStatus:[],
        historyMode:1,
        dashboard:{},
        stores:[],
    },
    reducers: {
        setPackageStatus: (state, action) => {
            state.packageStatus = action.payload;
        },
        setHistoryMode: (state, action) => {
            state.historyMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPackages.fulfilled, (state, action) => {
            state.allPackages = action.payload
        })

        builder.addCase(getAllOrdersByStatusId.fulfilled, (state, action) => {
            state.allOrdersByStatus = action.payload
        });

        builder.addCase(getAllPackagesByStatusId.fulfilled, (state, action) => {
            state.allPackagesByStatus = action.payload
        });
        builder.addCase(getDashboard.fulfilled, (state, action) => {
            state.dashboard = action.payload
        })
        builder.addCase(getAllStores.fulfilled, (state, action) => {
            state.stores = action.payload
        })
    },
})

export const { setPackageStatus,setHistoryMode } = stationPackageSlice.actions;

export default stationPackageSlice.reducer;