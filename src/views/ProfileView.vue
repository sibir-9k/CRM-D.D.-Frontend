<template>
	<div class="home">
		<Navigation></Navigation>
		<Profile :userData="currentUserData"></Profile>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Profile from '@/components/Profile/Profile.vue';
import Navigation from '@/components/Navigation/Navigation.vue';

export default {
	name: 'ProfileView',
	components: {
		Profile,
		Navigation,
	},
	computed: {
		...mapGetters({
			currentUserData: 'AuthUserModule/getCurrentUserData'
		}),
	},
};
</script>
