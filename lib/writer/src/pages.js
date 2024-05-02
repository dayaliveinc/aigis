const _ = require("lodash");
const fs = require("fs-extra");
const path = require("path");
const htmlBeautify = require("js-beautify").html;
const colors = require("colors/safe");
const BEAUTIFY_OPTIONS = {
  max_preserve_newlines: 1,
  indent_size: 2,
  end_with_newline: true,
  indent_inner_html: true,
  extra_liners: [],
};

class Writer {
  constructor() {
    // コンストラクタで特別な初期化が必要な場合はここに記述
  }

  write(pages, options) {
    const destPath = path.resolve(options.dest);
    console.info(colors.bold.cyan("[Info] Output:", destPath));
    _.each(pages, (page) => this.writePage(page, options));
  }

  writePage(page, options) {
    try {
      const rel = path.relative(
        path.resolve(options.dest, "../"),
        page.outputPath
      );
      fs.outputFileSync(page.outputPath, page.html);
      if (options.log) {
        console.log(colors.blue("[Log]", rel));
      }
    } catch (e) {
      console.error(colors.bold.underline.red("[Error] Failed Output Files"));
      throw new Error(e);
    }
  }
}

module.exports = new Writer();
