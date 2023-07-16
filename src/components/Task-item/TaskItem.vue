<template>
	<div class="task-item">
		<div class="task-item__container">
			<div class="task-item__block">
				<div class="item-block__header">
					<Tooltip :text="taskItem.description">
						<p class="header-message">
							{{ taskItem.description }}
						</p>
					</Tooltip>
					<div class="header-user-avatar" v-if="taskItem.authorEdit">
						<AvatarUser
							v-if="taskItem.picture"
							:pictureUrl="taskItem.picture"
							:altName="taskItem.name" />
						<div v-else class="user-item__initials">{{ getInitialUsers() }}</div>
					</div>
				</div>
				<div class="item-block__footer">
					<div class="footer-author">
						<Tooltip :text="'#' + taskItem.number"> #{{ taskItem.number }} </Tooltip>
						<span class="footer-author__name">
							{{ nameCreated }} создал {{ formattedDateCreated }}
						</span>
						<Status classNameStatus="status" :class="statusClass" :status="statusText"></Status>
					</div>
					<div class="footer__block-right">
						<div class="footer__editor" v-if="taskItem.authorEdit">
							{{ nameEdit }} изменил {{ formattedDateEdited }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<DropdownButton
			classNameBlock="task-item__setting"
			:dropList="dropList"
			iconName="dots"></DropdownButton>
	</div>
</template>

<script>
import { initialUsers } from '@/helpers/initials.js';
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import { formatDate } from '@/helpers/formatDate.js';
import Status from '@/UI/Status/Status.vue';
import DropdownButton from '@/UI/Dropdown/DropdownButton/DropdownButton.vue';
import Tooltip from '@/UI/Tooltip/Tooltip.vue';
import AvatarUser from '@/UI/AvatarUser/AvatarUser.vue';
import './style.scss';

export default {
	name: 'TaskItem',
	components: { DropdownButton, Status, Tooltip, AvatarUser },
	props: {
		taskItem: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			dropList: [
				{
					type: 'router-link',
					props: { to: `/tasks/${this.taskItem._id}` },
					class: 'edit',
					text: 'Редактировать',
				},
				{
					type: 'button',
					props: {
						onClick: () => {
							this.$emit('deleteModalOpen', this.taskItem);
						},
					},
					class: 'delete',
					text: 'Удалить',
				},
			],
			formattedDateCreated: '',
			formattedDateEdited: '',
			nameEdit: '',
			nameCreated: '',
		};
	},
	computed: {
		statusClass() {
			const statusClasses = {
				DRAFT: 'status--draft',
				IN_PROCESS: 'status--draft',
				TESTING: 'status--draft',
				COMPLETED: 'status--done',
				TESTING_DONE: 'status--done',
				CLOSED: 'status--close',
				DELETED: 'status--error',
			};

			return statusClasses[this.taskItem.status] || '';
		},
		statusText() {
			switch (this.taskItem.status) {
				case 'DRAFT':
					return 'Черновик';
				case 'IN_PROCESS':
					return 'В работе';
				case 'COMPLETED':
					return 'Завершена';
				case 'TESTING':
					return 'Тестирование';
				case 'TESTING_DONE':
					return 'Выполнена';
				case 'CLOSED':
					return 'Закрыта';
				case 'DELETED':
					return 'Удалена';
				default:
					return '';
			}
		},
	},
	methods: {
		getInitialUsers() {
			return initialUsers(this.taskItem.name);
		},
	},
	mounted() {
		const dateCreated = new Date(this.taskItem.dateCreated);
		const dateEdited = this.taskItem.dateEdited ? new Date(this.taskItem.dateEdited) : null;
		const { formattedDate, formattedDateEdited } = formatDate(dateCreated, dateEdited, this.months);

		this.formattedDateCreated = formattedDate;
		this.formattedDateEdited = formattedDateEdited;

		const getUsers = async (idAuthor, idEdited) => {
			try {
				const response = await axios.post(
					`${BASE_URL}/users/search`,
					{
						filter: {
							_id: [idAuthor, idEdited],
						},
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
						},
					}
				);
				const result = await response.data.users;
				if (idAuthor === idEdited) {
					this.nameCreated = await result[0]?.name;
					this.nameEdit = await result[0]?.name;
				} else {
					this.nameCreated = await result[0]?.name;
					this.nameEdit = await result[1]?.name;
				}
			} catch (error) {
				console.log(error);
			}
		};

		getUsers(this.taskItem.author, this.taskItem.authorEdited);
	},
};
</script>
