const _ = require("lodash");
const fs = require("fs-extra");
const path = require("path");

class AssetsManager {
  constructor() {
    // コンストラクタで特別な初期化が必要な場合はここに記述
  }

  copy(src, dest) {
    fs.copySync(src, path.join(dest, path.basename(src)));
  }

  delete(src) {
    fs.removeSync(src);
  }

  copyAssets(options) {
    const src = options.dependencies;
    const dest = options.dest;
    this.delete(dest);
    if (_.isArray(src)) {
      _.each(src, (srcItem) => this.copy(srcItem, dest));
    } else {
      this.copy(src, dest);
    }
  }
}

module.exports = new AssetsManager();
