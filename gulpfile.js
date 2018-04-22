const posthtml = require('gulp-posthtml');
const gulp = require('gulp');

gulp.task('build', function() {
    const plugins = [
        // text process
        require('posthtml-textr')({}, [
            require('typographic-single-spaces')
        ]),
        require('posthtml-retext')([
            [require('retext-emoji'), { convert: 'encode' }]
        ]),
        function noBrakeInText(tree) {
            tree.match(/\n\s\w/gim, function (node) {
                return node.replace(/\n\s/gim, ' ');
            })
        },
        // dom process
        require('posthtml-custom-elements')(),
        require('posthtml-bem')({
            elemPrefix: '__',
            modPrefix: '--',
            modDlmtr: '-'
        }),
    ];

    return gulp.src('src/pages/**/*.html')
        .pipe(posthtml(plugins))
        .pipe(gulp.dest('build'));
});
