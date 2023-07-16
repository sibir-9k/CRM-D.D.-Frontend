import axios from 'axios';
import { BASE_URL } from '@/api/api.js';

export const mutation = {
	SET_PROJECTS_LIST: 'SET_PROJECTS_LIST',
	SET_ALL_PROJECTS_LIST: 'SET_ALL_PROJECTS_LIST',
	SET_PROJECTS_CURRENT_PAGE: 'SET_PROJECTS_CURRENT_PAGE',
	SET_PROJECTS_TOTAL_PAGES: 'SET_PROJECTS_TOTAL_PAGES',
	SET_PROJECTS_FETCHING: 'SET_PROJECTS_FETCHING',
};

export default {
	namespaced: true,

	state: {
		projectsArray: [],
		allProjectsArray: [],
		totalPages: null,
		currentPage: 1,
		isFetching: false,
	},
	getters: {
		getProjects: (state) => state.projectsArray,
		getAllProjects: (state) =>
			state.allProjectsArray.map((project) => {
				return { optionText: project.name, value: project._id };
			}),
		getTotalPages: (state) => state.totalPages,
		getCurrentPage: (state) => state.currentPage,
		getFetching: (state) => state.isFetching,
	},
	mutations: {
		[mutation.SET_PROJECTS_LIST]: (state, payload) => {
			state.projectsArray = payload;
		},
		[mutation.SET_ALL_PROJECTS_LIST]: (state, payload) => {
			state.allProjectsArray = payload;
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
		async getProjects({ commit }, objData = { page: 1 }) {
			commit(mutation.SET_PROJECTS_FETCHING, true);

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
				commit(mutation.SET_PROJECTS_FETCHING, false);
				commit(mutation.SET_PROJECTS_LIST, result.projects);
				commit(mutation.SET_PROJECTS_TOTAL_PAGES, result.total);
				commit(mutation.SET_PROJECTS_CURRENT_PAGE, result.page);
			} catch (error) {
				console.log(error);
			}
		},
		async getAllProjects({ commit }) {
			try {
				const response = await axios.post(
					`${BASE_URL}/projects/search`,
					{
						limit: 99999,
						sort: {
							field: 'name',
							type: 'asc',
						},
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
						},
					}
				);
				const result = await response.data;
				commit(mutation.SET_ALL_PROJECTS_LIST, result.projects);
			} catch (error) {
				console.log(error);
			}
		},
		setCurrentPage({ commit }, page) {
			commit(mutation.SET_PROJECTS_CURRENT_PAGE, page);
		},
	},
};
