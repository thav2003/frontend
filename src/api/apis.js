import axiosClient from './axiosClient';

const APIs_URL = {
	// Auth
	LOGIN: 'Auth/login',
	REGISTER: 'Auth/register',
	AUTH_USER:(id)=> `Auth/user/${id}`,
	AUTH_RS_LINK: `Auth/reset-password-link`,
	AUTH_RS: `Auth/reset-password`,

	// Order
	ORDER: `Order`,
	ORDER_CHANGE_SHIPPER: `Order?filter=shipperid`,
	UPDATE_ORDER: (filterParam) =>`Order?filter=${filterParam}`, 
	ORDER_BY_STATUS: (statusId) => `Order?status=${statusId}`,

	// Users
	USERS_UPDATE:(filterParam)=>`Users?filter=${filterParam}`,
	USERS: (pageNumber, pageSize) =>
		`Users?PageNumber=${pageNumber}&PageSize=${pageSize}`,
	USERS_BY_ID: (id) => `Users/${id}`,
	USERS_UPDATE_PWD: 'Users/update-password',
	USERS_UPDATE_AVATAR: 'Users/update-avatar',
	USERS_GET_ORDERS:'Users/get-orders',

	// Product
	PRODUCT: 'Product',
	UPDATE_PRODUCT: (filterParam) =>`Product?filter=${filterParam}`, 

	//Package
	PACKAGE: `Package`,
	CREATE_PACKAGE: `Package`,
	UPDATE_PACKAGE: (filterParam) =>`Package?filter=${filterParam}`, 
	PACKAGE_BY_STATUS: (statusId) => `Package?status=${statusId}`,

	// Shipper
	SHIPPER: 'Shipper',
	FREE_SHIPPER: 'Shipper/free',

	// Admin
	ADMIN_CREATE_ACCOUNT: `Admin/create`,
	ADMIN_UPDATE_ACCOUNT: (id) => `Admin/update-account/${id}?filter=isdeleted`,
	ADMIN_DASHBOARD:'Admin/admin-dashboard',
	// Store
	STORE: 'Store',
	STORE_OWN_BY_USER: (id) => `Store/own-store`,
	STORE_DASHBOARD: 'Store/store-dashboard',
	UPDATE_STATUS:'Store?filter=isdeleted',
	// Station
	STATION_DASHBOARD:'Station/station-dashboard',
	STATION_LOCATION:'Station/location'
};

export const updateStoreAPI = async (data)=>{
	const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.UPDATE_STATUS, formData, {
			'Content-Type': 'multipart/form-data',
		});
}
export const getAllStoreAPI = async ()=>{
	return await axiosClient.get(APIs_URL.STORE);
}

