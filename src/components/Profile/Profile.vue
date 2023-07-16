<template>
	<div class="profile">
		<div class="profile-image">
			<AvatarUser v-if="userData.picture" :pictureUrl="userData.picture" :altName="userData.name" />
			<div v-else class="profile-image__initials">{{ getInitialUsers() }}</div>
		</div>
		<div class="profile-info">
			<div class="profile-info__top">
				<div class="info-top">
					<h1 class="info-top__name">{{ userData.name }}</h1>
					<Status classNameStatus="status" :class="statusClass" :status="statusText"></Status>
				</div>
				<!-- <button class="setting-btn" data-path="task-item">
					<svg>
						<use xlink:href="#dots" />
					</svg>
				</button> -->
				<DropdownButton :dropList="dropList" iconName="dots" classNameBlock="profile-item__setting">
				</DropdownButton>
			</div>
			<div class="profile-info__about">
				<div>О себе:</div>
				<p>
					{{ userData.description }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { initialUsers } from '@/helpers/initials.js';
import Status from '@/UI/Status/Status.vue';
4;

import './style.scss';
import DropdownButton from '@/UI/Dropdown/DropdownButton/DropdownButton.vue';

export default {
	components: { Status, DropdownButton },
	props: {
		userData: Object,
	},
	data() {
		return {
			dropList: [
				{
					type: 'button',
					// props: {
					// 	onClick: () => {
					// 		this.$emit('editModalOpen', this.project);
					// 	},
					// },
					text: 'Редактировать',
				},
				{
					type: 'button',
					// props: {
					// 	onClick: () => {
					// 		this.$emit('deleteModalOpen', this.project);
					// 	},
					// },
					text: 'Изменить пароль',
				},
				{
					type: 'button',
					// props: {
					// 	onClick: () => {
					// 		this.$emit('deleteModalOpen', this.project);
					// 	},
					// },
					text: 'Просмотр задач пользователя ',
				},
			],
		};
	},
	computed: {
		statusClass() {
			const statusClasses = {
				ACTIVE: 'status--done',
				BLOCKED: 'status--close',
				DELETED: 'status--error',
			};

			return statusClasses[this.userData.status] || '';
		},
		statusText() {
			switch (this.userData?.status) {
				case 'ACTIVE':
					return 'Активен';
				case 'BLOCKED':
					return 'Заблокирован';
				case 'DELETED':
					return 'Удален';
				default:
					return '';
			}
		},
	},
	methods: {
		getInitialUsers() {
			return initialUsers(this.userData.name);
		},
	},
};
</script>
