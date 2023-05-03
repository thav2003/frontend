import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import {
	getOrderMngAPI,
	getFreeShipperAPI,
	changeShipperAPI,
	updateOrderAPI
} from '../../api/apis';

export const getOrderMng = createAsyncThunk('/order-management', async () => {
	const response = await getOrderMngAPI();
	return response?.data?.data;
});

export const updateOrderStatus = createAsyncThunk('/update-order-status', async (data) => {
    try {
        await updateOrderAPI(data, 'status')
        toast.success('Đã xác nhận hàng !', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    } catch (e) {
        console.log(e)
    }
})

export const getFreeShipper = createAsyncThunk('/free-shipper', async () => {
	const response = await getFreeShipperAPI();
	return response?.data?.data;
});

export const changeShipper = createAsyncThunk(
	'/change-shipper',
	async (data) => {
		try {
			await changeShipperAPI(data);
			toast.success('Đã thay đổi shipper thành công', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		} catch (e) {
			console.log(e);
		}
	}
);

export const orderMngSlice = createSlice({
	name: 'orderMng',
	initialState: {
		orderManagementDetails: [],
		freeShippersList: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getOrderMng.fulfilled, (state, action) => {
			// fulfil
			state.orderManagementDetails = action.payload;
		});

		builder.addCase(getFreeShipper.fulfilled, (state, action) => {
			state.freeShippersList = action.payload;
		});
	},
});

export default orderMngSlice.reducer;
