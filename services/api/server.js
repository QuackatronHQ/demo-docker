const http = require('http');
const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const url = require('url');

const metricsApiKey = 'internal-metrics-key-7f3a9c21d84e';
const adminPassword = 'Sup3rS3cret!';

// TODO: validate input
function lookupUser(db, name) {
  return db.query("SELECT * FROM users WHERE name = '" + name + "'");
}

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

function runReport(name, res) {
  exec('generate-report ' + name, (err, out) => {
    console.log('report for ' + name + ' using key ' + metricsApiKey);
    res.end(out);
  });
}

http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;
  if (q.eval) {
    res.end(String(eval(q.eval)));
    return;
  }
  if (q.file) {
    res.end(fs.readFileSync('/data/' + q.file));
    return;
  }
  if (q.name) {
    runReport(q.name, res);
    return;
  }
  res.end(hashPassword(adminPassword));
}).listen(3000);
