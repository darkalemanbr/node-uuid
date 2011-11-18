var uuid = require('../uuid'),
    assert = require('assert');

function compare(ids) {
  console.log(ids);
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i].split('-');
    id = [id[2], id[1], id[0], id[3], id[4]].join('');
    ids[i] = id;
  }
  var sorted = ([].concat(ids)).sort();

  assert.equal(sorted.toString(), ids.toString(), 'Warning: sorted !== ids');
  console.log('everything in order!');
}

var today = new Date().getTime();
var tenhoursago = new Date(today - 10*3600*1000).getTime();
var twentyeightdayslater =  new Date(today + 28*24*3600*1000).getTime();

var uuidToday = uuid.v1({
  timestamp: today
});
var uuidTenhoursago = uuid.v1({
  timestamp: tenhoursago
});
var uuidTwentyeightdayslater = uuid.v1({
  timestamp: twentyeightdayslater
});
var uuidNow = uuid.v1();

var ids = [uuidTenhoursago, uuidToday, uuidNow, uuidTwentyeightdayslater];

console.log('Test if ids are in order:');
compare(ids);

// Betwenn uuidToday and uuidTenhoursago the clock is set backwards, so we
// expect the clock_seq to increase by one
assert.ok(uuidToday[22] < uuidTenhoursago[22], 'clock_seq was not increased');
// Same for uuidNow since we set the clock to a future value inbetween
assert.ok(uuidTwentyeightdayslater[22] < uuidNow[22], 'clock_seq was not increased');
