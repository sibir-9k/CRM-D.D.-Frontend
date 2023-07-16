<template>
	<div class="container-form">
		<div class="project-create">
			<h2 class="project-create__title">Редактирование проекта</h2>
			<hr />
			<FormProject
				:project="project"
				:updateProjectFormData="updateProjectFormData"
				@updateForm="updateForm"></FormProject>
			<hr />
			<div class="btn-block">
				<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="modalClose"></Button>
				<Button
					btnClassName="btn-create"
					btnName="Сохранить"
					v-on:click="editProject(updateProjectFormData.code, updateProjectFormData.name)"></Button>
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
	name: 'EditProjectModal',
	components: { FormProject, Button },
	props: {
		project: {
			type: Object,
		},
	},
	data() {
		return {
			updateProjectFormData: {
				code: '',
				name: '',
			},
		};
	},
	methods: {
		modalClose() {
			this.$emit('closeModal', this.project._id);
		},
		updateProjectsList() {
			this.$emit('getProjects');
		},
		updateForm(val) {
			this.updateProjectFormData.code = val.code;
			this.updateProjectFormData.name = val.name;
		},
		async editProject(code, name) {
			try {
				const response = await axios.put(
					`${BASE_URL}/projects`,
					{
						_id: `${this.project._id}`,
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
				const result = await response.data;
				console.log(result);
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
