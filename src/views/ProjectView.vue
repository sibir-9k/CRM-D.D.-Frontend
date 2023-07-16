<template>
	<div class="content">
		<template>
			<Plug v-if="!checkProjects" textMessage="Не создан ни один проект"></Plug>
			<template v-else>
				<FilterSearch :addBtn="addBtn" @updateSort="updateSort"></FilterSearch>
				<Loader v-if="isFetching" class="project-list"></Loader>
				<template v-else>
					<div class="project-list">
						<ProjectItem
							v-for="project in allProjects"
							:project="project"
							:key="project._id"
							@editModalOpen="editModalOpen"
							@deleteModalOpen="deleteModalOpen"
							:users="users">
						</ProjectItem>
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
		<div class="modals-block">
			<CreateProjectModal
				v-if="modalOpen"
				@modal-close="modalClose"
				@getProjects="getProjects"></CreateProjectModal>

			<EditProjectModal
				v-if="editProject"
				:project="editProject"
				:key="editProject._id + ' edit'"
				@closeModal="editModalClose"
				@getProjects="getProjects"></EditProjectModal>

			<DeleteProjectModal
				v-if="deleteProject"
				:project="deleteProject"
				:key="deleteProject._id + ' del'"
				@closeModal="deleteModalClose"
				@getProjects="getProjects"></DeleteProjectModal>
		</div>
	</div>
</template>

<script>
import { BASE_URL } from '@/api/api.js';
import { mapGetters, mapActions } from 'vuex';
import Navigation from '@/components/Navigation/Navigation.vue';
import ProjectItem from '@/components/Project-item/ProjectItem.vue';
import FilterSearch from '@/components/FilterSearch/FilterSearch.vue';
import Plug from '@/components/Plug/Plug.vue';
import Pagintations from '@/components/Paginations/Pagintations.vue';
import Loader from '@/UI/Loader/Loader.vue';
import CreateProjectModal from '@/UI/Forms/ModalsForm/CreateModals/CreateProjectModal.vue';
import EditProjectModal from '@/UI/Forms/ModalsForm/EditModals/EditProjectModal.vue';
import DeleteProjectModal from '@/UI/Forms/ModalsForm/DeleteModals/DeleteProjectModal.vue';
import axios from 'axios';

export default {
	name: 'ProjectView',
	components: {
		Navigation,
		ProjectItem,
		FilterSearch,
		Plug,
		Pagintations,
		Loader,
		CreateProjectModal,
		EditProjectModal,
		DeleteProjectModal,
	},
	data() {
		return {
			users: {},
			addBtn: [
				{
					type: 'button',
					props: {
						onClick: (event) => {
							event.preventDefault();
							this.modalOpen = true;
						},
					},
					text: 'Добавить',
				},
			],
			editProject: null,
			deleteProject: null,
			modalOpen: false,
			sort: {
				field: 'name',
				type: 'asc',
			},
		};
	},
	computed: {
		...mapGetters({
			allProjects: 'ProjectModule/getProjects',
			totalPages: 'ProjectModule/getTotalPages',
			currentPage: 'ProjectModule/getCurrentPage',
			isFetching: 'ProjectModule/getFetching',
		}),
	},
	methods: {
		...mapActions({
			getProjects: 'ProjectModule/getProjects',
			setCurrentPage: 'ProjectModule/setCurrentPage',
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
			this.getProjects({
				page: page,
				sort: this.sort,
			});
		},
		updateSort(field, type) {
			this.sort.field = field;
			this.sort.type = type;
			this.getProjects({
				page: 1,
				sort: this.sort,
			});
		},
		checkProjects() {
			return this.allProjects.length > 0;
		},
		modalClose() {
			this.modalOpen = false;
		},
		editModalOpen(project) {
			this.editProject = project;
		},
		editModalClose(project) {
			this.editProject = null;
		},
		deleteModalOpen(project) {
			this.deleteProject = project;
		},
		deleteModalClose(project) {
			this.deleteProject = null;
		},
	},
	mounted() {
		this.getProjects();
	},
	watch: {
		allProjects: {
			async handler(projects) {
				this.users = {};
				if (projects.length > 0)
					try {
						const response = await axios.post(
							`${BASE_URL}/users/search`,
							{
								filter: {
									_id: [
										...projects.map((project) => project.author),
										...projects.map((project) => project?.authorEdited),
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
