<template>
	<CreateTask
		:allUsers="allUsers"
		:allProjects="allProjects"></CreateTask>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Profile from '@/components/Profile/Profile.vue';
import Navigation from '@/components/Navigation/Navigation.vue';
import CreateTask from '@/components/CreateTask/CreateTask.vue';

export default {
	name: 'ProfileView',
	components: {
		Profile,
		Navigation,
		CreateTask,
	},
	computed: {
		...mapGetters({
			allUsers: 'UsersModule/getAllUsers',
			allProjects: 'ProjectModule/getAllProjects',
		}),
	},
	methods: {
		...mapActions({
			getTasks: 'TaskModule/getTasks',
			getAllUsers: 'UsersModule/getAllUsers',
			getAllProjects: 'ProjectModule/getAllProjects',
		}),
	},
	mounted() {
		this.getAllUsers();
		this.getAllProjects();
	},
};
</script>
