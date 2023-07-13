<template>
	<div class="container">
		<Authorisation :login-data="loginData" @get-user="getUser" :userError="userError"></Authorisation>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Authorisation from '@/components/Authorisation/Authorisation.vue';

export default {
	components: { Authorisation },
	name: 'AuthorisationView',
	component: {
		Authorisation,
	},
	data() {
		return {
			loginData: {
				login: '',
				password: '',
			},
		};
	},
	computed: {
		...mapGetters({
			userToken: 'AuthUserModule/getUserToken',
			userId: 'AuthUserModule/getUserId',
			userError: 'AuthUserModule/getIsError',
		}),
	},
	methods: {
		...mapActions({
			getTokenUser: 'AuthUserModule/getTokenUser',
			getCurrentUser: 'AuthUserModule/getCurrentUser',
		}),
		getUser() {
			this.getTokenUser(this.loginData);
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
