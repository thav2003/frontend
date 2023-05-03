import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsAPI, getUserIdForBookingPageAPI, submitBookingAPI,getStationLocationAPI } from "../../api/apis";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const getUserInforForBooking = createAsyncThunk('/booking', async (userId) => {
    const response = await getUserIdForBookingPageAPI(userId)
    return response?.data?.data
}) 

export const getProducts = createAsyncThunk('/products', async () => {
    const response = await getProductsAPI()
    return response?.data?.data
})
export const getLocations = createAsyncThunk('/locations', async () => {
    const response = await getStationLocationAPI()
    return response?.data?.data
})

export const submitBooking = createAsyncThunk('/booking', async (data, navigate) => {
    try {
        await submitBookingAPI(data)
        toast.success('Tạo đơn hàng thành công !!', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
        navigate()
        
    } catch (e) {
        console.log(e);
    }
})

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        accountInfors: [],
        products: [],
        locations:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserInforForBooking.fulfilled, (state, action) => {
            state.accountInfors = action.payload
        })

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(getLocations.fulfilled, (state, action) => {
            state.locations = action.payload
        })
    }
})

export default bookingSlice.reducer