export const updatePasswordAPI =async (data)=>{
	return await axiosClient.post(APIs_URL.USERS_UPDATE_PWD,data);
}
export const ResetPasswordLinkAPI = async (data) => {
	return await axiosClient.post(APIs_URL.AUTH_RS_LINK,data);
};
export const ResetPasswordAPI = async (data) => {
	return await axiosClient.post(APIs_URL.AUTH_RS,data);
};
export const getAuthUserAPI = async (id) => {
	return await axiosClient.get(APIs_URL.AUTH_USER(id));
};
export const getStoreDashboardAPI = async () => {

	return await axiosClient.get(APIs_URL.STORE_DASHBOARD);

};
export const getStationDashboardAPI = async () => {

	return await axiosClient.get(APIs_URL.STATION_DASHBOARD);

};
export const getAdminDashboardAPI = async () => {

	return await axiosClient.get(APIs_URL.ADMIN_DASHBOARD);

};
export const updateUserAPI = async (data,type) => {
	try {
		return await axiosClient.put(APIs_URL.USERS_UPDATE(type), data, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
}; 
export const createProductAPI = async (data) => {

	return await axiosClient.post(APIs_URL.PRODUCT, data);

};
export const updateProductAPI = async (data,type) => {
	try {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.UPDATE_PRODUCT(type), formData, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
	

};
const handleApiError = (error) => {
	console.error('API_ERR_RESULT', error);
	if (error.response.status === 401 || error.response.status === 403) {
		window.location = '/login';
		localStorage.removeItem('TOKEN');
		localStorage.removeItem('ROLE');
		localStorage.removeItem('EMAIL');
		localStorage.removeItem('FULLNAME');
	}

	return error;
};


export const updatePackageAPI = async (data, type) => {
	try {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.UPDATE_PACKAGE(type), formData, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
};

export const updateOrderAPI = async (data, type) => {
	try {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.UPDATE_ORDER(type), formData, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
};

export const getStoreByIdAPI= async () => {
	return await axiosClient.get(APIs_URL.STORE_OWN_BY_USER());
};

export const getOrdersAPI= async () => {
	return await axiosClient.get(APIs_URL.USERS_GET_ORDERS);
};

export const changeShipperAPI = async (data) => {
	try {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.ORDER_CHANGE_SHIPPER, formData, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
};


// Login & Register
export const loginAPI = async (data) => {
	return await axiosClient.postWithoutToken(APIs_URL.LOGIN, data);
};

export const registerAPI = async (data) => {
	return await axiosClient.postWithoutToken(APIs_URL.REGISTER, data);
};

// Station Order Management
export const getOrderMngAPI = async () => {
	try {
		return await axiosClient.get(APIs_URL.ORDER);
	} catch (e) {
		return handleApiError(e);
	}
};

export const getFreeShipperAPI = async () => {
	try {
		return await axiosClient.get(APIs_URL.FREE_SHIPPER);
	} catch (e) {
		return handleApiError(e);
	}
};


// Account Management
export const getAccountMngAPI = async ({ pageNumber, pageSize }) => {
	try {
		return await axiosClient.get(APIs_URL.USERS(pageNumber, pageSize));
	} catch (e) {
		return handleApiError(e);
	}
};

export const createAccountAPI = async (data) => {
	try {
		return await axiosClient.post(APIs_URL.ADMIN_CREATE_ACCOUNT, data);
	} catch (e) {
		return handleApiError(e);
	}
};

export const updateAccountAPI = async (data, params) => {
	try {
		return await axiosClient.put(APIs_URL.ADMIN_UPDATE_ACCOUNT(params), data);
	} catch (e) {
		return handleApiError(e);
	}
};

// Booking
export const getUserIdForBookingPageAPI = async (userId) => {
	return await axiosClient.get(APIs_URL.USERS_BY_ID(userId));
};

export const getProductsAPI = async () => {
	return await axiosClient.get(APIs_URL.PRODUCT);
};

export const getStationLocationAPI = async () =>{
	return await axiosClient.get(APIs_URL.STATION_LOCATION);
}

export const submitBookingAPI = async (data) => {
	return await axiosClient.post(APIs_URL.ORDER, data);
};

// Package
export const getAllPackagesAPI = async () => {
	return await axiosClient.get(APIs_URL.PACKAGE);
}

export const getAllPackagesByStatusIdAPI = async (statusId) => {
	return await axiosClient.get(APIs_URL.PACKAGE_BY_STATUS(statusId))
}

export const getAllOrdersByStatusIdAPI = async (statusId) => {
	return await axiosClient.get(APIs_URL.ORDER_BY_STATUS(statusId))
}

export const createPackageAPI = async (data) => {
	return await axiosClient.post(APIs_URL.CREATE_PACKAGE, data)
}

export const assignShipperAPI = async (data, type) => {
	try {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.UPDATE_PACKAGE(type), formData, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
};

export const confirmPackageAPI = async (data, type) => {
	try {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(`${key}`, `${value}`);
		}

		return await axiosClient.put(APIs_URL.UPDATE_PACKAGE(type), formData, {
			'Content-Type': 'multipart/form-data',
		});
	} catch (e) {
		return handleApiError(e);
	}
};
