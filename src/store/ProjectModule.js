import axios from 'axios';
import { BASE_URL } from '@/api/api.js';

export const mutation = {
	SET_PROJECTS_LIST: 'SET_PROJECTS_LIST',
	SET_PROJECTS_CURRENT_PAGE: 'SET_PROJECTS_CURRENT_PAGE',
	SET_PROJECTS_TOTAL_PAGES: 'SET_PROJECTS_TOTAL_PAGES',
  SET_PROJECTS_FETCHING: 'SET_PROJECTS_FETCHING'
};

export default {
	namespaced: true,

	state: {
		projectsArray: [],
		totalPages: null,
		currentPage: 1,
		isFetching: false,
	},
	getters: {
		getAllProjects: (state) => state.projectsArray,
		getTotalPages: (state) => state.totalPages,
		getCurrentPage: (state) => state.currentPage,
		getFetching: (state) => state.isFetching,
	},
	mutations: {
		[mutation.SET_PROJECTS_LIST]: (state, payload) => {
			state.projectsArray = payload;
		},
		[mutation.SET_PROJECTS_TOTAL_PAGES]: (state, payload) => {
			state.totalPages = payload;
		},
		[mutation.SET_PROJECTS_CURRENT_PAGE]: (state, payload) => {
			state.currentPage = payload;
		},
		[mutation.SET_PROJECTS_FETCHING]: (state, payload) => {
			state.isFetching = payload;
		},
	},
	actions: {
		async getProjects(context, objData = { page: 1 }) {
		
      context.commit(mutation.SET_PROJECTS_FETCHING, true);

			try {
				if (!objData || !objData.page) {
					throw new Error('Invalid data');
				}
				const response = await axios.post(`${BASE_URL}/projects/search`, objData, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				const result = await response.data;

        context.commit(mutation.SET_PROJECTS_FETCHING, false);

				console.log(result);
				context.commit(mutation.SET_PROJECTS_LIST, result.projects);
				context.commit(mutation.SET_PROJECTS_TOTAL_PAGES, result.total);
				context.commit(mutation.SET_PROJECTS_CURRENT_PAGE, result.page);
			} catch (error) {
				console.log(error);
			}
		},
		setCurrentPage(context, page) {
			context.commit(mutation.SET_PROJECTS_CURRENT_PAGE, page);
		},
	},
};
