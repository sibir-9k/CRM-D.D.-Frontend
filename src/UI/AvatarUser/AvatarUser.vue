<template>
	<img :src="avatarLink" :alt="altName" class="user-item__avatar" />
</template>

<script>
import { BASE_URL_PICTURE } from '@/api/api.js';
export default {
	name: 'AvatarUser',
	props: {
		pictureUrl: String,
		altName: String,
	},
	computed: {
		avatarLink() {
			return `${BASE_URL_PICTURE}/${this.pictureUrl}`;
		},
	},
};
</script>

<style></style>
