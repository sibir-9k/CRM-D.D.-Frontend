<template>
	<div class="container-form">
		<div class="project-create">
			<h2 class="project-create__title">Создание проекта</h2>
			<hr />
			<FormProject :projectFormData="projectFormData" @updateForm="updateForm"></FormProject>
			<hr />
			<div class="btn-block">
				<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="modalClose"></Button>
				<Button
					btnClassName="btn-create"
					btnName="Создать задачу"
					v-on:click="createProject(projectFormData.code, projectFormData.name)"></Button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import FormProject from '@/UI/Forms/FormProject/FormProject.vue';
import Button from '@/UI/Button/Button.vue';

export default {
	name: 'CreateProjectModal',
	components: { FormProject, Button },
	data() {
		return {
			projectFormData: {
				code: '',
				name: '',
			},
		};
	},
	methods: {
		modalClose() {
			this.$emit('modal-close');
		},
		updateProjectsList() {
			this.$emit('getProjects');
		},
		updateForm(val) {
			this.projectFormData.code = val.code;
			this.projectFormData.name = val.name;
		},
		async createProject(code, name) {
			try {
				await axios.post(
					`${BASE_URL}/projects`,
					{
						name: `${name}`,
						code: `${code}`,
					},
					{
						headers: {
							'Content-Type': 'application/json; charset=utf-8',
							Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
						},
					}
				);
				this.updateProjectsList();
				this.modalClose();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>
