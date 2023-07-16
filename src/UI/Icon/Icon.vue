<template>
	<svg>
		<use :xlink:href="nameIcon" />
	</svg>
</template>

<script>
export default {
	name: 'Icon',
	props: {
		iconName: {
			type: String,
		},
	},
	computed: {
		nameIcon() {
			return `#${this.iconName}`;
		},
	},
};
</script>

<style lang="scss" scoped>
svg {
	width: 24px;
	height: 24px;
}
</style>
