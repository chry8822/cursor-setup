// Node.js 버전 체크 및 업그레이드 안내 모듈

const { execSync } = require('child_process');
const path = require('path');
const prompts = require('prompts');

const REQUIRED_MAJOR = 18;
const ROOT_DIR = path.join(__dirname, '..');

function getCurrentMajor() {
  return parseInt(process.version.slice(1).split('.')[0], 10);
}

function isNvmAvailable() {
  try {
    execSync('nvm version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

async function checkNodeVersion() {
  const major = getCurrentMajor();
  if (major >= REQUIRED_MAJOR) return;

  const nvmAvailable = isNvmAvailable();

  console.log('');
  console.log('──────────────────────────────');
  console.log('⚠️   Node.js 버전 확인 필요');
  console.log('──────────────────────────────');
  console.log(`   현재 버전 : ${process.version}`);
  console.log(`   필요 버전 : v${REQUIRED_MAJOR} 이상`);
  console.log('');

  const choices = [];

  if (nvmAvailable) {
    choices.push({
      title: `nvm으로 Node ${REQUIRED_MAJOR} (LTS) 설치 및 전환`,
      value: 'nvm',
    });
  }

  choices.push(
    {
      title: 'node-fetch 설치 후 계속 진행  (현재 Node 버전 유지)',
      value: 'node-fetch',
    },
    {
      title: '수동 업그레이드 안내 보기',
      value: 'manual',
    },
    {
      title: '종료',
      value: 'exit',
    }
  );

  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: '어떻게 진행하시겠습니까?',
    choices,
  });

  // Ctrl+C
  if (!action || action === 'exit') {
    console.log('\n종료합니다.');
    process.exit(0);
  }

  // ── nvm 전환 ───────────────────────────────────────────
  if (action === 'nvm') {
    console.log(`\n📦 Node ${REQUIRED_MAJOR} 설치 중... (시간이 걸릴 수 있습니다)\n`);
    try {
      execSync(`nvm install ${REQUIRED_MAJOR}`, { stdio: 'inherit' });
      execSync(`nvm use ${REQUIRED_MAJOR}`, { stdio: 'inherit' });
      console.log(`\n✅ Node ${REQUIRED_MAJOR} 전환 완료!`);
    } catch (err) {
      console.log(`\n❌ nvm 전환 실패: ${err.message}`);
    }
    console.log('');
    console.log('터미널을 재시작한 뒤 다시 실행해 주세요.');
    console.log('');
    process.exit(0);
  }

  // ── 수동 안내 ──────────────────────────────────────────
  if (action === 'manual') {
    console.log('');
    console.log('📖  수동 업그레이드 방법');
    console.log('');
    console.log('  방법 1 — 공식 사이트에서 직접 설치');
    console.log('    https://nodejs.org  →  v18 LTS 이상 다운로드');
    console.log('');
    console.log('  방법 2 — nvm-windows 사용');
    console.log('    https://github.com/coreybutler/nvm-windows');
    console.log('    설치 후: nvm install 18  &&  nvm use 18');
    console.log('');
    process.exit(0);
  }

  // ── node-fetch 설치 후 계속 ────────────────────────────
  if (action === 'node-fetch') {
    console.log('\n📦 node-fetch@2 설치 중...\n');
    try {
      execSync('npm install node-fetch@2', { stdio: 'inherit', cwd: ROOT_DIR });
      global.fetch = require('node-fetch');
      console.log('\n✅ node-fetch 설치 완료! 계속 진행합니다.');
      console.log('');
    } catch (err) {
      console.log(`\n❌ 설치 실패: ${err.message}`);
      console.log('Node.js를 v18 이상으로 업그레이드 해주세요: https://nodejs.org');
      process.exit(1);
    }
  }
}

module.exports = { checkNodeVersion };
