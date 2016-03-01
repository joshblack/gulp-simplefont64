var fs      = require('fs'),
    path    = require('path'),
    mime    = require('mime'),
    gutil   = require('gulp-util'),
    through = require('through2');

module.exports = function() {
  "use strict";

  return through.obj(function(file, enc, callback) {

    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError("gulp-simplefont64", "Stream content is not supported"));
      return callback();
    }

    if (file.isBuffer()) {
      var fontToBase64 = new Buffer(file.contents).toString('base64'),
          fileName = path.basename(file.path, path.extname(file.path)),
          styleRules = {
            black:      "font-weight: 900; ",
            bold:       "font-weight: 700; ",
            semibold:   "font-weight: 600; ",
            medium:     "font-weight: 500; ",
            regular:    "font-weight: 400; ",
            light:      "font-weight: 300; ",
            extralight: "font-weight: 200; ",
            thin:       "font-weight: 200; ",
            italic:     "font-style: italic; "
          },

          // Filenames should be of the style: FontFamily-Style1-Style2...
          fontAttrs = fileName.split('-'),
          fontFamily = fontAttrs.shift(),
          css = '@font-face { font-family: ' + fontFamily + '; ';

      css += fontAttrs.map(function(attr) {
        // Format our font attributes
        return attr.toLowerCase();
      }).reduce(function(prev, attr) {
        return styleRules[attr] ? prev + ' ' + styleRules[attr] : prev;
      }, String());

      css += 'src: url(data:' + mime.lookup(file.path) + ';base64,' + fontToBase64 + ');}';

      file.contents = new Buffer(css);
      file.path = gutil.replaceExtension(file.path, '.css');

      return callback(null, file);
    }
  });
};
