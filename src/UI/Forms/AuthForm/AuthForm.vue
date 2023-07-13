<template>
	<form class="auth-block__form">
		<div class="auth-form__login">
			<label for="login">Логин*</label>
			<input
				type="text"
				name="login"
				id="login"
				v-model.trim="loginData.login"
				@input="toggleErrorMessage" />
		</div>
		<div class="auth-form__password">
			<label for="password">Пароль*</label>
			<input
				:type="isClose ? 'password' : 'text'"
				name="password"
				v-model.trim="loginData.password"
				@input="toggleErrorMessage" />
			<button @click.prevent="toggleBtnEye">
				<Icon :iconName="toggleEye"></Icon>
			</button>
		</div>
	</form>
</template>

<script>
import Icon from '@/UI/Icon/Icon.vue';

export default {
	name: 'AuthForm',
	components: {
		Icon,
	},
	props: {
		loginData: Object,
		toggleEye: String,
		isClose: Boolean,
	},
	computed: {
		toggleBtnEye() {
			return () => this.$emit('toggleIsClose');
		},
		toggleErrorMessage() {
			return () => this.$emit('resetError');
		},
	},
};
</script>
