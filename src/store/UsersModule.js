import axios from 'axios';
import { BASE_URL } from '@/api/api.js';

export const mutation = {
	SET_USERS_LIST: 'SET_USERS_LIST',
	SET_USERS_CURRENT_PAGE: 'SET_USERS_CURRENT_PAGE',
	SET_USERS_TOTAL_PAGES: 'SET_USERS_TOTAL_PAGES',
	SET_USERS_FETCHING: 'SET_USERS_FETCHING',
};

export default {
	namespaced: true,

	state: {
		usersArray: [],
		totalPages: null,
		currentPage: 1,
		isFetching: false,
	},
	getters: {
		getAllUsers: (state) => state.usersArray,
		getTotalPages: (state) => state.totalPages,
		getCurrentPage: (state) => state.currentPage,
		getFetching: (state) => state.isFetching,
	},
	mutations: {
		[mutation.SET_USERS_LIST]: (state, payload) => {
			state.usersArray = payload;
		},
		[mutation.SET_USERS_TOTAL_PAGES]: (state, payload) => {
			state.totalPages = payload;
		},
		[mutation.SET_USERS_CURRENT_PAGE]: (state, payload) => {
			state.currentPage = payload;
		},
		[mutation.SET_USERS_FETCHING]: (state, payload) => {
			state.isFetching = payload;
		},
	},
	actions: {
		async getAllUsers(context, objData = { page: 1 }) {
			context.commit(mutation.SET_USERS_FETCHING, true);
			try {
				const response = await axios.post(`${BASE_URL}/users/search`, objData, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				const result = await response.data;
				context.commit(mutation.SET_USERS_FETCHING, false);
				context.commit(mutation.SET_USERS_TOTAL_PAGES, result.total);
				context.commit(mutation.SET_USERS_CURRENT_PAGE, result.page);
				context.commit(mutation.SET_USERS_LIST, response.data.users);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		},
		setCurrentPage(context, page) {
			context.commit(mutation.SET_USERS_CURRENT_PAGE, page);
		},
		async getUsersPicture(context, id) {
			try {
				const formData = new FormData();
				formData.append('picture', File);
				formData.append('_id', id);

				const response = await axios.put(`${BASE_URL}/users/picture`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				const result = await response.data;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
