#!/usr/bin/env node

// npx cursor-setup 실행 시 여기서 시작
const { checkNodeVersion } = require('../src/check-node');
const { run } = require('../src/cli');

(async () => {
  await checkNodeVersion();
  await run();
})();
