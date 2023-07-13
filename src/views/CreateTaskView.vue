<template>
	<div class="home">
    <Navigation></Navigation>
		<CreateTask></CreateTask>
	</div>
</template>

<script>
import Profile from '@/components/Profile/Profile.vue';
import Navigation from '@/components/Navigation/Navigation.vue';
import CreateTask from '@/components/CreateTask/CreateTask.vue';

export default {
	name: 'ProfileView',
	components: {
		Profile,
    Navigation,
CreateTask
	},
};
</script>
