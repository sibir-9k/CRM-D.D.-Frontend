<template>
	<div :class="classNameStatus">{{ status }}</div>
</template>

<script>
export default {
	name: 'Status',
	props: ['status', 'classNameStatus'],
};
</script>

<style lang="scss" scoped>
@import '../../colors.scss';

.status--draft,
.status--done,
.status--error,
.status--close {
	border-radius: 4px;
	padding: 2px 4px;
	color: $font-color-secondary;
	margin-left: 16px;
}
.status--draft {
	background: $border-color-bronze;
}

.status--done {
	background: $bg-primary-default;
}
.status--error {
	background: $border-color-error;
}
.status--close {
	background: $font-color-disabled;
}
</style>
