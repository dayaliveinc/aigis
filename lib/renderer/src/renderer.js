function renderer(components, options) {
  var engine = options.template_engine;
  var TemplateRenderer = require('./engine/' + engine);
  var renderer =new TemplateRenderer(components, options);
  return renderer
}

module.exports = renderer;
