<template>
	<div class="home">
		<Navigation></Navigation>
		<div class="content">
			<template>
				<Plug v-if="!checkTasks" textMessage="Не создана ни одна задача"></Plug>
				<template v-else>
					<FilterSearch :addBtn="addBtn"></FilterSearch>
					<Loader v-if="isFetching" class="task-list"></Loader>
					<template v-else>
						<div class="task-list">
							<TaskItem
								v-for="taskItem in allTasks"
								:taskItem="taskItem"
								:key="taskItem.id"></TaskItem>
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
import TaskItem from '@/components/Task-item/TaskItem.vue';
import FilterSearch from '@/components/FilterSearch/FilterSearch.vue';
import Plug from '@/components/Plug/Plug.vue';
import Pagintations from '@/components/Paginations/Pagintations.vue';
import Loader from '@/UI/Loader/Loader.vue';

export default {
	name: 'TaskView',
	components: {
		Navigation,
		TaskItem,
		FilterSearch,
		Plug,
		Pagintations,
		Loader,
	},
	data() {
		return {
			addBtn: [
				{
					type: 'router-link',
					props: {
						to: '/create-task',
					},
					text: 'Добавить',
				},
			],
			modalOpen: false,
		};
	},
	computed: {
		...mapGetters({
			allTasks: 'TaskModule/getAllTasks',
			totalPages: 'TaskModule/getTotalPages',
			currentPage: 'TaskModule/getCurrentPage',
			isFetching: 'TaskModule/getFetching',
		}),
		...mapState({
			isFetching: (state) => state.TaskModule.isFetching,
		}),
	},
	methods: {
		...mapActions({
			getTasks: 'TaskModule/getTasks',
			setCurrentPage: 'TaskModule/setCurrentPage',
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
			this.getTasks({
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
		this.getTasks();
	},
};
</script>
