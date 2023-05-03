import Axios from 'axios';

const BASE_PATH = 'https://api.giangpt.dev/api';

export default {
	get: (url) => {
		return Axios({
			url: `${BASE_PATH}/${url}`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('TOKEN'),
			},
		});
	},

	put: (url, data, headerProps) => {
		const headers = headerProps || {};
		return Axios({
			url: `${BASE_PATH}/${url}`,
			method: 'PUT',
			data: data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('TOKEN'),
				...headers,
			},
		});
	},

	// putFormData: (url, data) => {
	// 	const formData = new FormData();
	// 	for (const [key, value] of Object.entries(data)) {
	// 		formData.append(`${key}`, `${value}`);
	// 	}

	// 	return Axios({
	// 		url: `${BASE_PATH}/${url}`,
	// 		method: 'PUT',
	// 		data: formData,
	// 		headers: {
	// 			Authorization: 'Bearer ' + localStorage.getItem('TOKEN'),
	// 			'Content-Type': 'multipart/form-data',
	// 		},
	// 	});
	// },

	post: (url, data) => {
		return Axios({
			url: `${BASE_PATH}/${url}`,
			method: 'POST',
			data: data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('TOKEN'),
			},
		});
	},

	postWithoutToken: (url, data) => {
		return Axios({
			url: `${BASE_PATH}/${url}`,
			method: 'POST',
			data: data,
		});
	},

	delete: (url) => {
		return Axios({
			url: `${BASE_PATH}/${url}`,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('TOKEN'),
			},
		});
	},
};
