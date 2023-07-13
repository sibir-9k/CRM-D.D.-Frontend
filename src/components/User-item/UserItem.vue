<template>
	<div class="user-item">
		<div class="user-item__block">
			<AvatarUser v-if="userData.picture" :pictureUrl="userData.picture" :altName="userData.name" />
			<div v-else class="user-item__initials">{{ getInitialUsers() }}</div>
			<div class="user-item__name">
				{{ userData.name }}
			</div>
		</div>
		<DropdownButton classNameBlock="user-item__setting" iconName="dots"></DropdownButton>
	</div>
</template>

<script>
import { initialUsers } from '@/helpers/initials.js';
import DropdownButton from '@/UI/Dropdown/DropdownButton/DropdownButton.vue';
import AvatarUser from '@/UI/AvatarUser/AvatarUser.vue';
import './style.scss';

export default {
	name: 'UserItem',
	components: {
		DropdownButton,
		AvatarUser,
	},
	props: {
		userData: {
			type: Object,
			required: true,
		},
	},
	methods: {
		getInitialUsers() {
			return initialUsers(this.userData.name);
		},
	},
};
</script>

<style></style>
