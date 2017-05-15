
module.exports = function(grunt){

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		clean : {
			output : ['./output/*']
		},
		jshint : {
			option : {

			},
			file : ['../public/javascripts/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['jshint','clean'])
};