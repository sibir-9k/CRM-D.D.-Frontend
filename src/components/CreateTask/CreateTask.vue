<template>
	<div class="create-task">
		<h1 class="create-task__title">Создание задачи</h1>
		<hr />
		<FormTask
			v-if="allUsers && allProjects"
			:createObjData="createObjData"
			:projectsArray="allProjects"
			:executorsArray="allUsers"
			@change="updIsFormValid"></FormTask>
		<Loader v-else></Loader>
		<hr />
		<div class="btn-block">
			<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="сlose()"></Button>
			<Button
				btnClassName="btn-create"
				btnName="Создать задачу"
				v-on:click="createTask(createObjData)"
				:disabled="!isFormValid"></Button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import Button from '@/UI/Button/Button.vue';
import FormTask from '@/UI/Forms/FormTask/FormTask.vue';
import './style.scss';
import Loader from '@/UI/Loader/Loader.vue';

export default {
	name: 'CreateTask',
	components: { Button, FormTask, Loader },
	props: {
		allUsers: Array,
		allProjects: Array,
	},
	data() {
		return {
			createObjData: {
				name: '',
				description: '',
				projectId: null,
				executor: null,
			},
			isFormValid: false,
		};
	},
	computed: {
		...mapGetters({
			userId: 'AuthUserModule/getUserId',
		}),
	},
	methods: {
		сlose() {
			this.$router.push('/tasks');
		},
		async createTask(createObjData) {
			try {
				await axios.post(`${BASE_URL}/tasks`, createObjData, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				this.$router.push('/tasks');
			} catch (error) {
				console.log(error);
			}
		},
		updIsFormValid() {
			this.isFormValid =
				!!this.createObjData.name &&
				!!this.createObjData.projectId &&
				!!this.createObjData.executor;
		},
	},
	mounted() {
		this.createObjData.executor = this.userId;
	},
};
</script>
