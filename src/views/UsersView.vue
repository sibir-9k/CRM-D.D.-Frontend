<template>
	<div class="home">
		<Navigation></Navigation>
		<div class="content">
			<template>
				<Plug v-if="!checkTasks" textMessage="Нету ни одрого пользователя"></Plug>
				<template v-else>
					<FilterSearch></FilterSearch>
					<Loader v-if="isFetching" class="user-list"></Loader>
					<template v-else>
						<div class="user-list">
							<UserItem
								v-for="userData in allUsers"
								:userData="userData"
								:key="userData._id"></UserItem>
						</div>
					</template>
					<Pagintations
						:totalPages="totalPages"
						:currentPage="currentPage"
						@current-page-next="currentPageNext"
						@prev-page="prevPage"
						@next-page="nextPage"></Pagintations>
				</template>
			</template>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Navigation from '@/components/Navigation/Navigation.vue';
import Plug from '@/components/Plug/Plug.vue';
import UserItem from '@/components/User-item/UserItem.vue';
import Pagintations from '@/components/Paginations/Pagintations.vue';
import FilterSearch from '@/components/FilterSearch/FilterSearch.vue';
import Loader from '@/UI/Loader/Loader.vue';

export default {
	name: 'ProfileView',
	components: {
		Plug,
		Navigation,
		UserItem,
		Pagintations,
		FilterSearch,
    Loader
	},
	computed: {
		...mapGetters({
			allUsers: 'UsersModule/getAllUsers',
			totalPages: 'UsersModule/getTotalPages',
			currentPage: 'UsersModule/getCurrentPage',
			isFetching: 'UsersModule/getFetching',
		}),
		...mapState({
			isFetching: (state) => state.TaskModule.isFetching,
		}),
	},
	methods: {
		...mapActions({
			getAllUsers: 'UsersModule/getAllUsers',
			setCurrentPage: 'UsersModule/setCurrentPage',
			getUsersPicture: 'UsersModule/getUsersPicture',
		}),
		nextPage() {
			if (this.currentPage === this.totalPages) return;
			this.currentPageNext(this.currentPage + 1);
		},
		prevPage() {
			if (this.currentPage === 1) return;
			this.currentPageNext(this.currentPage - 1);
		},
		currentPageNext(page) {
			this.setCurrentPage(page);
			this.getAllUsers({
				page: page,
			});
		},
		checkTasks() {
			if (this.allTasks.length > 0) {
				return true;
			} else {
				return false;
			}
		},
	},
	mounted() {
		this.getAllUsers();
	},
};
</script>
