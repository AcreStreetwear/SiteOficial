const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const re = /<\/?div(\s[^>]*)?>/g;
let depth = 0;
let m;
function lineAt(idx) { return html.slice(0, idx).split('\n').length; }
while ((m = re.exec(html))) {
  const isClose = m[0].startsWith('</');
  depth += isClose ? -1 : 1;
  if (depth < 0) {
    console.log('NEGATIVE DEPTH at line', lineAt(m.index), JSON.stringify(m[0]));
    break;
  }
}
console.log('final depth (should be 0):', depth);
