const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, 'dist', 'libquery_engine-rhel-openssl-3.0.x.so.node');
if (fs.existsSync(enginePath) && !process.env.PRISMA_QUERY_ENGINE_LIBRARY) {
  process.env.PRISMA_QUERY_ENGINE_LIBRARY = enginePath;
}

require('./dist/main.js');
