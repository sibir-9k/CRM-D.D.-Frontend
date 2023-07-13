<template>
	<div class="home">
		<Navigation></Navigation>
		<div class="content">
			<template>
				<Plug v-if="!checkProjects" textMessage="Не создан ни один проект"></Plug>
				<template v-else>
					<FilterSearch :addBtn="addBtn"></FilterSearch>
					<Loader v-if="isFetching" class="project-list"></Loader>
					<template v-else>
						<div class="project-list">
							<ProjectItem
								v-for="project in allProjects"
								:project="project"
								:key="project._id"
								@openModal="editModalOpen">
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
					:modalOpen="modalOpen"
					@modal-close="modalClose"
					@getProjects="getProjects"></CreateProjectModal>
				<EditProjectModal
					v-for="project in allProjects"
					v-if="isEditModalOpen[project._id]"
					:project="project"
					:key="project._id"
					:modalOpen="isEditModalOpen[project._id]"
					@closeModal="editModalClose"
					@getProjects="getProjects"></EditProjectModal>
				<DeleteProjectModal></DeleteProjectModal>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Navigation from '@/components/Navigation/Navigation.vue';
import ProjectItem from '@/components/Project-item/ProjectItem.vue';
import FilterSearch from '@/components/FilterSearch/FilterSearch.vue';
import Plug from '@/components/Plug/Plug.vue';
import Pagintations from '@/components/Paginations/Pagintations.vue';
import Loader from '@/UI/Loader/Loader.vue';
import CreateProjectModal from '@/UI/Forms/ModalsForm/CreateProjectModal.vue';
import EditProjectModal from '@/UI/Forms/ModalsForm/EditProjectModal.vue';
import DeleteProjectModal from '@/UI/Forms/ModalsForm/DeleteModals/DeleteProjectModal.vue';

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
			isEditModalOpen: [],
			modalOpen: false,
		};
	},
	computed: {
		...mapGetters({
			allProjects: 'ProjectModule/getAllProjects',
			totalPages: 'ProjectModule/getTotalPages',
			currentPage: 'ProjectModule/getCurrentPage',
			isFetching: 'ProjectModule/getFetching',
		}),
		...mapState({
			isFetching: (state) => state.ProjectModule.isFetching,
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
			});
		},
		checkProjects() {
			return this.allProjects.length > 0 ? true : false;
		},
		modalClose() {
			this.modalOpen = false;
		},
		editModalOpen(id) {
			this.$set(this.isEditModalOpen, id, true);
		},
		editModalClose(id) {
			this.$set(this.isEditModalOpen, id, false);
		},
	},
	mounted() {
		this.getProjects();
	},
};
</script>
