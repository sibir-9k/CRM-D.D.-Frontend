<template>
	<button 
    :class="btnClassName"   
    v-on:click.prevent="$emit('click', $event)"
  >
		{{ btnName }}
	</button>
</template>

<script>
export default {
	name: 'Button',
  props:{
    btnName:{
      type: String
    },
    btnClassName:{
      type: String
    }
  }
};
</script>
