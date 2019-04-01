const fs = require('fs');
const normalize = require('path').normalize;

module.exports = function requireDirectory(appDir, directoryPath) {
  const dirToRead = (appDir) ? appDir +'/'+ directoryPath : directoryPath;
  try {
    if (!fs.existsSync(dirToRead)) return [];
    return fs.readdirSync(dirToRead).map(function(file) {
      if (file.endsWith('.map')) return null;
      if (file.toLowerCase().indexOf('test')>=0) return null;

      const fileParts = file.split('.');
      if (fileParts.length > 1) fileParts.pop();
      const moduleName = fileParts.join('.'); // don't worry about what type of extension
      return {
        moduleName,
        requirePath: normalize(dirToRead + '/' + moduleName),
        importPath: normalize(directoryPath + '/' + moduleName),
      };
    }).filter(Boolean);

  } catch (e) {
    return [];
  }
};

