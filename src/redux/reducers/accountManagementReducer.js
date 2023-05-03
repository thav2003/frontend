import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import {createProductAPI,updateProductAPI,getAdminDashboardAPI, getAccountMngAPI,createAccountAPI,updateAccountAPI,getProductsAPI } from '../../api/apis';


export const getDashboard = createAsyncThunk('/admin-dasboard', async () => {
  const response = await getAdminDashboardAPI();
  return response?.data?.data
})

export const getProducts = createAsyncThunk('/products', async () => {
  const response = await getProductsAPI()
  return response?.data?.data
})

export const createAccount = createAsyncThunk(
    'admin/createAccount',
    async (data, params) => {
      const response = await createAccountAPI(data);
      return response.data;
    }
  );
export const createProduct = createAsyncThunk(
    'admin/createProduct',
    async (data, params) => {
      try {
        const res=await createProductAPI(data)
        toast.success('Đã thêm dịch vụ mới !', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
        return res.data;
      } catch (e) {
          console.log(e)
      }
    }
  );
export const updateAccount = createAsyncThunk(
    'admin/updateAccount',
    async (payload) => {
      const response = await updateAccountAPI(payload,payload.get("id"));
      return response.data;
    }
  );
  export const updatePriceProduct = createAsyncThunk(
    'admin/updatePriceProduct',
    async (data) => {
      try {
        const response = await updateProductAPI(data,'price');
        toast.success('Đã cập nhật giá tiền mới!', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
        return response.data;
      } catch (e) {
          console.log(e)
      }
    }
  );
  export const updateStatusProduct = createAsyncThunk(
    'admin/updateStatusProduct',
    async (data) => {
      try {
        const response = await updateProductAPI(data,'isdeleted');
        toast.success(data.IsDeleted==1 ? 'Đã tạm dừng dịch vụ' : 'Dịch vụ đã mở lại', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
        return response.data;
      } catch (e) {
          console.log(e)
      }
    }
  );
export const accountMngSlice = createSlice({
	name: 'accountMng',
	initialState: {
    currentPage: 1,
    pageSize: 5,
    totalRecords: 0,
    totalPages: 0,
    data: [],
    products:[],
	},
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setTotalPages: (state,action) => {
      // state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      state.totalPages = action.payload;
    },
  },
	extraReducers: (builder) => {
		builder
        .addCase(updateAccount.fulfilled, (state, action) => {
          const index = state.data.findIndex(user => user.id === action.payload.data.id);
          if (index !== -1) {
            state.data[index] = action.payload.data;
          }
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.products = action.payload
        })
        .addCase(updatePriceProduct.fulfilled, (state, action) => {
          const index = state.products.findIndex(product => product.id === action.payload.data.id);
          if (index !== -1) {
            state.products[index] = action.payload.data;
          }
        })
        .addCase(updateStatusProduct.fulfilled, (state, action) => {
          console.log(action)
          const index = state.products.findIndex(product => product.id === action.payload.data.id);
          if (index !== -1) {
            state.products[index] = action.payload.data;
          }
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.products.unshift(action.payload.data);
        })
        .addCase(getDashboard.fulfilled, (state, action) => {
          state.dashboard = action.payload
        })
        ;
    
	},
});
export const { setCurrentPage, setPageSize, setTotalItems, setData, setTotalPages } = accountMngSlice.actions;

export const selectCurrentPage = (state) => state.accountMng.currentPage;
export const selectPageSize = (state) => state.accountMng.pageSize;
export const selectTotalItems = (state) => state.accountMng.totalItems;
export const selectData = (state) => state.accountMng.data;
export const selectTotalPages = (state) => state.accountMng.totalPages;
export const fetchAccounts = (pageSize, pageNumber) => async (dispatch) => {
  try {
    const response = await getAccountMngAPI({pageNumber,pageSize});
        
    dispatch(setTotalItems(response.data.totalRecords));
    dispatch(setData(response?.data?.data));
    dispatch(setTotalPages(response.data.totalPages));
  } catch (error) {
    console.log(error);
  }
};

export default accountMngSlice.reducer;



// export const fetchUsers = createAsyncThunk(
//     'users/fetchUsers',
//     async () => {
//       const response = await getUsersAPI();
//       return response.data;
//     }
//   );
  
//   export const createUser = createAsyncThunk(
//     'users/createUser',
//     async (userData) => {
//       const response = await createUserAPI(userData);
//       return response.data;
//     }
//   );
  
//   export const updateUser = createAsyncThunk(
//     'users/updateUser',
//     async (userData) => {
//       const response = await updateUserAPI(userData);
//       return response.data;
//     }
//   );
  
//   export const deleteUser = createAsyncThunk(
//     'users/deleteUser',
//     async (userId) => {
//       const response = await deleteUserAPI(userId);
//       return response.data;
//     }
//   );
  
//   export const usersSlice = createSlice({
//     name: 'users',
//     initialState: {
//       list: [],
//       isLoading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchUsers.pending, (state) => {
//           state.isLoading = true;
//           state.error = null;
//         })
//         .addCase(fetchUsers.fulfilled, (state, action) => {
//           state.isLoading = false;
//           state.list = action.payload;
//         })
//         .addCase(fetchUsers.rejected, (state, action) => {
//           state.isLoading = false;
//           state.error = action.error.message;
//         })
//         .addCase(createUser.fulfilled, (state, action) => {
//           state.list.push(action.payload);
//         })
//         .addCase(updateUser.fulfilled, (state, action) => {
//           const index = state.list.findIndex(user => user.id === action.payload.id);
//           if (index !== -1) {
//             state.list[index] = action.payload;
//           }
//         })
//         .addCase(deleteUser.fulfilled, (state, action) => {
//           state.list = state.list.filter(user => user.id !== action.payload.id);
//         });
//     },
//   });