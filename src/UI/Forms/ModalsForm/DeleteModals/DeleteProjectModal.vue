<template>
	<div>
		<div class="container-form">
			<div class="delete-project">
				<h2 class="delete-project__title">Удаление</h2>
				<hr />
				<div class="delete-project__message">
					Вы уверены что хотите <span>удалить</span> проект "{{ project.name }}"?
				</div>
				<hr />
				<div class="btn-block">
					<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="modalClose"></Button>
					<Button
						btnClassName="btn-create"
						btnName="Да"
						v-on:click="deleteProject(project._id)"></Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import Button from '@/UI/Button/Button.vue';
import './style.scss';

export default {
	name: 'DeleteProjectModal',
	components: {
		Button,
	},
	props: {
		modalOpen: {
			type: Boolean,
		},
		project: {
			type: Object,
		},
	},
	methods: {
		modalClose() {
			this.$emit('closeModal', this.project._id);
		},
		updateProjectsList() {
			this.$emit('getProjects');
		},
		async deleteProject(projectID) {
			try {
				const response = await axios.delete(`${BASE_URL}/projects/${projectID}`, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				const result = await response.data;
				this.updateProjectsList();
				this.modalClose();
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="sass" scoped>
@import url('./style.scss')
</style>
