<template>
	<div class="content">
		<template>
			<Plug v-if="!checkTasks" textMessage="Не создана ни одна задача"></Plug>
			<template v-else>
				<FilterSearch :addBtn="addBtn" @updateSort="updateSort"></FilterSearch>
				<Loader v-if="isFetching" class="task-list"></Loader>
				<template v-else>
					<div class="task-list">
						<TaskItem
							v-for="taskItem in allTasks"
							:taskItem="taskItem"
							:key="taskItem.id"
							@deleteModalOpen="deleteModalOpen"></TaskItem>
					</div>
				</template>
				<Pagintations
					:totalPages="totalPages"
					:currentPage="currentPage"
					@current-page-next="currentPageNext"
					@prev-page="prevPage"
					@next-page="nextPage"></Pagintations>
			</template>
			<DeleteTaskModal
				v-if="deleteTask"
				:task="deleteTask"
				:key="deleteTask._id + ' del'"
				@closeModal="deleteModalClose"
				@getTasks="getTasks">
			</DeleteTaskModal>
		</template>
	</div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/api/api.js';
import { mapGetters, mapActions, mapState } from 'vuex';
import Navigation from '@/components/Navigation/Navigation.vue';
import TaskItem from '@/components/Task-item/TaskItem.vue';
import FilterSearch from '@/components/FilterSearch/FilterSearch.vue';
import Plug from '@/components/Plug/Plug.vue';
import Pagintations from '@/components/Paginations/Pagintations.vue';
import Loader from '@/UI/Loader/Loader.vue';
import DeleteTaskModal from '@/UI/Forms/ModalsForm/DeleteModals/DeleteTaskModal.vue';

export default {
	name: 'TaskView',
	components: {
		Navigation,
		TaskItem,
		FilterSearch,
		Plug,
		Pagintations,
		Loader,
		DeleteTaskModal,
	},
	data() {
		return {
			addBtn: [
				{
					type: 'router-link',
					props: {
						to: '/tasks/create',
					},
					text: 'Добавить',
				},
			],
			deleteTask: null,
			sort: {
				field: 'name',
				type: 'asc',
			},
			users: {},
		};
	},
	computed: {
		...mapGetters({
			allTasks: 'TaskModule/getTasks',
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
		updateSort(field, type) {
			this.sort.field = field;
			this.sort.type = type;
			this.getTasks({
				page: 1,
				sort: this.sort,
			});
		},
		checkTasks() {
			if (this.allTasks.length > 0) {
				return true;
			} else {
				return false;
			}
		},
		deleteModalOpen(task) {
			this.deleteTask = task;
		},
		deleteModalClose() {
			this.deleteTask = null;
		},
	},
	mounted() {
		this.getTasks();
	},
	watch: {
		allTasks: {
			async handler(tasks) {
				this.users = {};
				if (tasks.length > 0)
					try {
						const response = await axios.post(
							`${BASE_URL}/users/search`,
							{
								filter: {
									_id: [
										...tasks.map((project) => project.author),
										...tasks.map((project) => project?.authorEdited),
									],
								},
							},
							{
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
								},
							}
						);
						response.data.users.forEach((element) => {
							this.$set(this.users, element._id, element);
						});
					} catch (error) {
						console.log(error);
					}
			},
			deep: true,
		},
	},
};
</script>
