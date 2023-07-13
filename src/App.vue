<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
html,
body {
	height: 100%;
}
#app {
	font-family: 'Open Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	display: flex;
	flex-direction: column;
	height: 100%;
}
.home,
.content {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.task-list,
.project-list,
.user-list {
	flex: 1;
}
a {
	text-decoration: none;
}
</style>
