<template>
	<div :class="classNameStatus">{{ status }}</div>
</template>

<script>
export default {
	name: 'Status',
	props: ['status', 'classNameStatus'],
};
</script>
