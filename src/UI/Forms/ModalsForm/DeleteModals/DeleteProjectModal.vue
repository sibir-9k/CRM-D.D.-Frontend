<template>
	<div>
		<div class="container-form" :class="{ active: modalOpen }">
			<div class="delete-project">
				<h2 class="delete-projet__title">Удаление</h2>
				<hr />
				<div class="delete-project__message">
					Вы уверены что хотите <span>удалить</span> проект "..."?
				</div>
				<hr />
				<div class="btn-block">
					<Button btnClassName="btn-cancel" btnName="Отмена" v-on:click="modalClose"></Button>
					<Button btnClassName="btn-create" btnName="Да"></Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import axios from 'axios';
// import { BASE_URL } from '@/api/api.js';
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
	},
	methods: {
		modalClose() {
			this.$emit('modal-close');
		},
	},
};
</script>
