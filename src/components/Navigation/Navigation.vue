<template>
	<header>
		<nav class="navigation">
			<ul class="navigation__list">
				<li class="navigation__item">
					<router-link to="/" exact class="nav-btn" active-class="btn-active">Проекты</router-link>
				</li>
				<li class="navigation__item">
					<router-link to="/tasks" class="nav-btn" active-class="btn-active"> Задачи </router-link>
				</li>
				<li class="navigation__item">
					<router-link to="/users" class="nav-btn" active-class="btn-active"
						>Пользователи</router-link
					>
				</li>
			</ul>
			<DropdownButton
				:imgUser="true"
				:dropList="dropList"
				iconName="arrow-down"
				classNameBlock="user-block"
				classNameButton="user-img"></DropdownButton>
		</nav>
	</header>
</template>

<script>
import Icon from '@/UI/Icon/Icon.vue';
import DropdownButton from '@/UI/Dropdown/DropdownButton/DropdownButton.vue';
import './style.scss';

export default {
	name: 'Navigation',
	components: {
		Icon,
		DropdownButton,
	},
	data() {
		return {
			dropList: [
				{ type: 'router-link', props: { to: '/profile' }, text: 'Профиль' },
				{
					type: 'button',
					props: {
						onClick: this.logOut,
					},
					text: 'Выход',
				},
			],
			activeBtns: [],
		};
	},
	methods: {
		toggleNavBtn(path) {
			return this.activeBtns.includes(path) ? 'btn-active' : '';
		},
		handleClick() {
			if (!this.activeBtns.includes(this.$route.path)) {
				this.activeBtns.push(this.$route.path);

				const buttons = document.querySelectorAll('.nav-btn');
				buttons.forEach((button) => {
					if (
						button.classList.contains('btn-active') &&
						!button.classList.contains(this.toggleNavBtn())
					) {
						button.classList.remove('btn-active');
					}
				});
			}
		},
		logOut() {
			console.log('должен удалить токе');
			localStorage.removeItem('UserToken');
			this.$store.state.AuthUserModule.userToken = null;
			this.$router.replace('/auth');
			console.log('удалил');
		},
	},
};
</script>

// props: { onClick: () => { this.$emit('openModal', this.project._id); }, },
