<template>
	<div class="filter-search">
		<SearchInput></SearchInput>
		<div class="filter-search__select-block">
			<SelectSort
				classNameOption="filter-search__select"
				v-model="sortField"
				:options="sortElem"></SelectSort>
			<button class="filter-search__btn" @click="changeSortType">
				<Icon :iconName="sortType === 'asc' ? 'filter-arrow-up' : 'filter-arrow-down'" ></Icon>
			</button>
		</div>
		<div v-for="(btn, index) in addBtn" :key="index">
			<component
				v-if="btn.type === 'router-link'"
				:is="btn.type"
				:to="btn.props.to"
				:class="btn?.class"
				class="filter-search__add-task"
				>{{ btn.text }}</component
			>
			<component
				v-else
				:is="btn.type"
				@click="btn.props.onClick"
				:class="btn?.class"
				class="filter-search__add-task"
				>{{ btn.text }}</component
			>
		</div>
	</div>
</template>

<script>
import SearchInput from '@/UI/SearchInput/SearchInput.vue';
import Icon from '@/UI/Icon/Icon.vue';
import SelectSort from '@/UI/Select/SelectSort.vue';
import './style.scss';

export default {
	name: 'FilterSearch',
	components: {
		SearchInput,
		Icon,
		SelectSort,
	},
	props: {
		addBtn: Array,
	},
	data() {
		return {
			sortField: 'name',
			sortType: 'asc',
			sortElem: [
				{ value: 'name', optionText: 'По названию' },
				{ value: 'author', optionText: 'По автору' },
				{ value: 'dateCreated', optionText: 'По дате создания' },
				{ value: 'dateEdited', optionText: 'По дате обновления' },
			],
		};
	},
	methods: {
		changeArrowType() {
			this.sortType === asc ? 'filter-arrow-up' : 'filter-arrow-down';
		},
		changeSortType() {
			this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
			this.$emit('updateSort', this.sortField, this.sortType);
		},
	},
	watch: {
		sortField: function (sort) {
			this.$emit('updateSort', sort, this.sortType);
		},
	},
};
</script>
