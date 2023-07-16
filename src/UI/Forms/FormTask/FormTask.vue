<template>
	<form class="create-task__form" @input="$emit('change')">
		<div class="create-task__form-group">
			<label class="create-task__label" for="name"
				>Название
				<div class="required">*</div></label
			>
			<input
				v-model.trim="createObjData.name"
				class="create-task__input"
				type="text"
				id="name"
				placeholder="Введите текст..."
				required />
		</div>
		<div class="create-task__form-group">
			<label class="create-task__label two">Описание</label>
			<textarea
				v-model.trim="createObjData.description"
				class="create-task__textarea"
				placeholder="Введите текст..." />
		</div>
		<div class="create-task__form-group">
			<label class="create-task__label"
				>Проект
				<div class="required">*</div></label
			>
			<Select
				v-model="createObjData.projectId"
				className="create-task__select"
				:options="projectsArray"
				required></Select>
		</div>
		<div class="create-task__form-group">
			<label class="create-task__label">Исполнитель</label>
			<Select
				v-model="createObjData.executor"
				className="create-task__select"
				:options="executorsArray"></Select>
		</div>
	</form>
</template>

<script>
import Select from '@/UI/Select/Select.vue';
export default {
	name: 'FormTask',
	components: { Select },
	props: {
		createObjData: Object,
		projectsArray: Array,
		executorsArray: Array,
	},
	data() {
		return {
			data: null,
		};
	},
	watch: {
		data: {
			handler: function (val) {
				this.$emit('updateForm', val);
			},
			deep: true,
		},
	},
	mounted() {
		this.data = this.createObjData;
	},
};
</script>

<style></style>
