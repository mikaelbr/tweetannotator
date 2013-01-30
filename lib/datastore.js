var fs = require('fs');

var filename = './data/cache.json',
    backupFilename = './data/backup.json';

var DataStore = function () {
  var fileInput = fs.readFileSync(filename).toString();
  if (fileInput === '') {
    this.data = [];
  } else {
    this.data = JSON.parse(fileInput);
  }
},
_saveThreshold = 5,
_existingId = function (collection, id) {

  for (var i = 0, len = collection.length; i < len; i++) {
    if (collection[i].id === id) {
      return i;
    }
  }

  return -1;
},
_save = function (collection) {
  if (collection.length % _saveThreshold !== 0) {
    return;
  }

  console.log('Saving data to file');

  fs.writeFile(filename, JSON.stringify(collection, null, 4), function(err) {
    if(err) {
      console.error(err);

      // Try to save backup. 
      fs.writeFile(backupFilename, JSON.stringify(collection, null, 4));
    } 
  });
};

DataStore.prototype.all = function() {
  return this.data;
};

DataStore.prototype.push = function(tweet) {
  var exId = _existingId(this.data, tweet.id);

  if (exId !== -1) {
    this.data[exId] = tweet;
    _save(this.data);
    return tweet;
  }

  this.data.push(tweet);
  _save(this.data);
  return tweet;
};

DataStore.prototype.get = function(id) {
  id = parseInt(id, 10);

  var exId = _existingId(this.data, id);
  if (exId !== -1) {
    return this.data[exId];
  }

  return null;
};


module.exports = new DataStore();