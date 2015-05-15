import Handlebars from "Handlebars";
import _ from "lodash";
import fs from "fs-extra";
import moment from "moment";

export default class Render {
  constructor(config) {
    this.config = config;
    this.headerTmpl = this.compile("header");
    this.contentsTmpl = this.compile("contents");
    this.footerTmpl = this.compile("footer");
    this.sidemenuTmpl = this.compile("sidemenu");
  }
  build({footer, module, contents, header, name, sidemenu}) {
    footer.timestamp = moment().format(this.config.timestamp_format);
    header.highlight = this.config.highlight_theme;
    
    var headerHtml = this.headerTmpl(header);
    var footerHtml = this.footerTmpl(footer);
    var sidemenuHtml = this.sidemenuTmpl(sidemenu);
    var contentsHtml = this.contentsTmpl({
      header: headerHtml,
      footer: footerHtml,
      sidemenu: sidemenuHtml,
      contents: contents,
      name,
      module,
    });
    return contentsHtml;
  }
  compile(templateName) {
    var config = this.config;
    return Handlebars.compile(fs.readFileSync(`${config.layout_template}/${templateName}.hbs`, "utf8"));
  }
}
