<template>
	<svg>
		<use :xlink:href="nameIcon" />
	</svg>
</template>

<script>
import '@/assets/svg/404.svg';
import '@/assets/svg/arrow-down.svg';
import '@/assets/svg/dots.svg';
import '@/assets/svg/eye-close.svg';
import '@/assets/svg/eye-open.svg';
import '@/assets/svg/filter-arrow-up.svg';
import '@/assets/svg/input-clear.svg';
import '@/assets/svg/input-search.svg';
import '@/assets/svg/pagination-arrow-left.svg';
import '@/assets/svg/pagination-arrow-rigth.svg';
import '@/assets/svg/loading.svg';

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

<style></style>
