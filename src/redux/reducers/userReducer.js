import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { loginAPI, registerAPI,getOrdersAPI,updateUserAPI } from '../../api/apis';
import { ROLE } from '../../utils/Constant';

export const login = createAsyncThunk('user/login', async (data) => {
	try {
		const result = await loginAPI(data);

		const { token, email, fullName, role, id } = result.data.data;
		localStorage.setItem('TOKEN', token);
		localStorage.setItem('EMAIL', email);
		localStorage.setItem('FULLNAME', fullName);
		localStorage.setItem('ROLE', ROLE[role]);
		localStorage.setItem('ACCOUNT_ID', id);
		return result.data.data;
	} catch (e) {
		toast.error(e.response.data.error, {
			position: toast.POSITION.BOTTOM_RIGHT,
		});
	}
});

export const register = createAsyncThunk(
    'user/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await registerAPI(data);
			console.log(response)
            const { succeeded } = response?.data;
			if(succeeded){
				return response?.data;
			}
           
        } catch (e) {
            const { error } = e.response.data;
            return rejectWithValue(error); // trả về error để xử lý trong rejected handler
        }
    }
);

export const getOrders = createAsyncThunk(
	'user/orders',
	async (data, params) => {
		const response = await getOrdersAPI();
		return response.data.data; 
	}
);

export const updateUser = createAsyncThunk(
	'user/update',
	async (data) => {
		try {
			await updateUserAPI(data,"fullname,photo,address,phone");
			toast.success('Đã cập nhật thành công', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		} catch (e) {
			console.log(e);
		}
	}
);
export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id:0,
		fullName: '',
		email:'',
		role: '',
		token:'',
		isLogin:false,
		orders:[],
	},
	reducers: {
		logout: (state, action) => {
			state.id=0;
			state.fullName= '';
			state.email='';
			state.role= '';
			state.token='';
			state.isLogin=false;
			state.orders=[];
			localStorage.clear()
		},
	},
	extraReducers: (builder) => {
		builder.addCase(register.fulfilled, (state, action) => {
			console.log(action.payload);
			toast.success('Đăng ký thành công!', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		});
		builder.addCase(register.rejected, (state, action) => {
			console.log(action.payload); // log ra error để debug
			toast.error(action.payload || 'Đăng ký không thành công!', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		});
		builder.addCase(getOrders.fulfilled, (state, action) => {
			state.orders=action.payload
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.id=action.payload?.id;
			state.fullName=action.payload?.fullName;
			state.email=action.payload?.email;
			state.role=ROLE[action.payload?.role];
			state.token=action.payload?.token;
			state.isLogin=true;
		});
	},
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
