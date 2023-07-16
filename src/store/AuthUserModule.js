import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import router from '@/router';

export const mutation = {
	SET_USER_TOKEN: 'SET_USER_TOKEN',
	SET_USER_ID: 'SET_USER_ID',
	SET_USER_ERROR: 'SET_USER_ERROR',
	SET_USER_CURRENT_DATA: 'SET_USER_CURRENT_DATA',
};

export default {
	namespaced: true,

	state: {
		userToken: null,
		userId: null,
		isError: false,
		currentUserData: null,
	},
	getters: {
		getUserToken: (state) => state.userToken,
		getUserId: (state) => state.userId,
		getIsError: (state) => state.isError,
		getCurrentUserData: (state) => state.currentUserData,
	},
	mutations: {
		[mutation.SET_USER_TOKEN]: (state, payload) => {
			state.userToken = payload;
		},
		[mutation.SET_USER_ID]: (state, payload) => {
			state.userId = payload;
		},
		[mutation.SET_USER_ERROR]: (state, payload) => {
			state.isError = payload;
		},
		[mutation.SET_USER_CURRENT_DATA]: (state, payload) => {
			state.currentUserData = payload;
		},
	},
	actions: {
		async getTokenUser(context, loginData) {
			try {
				const response = await axios.post(`${BASE_URL}/login`, loginData, {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				context.commit(mutation.SET_USER_TOKEN, response.data.token);
				localStorage.setItem('UserToken', context.getters.getUserToken);
				await context.dispatch('getCurrentUser', response.data.token);
			} catch (error) {
				console.log(error);
				context.commit(mutation.SET_USER_TOKEN, null);
				context.commit(mutation.SET_USER_ID, null);
				context.commit(mutation.SET_USER_ERROR, true);
			}
		},
		async getCurrentUser(context, token) {
			try {
				const response = await axios.get(`${BASE_URL}/users/current`, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${token}`,
					},
				});
        console.log(response.data)
				context.commit(mutation.SET_USER_ID, response.data._id); /// проверить используется где то
				context.commit(mutation.SET_USER_CURRENT_DATA, response.data);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
