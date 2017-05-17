
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
		},
		uglify : {
			development : {
				files : [{
					expand : true,
					cwd : "../public/javascripts/",
					src : "*.js",
					dest : "./output/public/javascripts"
				}]
			},
			options : {
				mangle : true,
				compress : {
					drop_console : true
				}
			}
		},
		htmlhint: {
			templates : {
				options : {
					'attr-lower-case' : true,
					

				},
				src : ['../views/*.html']
			}
		},
		htmlmin : {
			dev : {
				options : {
					collapseWhitespace : true,
					removeComments : true,
					force : true

				},
				files : {

					src: ['../views/**.html','../view/**.hbs'],
					ext : ".min.html",
					extDot : "last",
					filter: 'isFile'

					
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.registerTask('default',['jshint','clean','uglify'])
	grunt.registerTask('html',['htmlhint','htmlmin'])
};