<template>
	<div class="input-group">
		<input type="text" class="" placeholder="Text" />
		<button class="btn-clear" type="button">
			<Icon iconName="input-clear"></Icon>
		</button>
		<button class="btn-search" type="button">
			<Icon iconName="input-search"></Icon>
		</button>
	</div>
</template>

<script>
import Icon from '../Icon/Icon.vue';
import './style.scss';

export default {
	name: 'SearchInput',
	components: {
		Icon,
	},
};
</script>

<style></style>
