<template>
	<div class="home">
		<Navigation></Navigation>
		<CreateTask
			:allUsers="allUsers"
			:allProjects="allProjects"
			@modal-close="modalClose"
			@getTasks="getTasks"></CreateTask>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
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
	data() {
		return {
			modalOpen: false,
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
			getTasks: 'TaskModule/getTasks',
			getAllUsers: 'UsersModule/getAllUsers',
			getAllProjects: 'ProjectModule/getAllProjects',
		}),
		modalClose() {
			this.modalOpen = false;
		},
	},
	mounted() {
		this.getAllUsers();
		this.getAllProjects();
	},
};
</script>
