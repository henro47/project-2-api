const lineReader = require('line-reader');


exports.readFileFromInput = (filePath) =>
{
    lineReader.eachLine(filePath, function(line) {
        console.log(line);
    });
}