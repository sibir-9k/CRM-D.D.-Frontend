const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	pluginOptions: {
		svgSprite: {
			dir: './src/assets/svg', 
			test: /\.svg$/,
			loaderOptions: {
				extract: false, 
			},
		},
	},
	chainWebpack: (config) => {
		config.module
			.rule('svg-sprite')
			.use('svg-sprite-loader') 
			.loader('svg-sprite-loader'); 
	},
	runtimeCompiler: true, 
});
