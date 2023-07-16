<template>
	<div>
		<div class="container-form">
			<div class="delete-task">
				<h2 class="delete-task__title">Удаление</h2>
				<hr />
				<div class="delete-task__message">
					Вы уверены что хотите <span>удалить</span> задача "{{ task.name }}"?
				</div>
				<hr />
				<div class="btn-block">
					<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="modalClose"></Button>
					<Button btnClassName="btn-create" btnName="Да" v-on:click="deleteTask(task._id)"></Button>
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
	name: 'DeleteTaskModal',
	components: {
		Button,
	},
	props: {
		task: {
			type: Object,
		},
	},
	methods: {
		modalClose() {
			this.$emit('closeModal', this.task._id);
		},
		updateTasksList() {
			this.$emit('getTasks');
		},
		async deleteTask(taskID) {
			try {
				await axios.delete(`${BASE_URL}/tasks/${taskID}`, {
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
					},
				});
				this.updateTasksList();
				this.modalClose();
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
