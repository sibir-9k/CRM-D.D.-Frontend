<template>
	<form class="project-create__form">
		<div class="project-create__form-group">
			<label class="project-create__label" for="name">
				Код
				<div class="required">*</div>
			</label>
			<input
				v-model.trim="projectFormData.code"
				class="project-create__input"
				type="text"
				id="name"
				placeholder="Введите текст..."
				required />
		</div>
		<div class="project-create__form-group">
			<label class="project-create__label" for="name">
				Название
				<div class="required">*</div>
			</label>
			<input
				v-model.trim="projectFormData.name"
				class="project-create__input"
				type="text"
				id="name"
				placeholder="Введите текст..."
				required />
		</div>
	</form>
</template>

<script>
import './style.scss';
export default {
	name: 'FormProject',
	props: {
		projectFormData: {
			type: Object,
			default: () => ({ code: '', name: '' }),
			require: true,
		},
		updateProjectFormData: {
			type: Object,
			require: true,
		},
		project: {
			type: Object,
			require: true,
		},
	},
	created() {
		if (this.project) {
			this.projectFormData.code = this.project.code;
			this.projectFormData.name = this.project.name;
		}
	},

	watch: {
		projectFormData: {
			handler: function (val) {
				this.$emit('updateForm', val);
			},
			deep: true,
		},
	},
};
</script>

<style></style>
