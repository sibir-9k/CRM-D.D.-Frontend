<template>
	<div :class="classNameBlock">
		<button
			@click="isOpen = !isOpen"
			:class="classBtn + '' + classNameButton"
			v-click-outside="onClickOutside"
			class="setting-btn"
			data-path="project-item">
			<div v-if="imgUser">
				<AvatarUser
					v-if="currentUserData?.picture"
					:pictureUrl="currentUserData?.picture"
					:altName="currentUserData?.name" />
				<div v-else class="user-item__initials">{{ getInitialUsers() }}</div>
			</div>
			<Icon :iconName="iconName"></Icon>
		</button>
		<DropList :items="dropList" :class="classList" class="setting-drop-down__list"></DropList>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { initialUsers } from '@/helpers/initials.js';
import vClickOutside from 'v-click-outside';
import DropList from '../DropList/DropList.vue';
import Icon from '@/UI/Icon/Icon.vue';
import AvatarUser from '@/UI/AvatarUser/AvatarUser.vue';

export default {
	name: 'DropdownButton',
	components: {
		Icon,
		DropList,
		AvatarUser,
	},
	props: {
		imageName: {
			type: String,
		},
		dropList: {
			type: Array,
		},
		imgUser: {
			type: Boolean,
		},
		iconName: {
			type: String,
		},
		classNameBlock: {
			type: String,
		},
		classNameButton: {
			type: String,
		},
	},
	data() {
		return {
			isOpen: false,
		};
	},
	computed: {
		...mapGetters({
			currentUserData: 'AuthUserModule/getCurrentUserData',
		}),
		classBtn() {
			return this.isOpen ? ' active ' : '';
		},
		classList() {
			return this.isOpen ? 'open' : '';
		},
	},
	methods: {
		onClickOutside() {
			this.isOpen = false;
		},
		getInitialUsers() {
			if (this.currentUserData?.name) return initialUsers(this.currentUserData.name);
		},
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
};
</script>
