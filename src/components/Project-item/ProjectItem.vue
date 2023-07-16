<template>
	<div class="project-item">
		<div class="project-item__container">
			<div class="project-item__block">
				<div class="item-block__header">
					<Tooltip :text="project.name">
						<p class="header-message">
							{{ project.name }}
						</p>
					</Tooltip>
				</div>
				<div class="item-block__footer">
					<div class="footer-author">
						<Tooltip :text="'#' + project.code"> #{{ project.code }} </Tooltip>
						<span class="footer-author__name" v-if="project.author">
							{{ users[project.author]?.name }} создал {{ formattedDateCreated }}
						</span>
					</div>
					<div class="footer__block-right">
						<div class="footer__editor">
							<span class="footer-author__name" v-if="project.authorEdited">
								{{ users[project.authorEdited]?.name }} изменил {{ formattedDateEdited }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<DropdownButton :dropList="dropList" iconName="dots" classNameBlock="project-item__setting">
		</DropdownButton>
	</div>
</template>

<script>
import { formatDate } from '@/helpers/formatDate.js';
import FormProject from '@/UI/Forms/FormProject/FormProject.vue';
import DropdownButton from '@/UI/Dropdown/DropdownButton/DropdownButton.vue';
import Tooltip from '@/UI/Tooltip/Tooltip.vue';
import './style.scss';

export default {
	name: 'ProjectItem',
	components: {
		DropdownButton,
		FormProject,
		Tooltip,
	},
	props: {
		project: {
			type: Object,
			required: true,
		},
		users: Object,
	},
	data() {
		return {
			dropList: [
				{
					type: 'button',
					props: {
						onClick: () => {
							this.$emit('editModalOpen', this.project);
						},
					},
					text: 'Редактировать',
				},
				{
					type: 'button',
					props: {
						onClick: () => {
							this.$emit('deleteModalOpen', this.project);
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
	mounted() {
		const dateCreated = new Date(this.project.dateCreated);
		const dateEdited = this.project.dateEdited ? new Date(this.project.dateEdited) : null;
		const { formattedDate, formattedDateEdited } = formatDate(dateCreated, dateEdited, this.months);

		this.formattedDateCreated = formattedDate;
		this.formattedDateEdited = formattedDateEdited;
	},
};
</script>
