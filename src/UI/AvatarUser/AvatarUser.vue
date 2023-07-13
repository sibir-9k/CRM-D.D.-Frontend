<template>
	<img :src="avatarLink" :alt="altName" class="user-item__avatar" />
</template>

<script>
export default {
	name: 'AvatarUser',
	props: {
		pictureUrl: String,
		altName: String,
	},
	computed: {
		avatarLink() {
			return `http://45.12.239.156:8081/${this.pictureUrl}`;
		},
	},
};
</script>

<style></style>
