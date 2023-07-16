<template>
	<div class="create-task">
		<h1 class="create-task__title">Редактирование задачи</h1>
		<hr />
		<FormTask
			v-if="allProjects && allUsers && task"
			:createObjData="task"
			:projectsArray="allProjects"
			:executorsArray="allUsers"
			@updateForm="updateForm"></FormTask>
		<hr />
		<div class="btn-block">
			<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="сlose()"></Button>
			<Button
				btnClassName="btn-create"
				btnName="Сохранить изменения"
				v-on:click="$emit('editTask', data)"></Button>
		</div>
	</div>
</template>

<script>
import Button from '@/UI/Button/Button.vue';
import FormTask from '@/UI/Forms/FormTask/FormTask.vue';
export default {
	name: 'EditTask',
	components: { FormTask, Button },
	props: {
		allUsers: Array,
		allProjects: Array,
		task: Object,
	},
	data() {
		return {
			data: null,
		};
	},
	methods: {
		сlose() {
			this.$router.push('/tasks');
		},
		updateForm(form) {
			this.data = form;
		},
	},
};
</script>
