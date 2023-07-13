<template>
	<ul class="pagination">
		<li class="pagination-item">
			<button @click="prevPage">
				<Icon iconName="pagination-arrow-left"></Icon>
			</button>
		</li>

		<li class="pagination-item" v-for="(pageBtn, index) in allPages" :key="index">
			<button :class="{ active: currentPage === pageBtn }" @click="currentPageNext(pageBtn)">
				{{ pageBtn }}
			</button>
		</li>

		<li class="pagination-item">
			<button @click="nextPage">
				<Icon iconName="pagination-arrow-rigth"></Icon>
			</button>
		</li>
	</ul>
</template>

<script>
import { mapActions } from 'vuex';
import Icon from '@/UI/Icon/Icon.vue';
import Button from '@/UI/Button/Button.vue';
import { PaginationRange } from '@/helpers/pagination-range.js';
import './style.scss';

export default {
	name: 'Pagination',
	components: {
		Icon,
		Button,
	},
	props: {
		totalPages: {
			type: Number,
		},
		currentPage: {
			type: Number,
		},
	},
	computed: {
		allPages() {
			return PaginationRange(this.currentPage, this.totalPages);
		},
	},
	methods: {
		nextPage() {
			this.$emit('next-page');
		},
		prevPage() {
			this.$emit('prev-page');
		},
		currentPageNext(page) {
			if (page === '...') return;
			this.$emit('current-page-next', page);
		},
	},
};
</script>
