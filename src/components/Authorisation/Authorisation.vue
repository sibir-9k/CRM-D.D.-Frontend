<template>
	<div class="auth-block">
		<div class="auth-block__top">
			<h2 class="auth-top__title">Вход</h2>
		</div>
		<span v-show="userError" class="error">Неправильный логин или пароль.</span>
		<AuthForm
			:loginData="loginData"
			:toggleEye="openEye"
			:isClose="isClose"
			@resetError="resetError"
			@toggleIsClose="toggleIsClose"></AuthForm>
		<div class="auth-block__footer">
			<button :disabled="isDisabled" :class="isDisabled ? '' : 'active-btn-auth'" @click="getUser">
				Войти
			</button>
		</div>
	</div>
</template>

<script>
import AuthForm from '@/UI/Forms/AuthForm/AuthForm.vue';
import './style.scss';

export default {
	name: 'Authorisation',
	components: {
		AuthForm,
	},
	props: {
		loginData: Object,
		userError: Boolean,
	},
	data() {
		return {
			isClose: true,
		};
	},
	computed: {
		openEye() {
			return this.isClose ? 'eye-close' : 'eye-open';
		},
		isDisabled() {
			return this.loginData.login.length === 0 || this.loginData.password.length === 0;
		},
	},
	methods: {
		getUser() {
			this.$emit('get-user');
		},
		toggleIsClose() {
			this.isClose = !this.isClose;
		},
		resetError() {
			if (this.userError) {
				this.$store.state.AuthUserModule.isError = false
			}
		},
	},
};
</script>
