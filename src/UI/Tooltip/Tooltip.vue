<template>
	<div class="tooltip-wrapper">
		<slot />
		<span class="tooltip__text">{{ text }}</span>
	</div>
</template>

<script>
import './style.scss';

export default {
	name: 'Tooltip',
	props: {
		text: {
			type: String,
			required: true,
		},
	},
};
</script>
