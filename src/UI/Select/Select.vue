<template>
	<div>
		<select :class="className" v-model="selectedValue" @input="$emit('input', $event.target.value)">
			<option
				:class="classNameOption"
				v-for="option in options"
				:key="option.value"
				:value="option.value">
				{{ option.optionText }}
			</option>
		</select>
	</div>
</template>

<script>
import '@/assets/svg/filter-arrow-up.svg';
import './style.scss';
export default {
	name: 'Select',
	props: {
		options: {
			type: Array,
		},
		className: {
			type: String,
		},
		classNameOption: {
			type: String,
		},
		value: {
			type: String,
		},
	},
	data() {
		return {
			selectedValue: this.value,
		};
	},
	watch: {
		value(newValue) {
			this.selectedValue = newValue;
		},
	},
};
</script>
