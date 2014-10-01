# gulp-simplefont64

> Encode base64 data from font-files and store the resulting fonts grouped according to font-family in a css file.

Encoding fonts in base64 is great but often you just end up with a list of font-families like: `PlayfairDisplay-Black`, `PlayfairDisplay-Regular`, `PlayfairDisplay-Italic`, instead of just grouping them all under the same font-family and giving the font faces the appropriate rule declarations.

For `gulp-simplefont64`, just name your fonts in the following format:

> FontFamily-Style1-Style2...

For example:

> PlayfairDisplay-Black-Italic.otf

And `gulp-simplefont64` will give it the appropriate rulesets underneath the PlayfairDisplay font family (`font-weight: 800;` and `font-style: italic;`).

## Example

#### gulpfile.js

```js
var gulp = require('gulp');
var font64 = require('gulp-simplefont64');

gulp.task('fonts', function() {
    return gulp.src(['src/fonts/**/*.otf', 'src/fonts/**/*.ttf'])
        .pipe(font64())
        .pipe(gulp.dest('dist/stylesheets/'));
});
```

#### Contents of "src/fonts":

```bash
    +-- src
    |   +--fonts
    |      +-- PlayfairDisplay-Black-Italic.otf
```

#### Result of plugin: 

```html
@font-face {
  font-family: PlayfairDisplay;
  font-weight: 800;
  font-style: italic;
  src: url("playfair-display/data: font/opentype; base64,T1RUTwAMAIAAAwBAQ0ZGICNw7jIAABE8AAFw1UdERUYSkBS7AAGPSAAAAERHUE9TXJ5OgwABqaAAAJDYR1NVQmMeE9EAAY+MAAAaFE9TLzJuRIYyAAABMAAAAGBjbWFw5kH1tQAACbgAAAdkaGVhZANwzXwAAADMAAAANmhoZWERJQwdAAABBAAAACRobXR4PCvh+gABghQAAA00bWF4cANNUAAAAAEoAAAABm5hbWUD6eGxAAABkAAACCdwb3N0/zwAKQAAERwAAAAgAAEAAAABAQbN9rJqXw889QADCAAAAAAAzmtAdgAAAADOa0B2/Qr9/ 
};
```