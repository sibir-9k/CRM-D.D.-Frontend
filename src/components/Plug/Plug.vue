<template>
	<div class="plug">
		<div class="plug__block">
			<span class="plug__message">{{textMessage}}</span>
			<Button btnClassName="plug__btn" btnName="Добавить"></Button>
		</div>
	</div>
</template>

<script>
import Button from '@/UI/Button/Button.vue';
import './style.scss';
export default {
  components: { Button },
	name: 'Plug',
  props:{
    textMessage:{
      type: String
    }
  }
};
</script>

<style></style>
