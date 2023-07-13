import axios from 'axios';
import { BASE_URL } from '@/api/api.js';

export const mutation = {
	SET_TASKS_LIST: 'SET_TASKS_LIST',
	SET_TASKS_CURRENT_PAGE: 'SET_TASKS_CURRENT_PAGE',
	SET_TASKS_TOTAL_PAGES: 'SET_TASKS_TOTAL_PAGES',
	SET_TASKS_FETCHING: 'SET_TASKS_FETCHING',
};

export default {
	namespaced: true,

	state: {
		tasksArray: [],
		totalPages: null,
		currentPage: 1,
		isFetching: false,
	},
	getters: {
		getAllTasks: (state) => state.tasksArray,
		getTotalPages: (state) => state.totalPages,
		getCurrentPage: (state) => state.currentPage,
		getFetching: (state) => state.isFetching,
	},
	mutations: {
		[mutation.SET_TASKS_LIST]: (state, payload) => {
			state.tasksArray = payload;
		},
		[mutation.SET_TASKS_TOTAL_PAGES]: (state, payload) => {
			state.totalPages = payload;
		},
		[mutation.SET_TASKS_CURRENT_PAGE]: (state, payload) => {
			state.currentPage = payload;
		},
		[mutation.SET_TASKS_FETCHING]: (state, payload) => {
			state.isFetching = payload;
		},
	},
	actions: {
		async getTasks(context, objData = { page: 1 }) {
			context.commit(mutation.SET_TASKS_FETCHING, true);
			try {
				if (!objData || !objData.page) {
					throw new Error('Invalid data');
				}
				const response = await axios.post(`${BASE_URL}/tasks/search`, objData, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				const result = await response.data;
				context.commit(mutation.SET_TASKS_FETCHING, false);
				console.log(result);
				context.commit(mutation.SET_TASKS_LIST, result.tasks);
				context.commit(mutation.SET_TASKS_TOTAL_PAGES, result.total);
				context.commit(mutation.SET_TASKS_CURRENT_PAGE, result.page);
			} catch (error) {
				console.log(error);
			}
		},
		setCurrentPage(context, page) {
			context.commit(mutation.SET_TASKS_CURRENT_PAGE, page);
		},
	},
};
