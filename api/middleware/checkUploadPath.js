var fs = require('fs');
var path = require('path');

module.exports = (req, res, next)  => {
    try {
        fs.mkdirSync(path.join(__dirname, './uploads/'))
        next();
      } catch (err) {
        console.log(err);
        next();
    }
};
