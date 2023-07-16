<template>
	<EditTask
		:task="task"
		:allUsers="allUsers"
		:allProjects="allProjects"
		@editTask="editTask"></EditTask>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import { mapGetters, mapActions } from 'vuex';
import Navigation from '@/components/Navigation/Navigation.vue';
import EditTask from '@/components/EditTask/EditTask.vue';

export default {
	name: 'ProfileView',
	components: {
		Navigation,
		EditTask,
	},
	data() {
		return {
			task: null,
		};
	},
	computed: {
		...mapGetters({
			allUsers: 'UsersModule/getAllUsers',
			allProjects: 'ProjectModule/getAllProjects',
		}),
	},
	methods: {
		...mapActions({
			getAllUsers: 'UsersModule/getAllUsers',
			getAllProjects: 'ProjectModule/getAllProjects',
		}),

		async getTask() {
			try {
				const response = await axios.get(`${BASE_URL}/tasks/${this.$route.params.id}`, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				this.task = response.data;
			} catch (error) {
				console.log(error);
			}
		},

		async editTask(updTask) {
			try {
				await axios.put(`${BASE_URL}/tasks`, updTask, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				this.$router.push('/tasks');
			} catch (error) {
				console.log(error);
			}
		},
	},
	mounted() {
		this.getTask();
		this.getAllUsers();
		this.getAllProjects();
	},
};
</script>
