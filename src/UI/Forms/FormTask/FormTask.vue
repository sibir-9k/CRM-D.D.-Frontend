<template>
	<form class="create-task__form">
		<div class="create-task__form-group">
			<label class="create-task__label" for="name"
				>Название
				<div class="required">*</div></label
			>
			<input
				v-model.trim="model.name"
				class="create-task__input"
				type="text"
				id="name"
				placeholder="Введите текст..."
				required />
		</div>
		<div class="create-task__form-group">
			<label class="create-task__label">Описание</label>
			<textarea
				v-model.trim="model.description"
				class="create-task__textarea"
				placeholder="Введите текст..." />
		</div>
		<div class="create-task__form-group">
			<label class="create-task__label"
				>Проект
				<div class="required">*</div></label
			>
			<Select
				v-model="model.project"
				className="create-task__select"
				:options="projectsArray"
				required></Select>
		</div>
		<div class="create-task__form-group">
			<label class="create-task__label">Исполнитель</label>
			<Select
				v-model="model.executor"
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
		model: Object,
		projectsArray: Array,
		executorsArray: Array,
	},
};
</script>

<style></style>
