import axios from 'axios';
import { BASE_URL } from '@/api/api.js';

export const mutation = {
	SET_TASKS_LIST: 'SET_TASKS_LIST',
	SET_ALL_TASKS_LIST: 'SET_ALL_TASKS_LIST',
	SET_TASKS_CURRENT_PAGE: 'SET_TASKS_CURRENT_PAGE',
	SET_TASKS_TOTAL_PAGES: 'SET_TASKS_TOTAL_PAGES',
	SET_TASKS_FETCHING: 'SET_TASKS_FETCHING',
};

export default {
	namespaced: true,

	state: {
		tasksArray: [],
		allTasksArray: [],
		totalPages: null,
		currentPage: 1,
		isFetching: false,
	},
	getters: {
		getTasks: (state) => state.tasksArray,
		getAllTasks: (state) =>
			state.allTasksArray.map((task) => {
				return {
					name: task.name,
					description: task.description,
					executor: task.executor,
					projectId: task.projectId,
					_id: task._id,
				};
			}),
		getTotalPages: (state) => state.totalPages,
		getCurrentPage: (state) => state.currentPage,
		getFetching: (state) => state.isFetching,
	},
	mutations: {
		[mutation.SET_TASKS_LIST]: (state, payload) => {
			state.tasksArray = payload;
		},
		[mutation.SET_ALL_TASKS_LIST]: (state, payload) => {
			state.allTasksArray = payload;
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
		async getTasks({ commit }, objData = { page: 1 }) {
			commit(mutation.SET_TASKS_FETCHING, true);
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
				commit(mutation.SET_TASKS_FETCHING, false);
				commit(mutation.SET_TASKS_LIST, result.tasks);
				commit(mutation.SET_TASKS_TOTAL_PAGES, result.total);
				commit(mutation.SET_TASKS_CURRENT_PAGE, result.page);
			} catch (error) {
				console.log(error);
			}
		},
		setCurrentPage({commit}, page) {
			commit(mutation.SET_TASKS_CURRENT_PAGE, page);
		},
	},
};
