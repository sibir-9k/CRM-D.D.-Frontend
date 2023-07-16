<template>
	<div class="select-sort">
		<select :class="className" v-model="selectedValue" @input="$emit('input', $event.target.value)">
			<option
				:class="classNameOption"
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				:selected="option.value === selectedValue">
				{{ option.optionText }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'SelectSort',
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
			default: 'name',
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
