var ejs = require("ejs");
var fs = require("fs-extra");
var path = require("path");
var base = require("./base");

class EJS_Renderer extends base {
  constructor(components, options) {
    super(components, options);
    this.options = options;
    this.components = components;
    this.initialize();
  }

  _loadTemplate(fileName) {
    var ext = this.options.template_ext[this.options.template_engine];
    var filePath = path.join(this.options.template_dir, fileName + ext);
    try {
      var template = fs.readFileSync(filePath, "utf-8");
      return ejs.compile(template, { filename: filePath });
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = EJS_Renderer;
