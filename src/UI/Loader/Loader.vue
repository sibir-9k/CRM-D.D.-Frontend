<template>
	<div class="loader">
		<Icon iconName="loading" />
	</div>
</template>

<script>
import Icon from '../Icon/Icon.vue';
export default {
	components: { Icon },
};
</script>

<style lang="scss" scoped>
.loader {
	display: flex;
	align-items: center;
	justify-content: center;
	animation: rotate 1s infinite linear;

  svg{
    width: 40px;
    height: 40px;
  }
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
