import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import ProjectView from '@/views/ProjectView.vue';
import TasksView from '@/views/TasksView.vue';
import ProfileView from '@/views/ProfileView.vue';
import CreateTask from '@/views/CreateTaskView.vue';
import UsersView from '@/views/UsersView.vue';
import NotFound from '@/views/NotFoundView.vue';
import AuthorisationView from '@/views/AuthorisationView.vue';
import EditTask from '@/views/EditTaskView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: ProjectView,
		meta: { auth: true },
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthorisationView,
	},
	{
		path: '/tasks',
		name: 'tasks',
		component: TasksView,
		meta: { auth: true },
	},
	{
		path: '/profile',
		name: 'profile',
		component: ProfileView,
		meta: { auth: true },
	},
	{
		path: '/tasks/create',
		name: 'create-task',
		component: CreateTask,
		meta: { auth: true },
	},
	{
		path: '/tasks/:id',
		name: 'edit-task',
		component: EditTask,
		meta: { auth: true },
	},
	{
		path: '/users',
		name: 'users',
		component: UsersView,
		meta: { auth: true },
	},
	{
		path: '*',
		name: 'not-found',
		component: NotFound,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

const guardAuth = async (to, from,next) => {
	if (!localStorage.getItem('UserToken')) next('/auth');

	await router.app.$store.dispatch(
		'AuthUserModule/getCurrentUser',
		localStorage.getItem('UserToken')
	);

	const currentUserIsAuth = store.getters['AuthUserModule/getCurrentUserData'];

	if (!currentUserIsAuth) {
		next('/auth');
	} else {
    next()
  }
};

router.beforeEach(async (to, from, next) => {
	const requreAuth = to.matched.some((route) => route.meta.auth);

	if (requreAuth) {
		await guardAuth(to, from,next);
	} else {
		next();
	}
});

export default router;
