var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {
	port: 9000,
	devBaseUrl: "http://localhost",
	paths: {
		html: './src/*.html',
		js: './src/*.js',
		css:[
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.scss'

		],
		images: './src/images/*',
		dist:'./dist',
		mainJs: './src/main.js'
	}
}
gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		levereload: true
	})
})

gulp.task('open',['connect'], function(){// what ever tasks run together we should give in array
	gulp.src('dist/index.html')
		.pipe(open({uri:config.devBaseUrl+':'+config.port+'/'}));//linking file. making asynchrounous request. open url and port to run application in browser when connction is done
})

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());//reload coonect task when there is change

});

gulp.task('js', function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error',console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist+'/scripts'))
		.pipe(connect.reload());
});		

gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist+'/css'))
		
});

gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist+'/images'))
		.pipe(connect.reload());
		
});

gulp.task('lint', function(){
	gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
		
});
gulp.task('watch', function(){
	gulp.watch(config.paths.html,['html'])
	gulp.watch(config.paths.js,['js']);
	//gulp.watch(config.paths.js,['css']);
});
gulp.task('default',['html','js','css','open','images','watch']);