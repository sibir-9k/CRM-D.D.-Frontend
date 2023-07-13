<template>
	<div class="home">
		<Navigation></Navigation>
		<EditTask></EditTask>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import EditTask from '@/components/EditTask/EditTask.vue';

export default {
	name: 'ProfileView',
	components: {
		Navigation,
		EditTask,
	},
};
</script>
