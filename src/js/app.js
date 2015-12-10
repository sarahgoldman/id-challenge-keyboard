require.config({
	baseUrl: 'js',
	paths: {
		app: 'app',
		jquery: 'components/jquery/dist/jquery',
		minivents: 'components/minivents/dist/minivents.amd.min'
	},
	packages: [

	],
	shim: {

	}
});

require(['app/main'], function(main) {
	main.init();
});
