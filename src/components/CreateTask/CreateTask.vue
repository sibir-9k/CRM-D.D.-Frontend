<template>
	<div class="create-task">
		<h1 class="create-task__title">Создание задачи</h1>
		<hr />
		<FormTask
			:model="createObjData"
			:projectsArray="allProjects"
			:executorsArray="allUsers"
			@change="updIsFormValid"></FormTask>
		<hr />
		<div class="btn-block">
			<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="modalClose"></Button>
			<Button
				btnClassName="btn-create"
				btnName="Создать задачу"
				v-on:click="createTask(createObjData)"
				:disabled="!isFormValid"></Button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import Button from '@/UI/Button/Button.vue';
import FormTask from '@/UI/Forms/FormTask/FormTask.vue';
import './style.scss';

export default {
	name: 'CreateTask',
	components: { Button, FormTask },
	props: {
		allUsers: Array,
		allProjects: Array,
	},
	data() {
		return {
			createObjData: {
				name: '',
				description: '',
				projectId: '',
				executor: '',
			},
			isFormValid: false,
		};
	},
	methods: {
		modalClose() {
			this.$emit('modal-close');
		},
		updateTaskList() {
			this.$emit('getTasks');
		},
		async createTask(createObjData) {
			try {
				const response = await axios.post(`${BASE_URL}/tasks`, createObjData, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				const result = response.data;
				this.updateTaskList();
				this.modalClose();
        this.$router.push('/tasks')
				this.createObjData = {
					name: '',
					description: '',
					projectId: '',
					executor: '',
				};
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		},
		updIsFormValid() {
			this.isFormValid =
				!!this.createObjData.name && !!this.createObjData.projectId && !!this.createObjData.executor;
		},
	},
};
</script>

<style></style>
