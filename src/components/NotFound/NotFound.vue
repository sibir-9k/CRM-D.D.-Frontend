<template>
	<div class="not-found">
		<div class="not-found__left">
			<div class="left-header">
				<h1 class="left-header__title">Упс....</h1>
				<span class="left-header__subtitle">Страница не найдена</span>
				<p class="left-header__paragraph">
					Эта страница не существует или была удалена! Мы предлагаем вам вернуться домой.
				</p>
			</div>
			<router-link to="/">Вернуться домой</router-link>
		</div>
		<div class="not-found__right">
			<Icon iconName="404"></Icon>
		</div>
	</div>
</template>

<script>
import Icon from '@/UI/Icon/Icon.vue';
import '@/assets/svg/404.svg';
import './style.scss';
export default {
	name: 'NotFound',
	components: {
		Icon,
	},
};
</script>
