<template>
	<div class="container">
		<NotFound></NotFound>
	</div>
</template>

<script>
import NotFound from '@/components/NotFound/NotFound.vue';

export default {
	name: 'ProfileView',
	components: {
		NotFound,
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
