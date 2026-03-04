// 인터랙티브 메뉴 UI 로직

const prompts = require('prompts');
const { TEMPLATE_FILES, fetchFile } = require('./fetcher');
const { writeFile, DEST_DIR } = require('./writer');

async function run() {
  console.log('');
  console.log('──────────────────────────────');
  console.log('🎯  Cursor 설정 셋업');
  console.log('──────────────────────────────');

  // rules / commands 그룹으로 분류해서 출력
  const rules = TEMPLATE_FILES.filter((f) => f.category === 'rules');
  const commands = TEMPLATE_FILES.filter((f) => f.category === 'commands');

  // prompts multiselect 옵션 생성
  const choices = [
    // 그룹 구분선 (선택 불가)
    { title: '── Rules ──────────────────', disabled: true, value: null },
    ...rules.map((f, i) => ({
      title: `${f.name.padEnd(20)} — ${f.description}`,
      value: f,
    })),
    { title: '── Commands ────────────────', disabled: true, value: null },
    ...commands.map((f, i) => ({
      title: `${f.name.padEnd(20)} — ${f.description}`,
      value: f,
    })),
  ];

  const { selected } = await prompts({
    type: 'multiselect',
    name: 'selected',
    message: '적용할 파일을 선택하세요 (스페이스바 선택, 엔터 확인)',
    choices,
    hint: '- Space: 선택/해제, Enter: 확인',
    min: 1,
  });

  // Ctrl+C 또는 선택 없이 종료
  if (!selected || selected.length === 0) {
    console.log('\n❌ 선택된 파일이 없습니다. 종료합니다.');
    process.exit(0);
  }

  console.log('');

  // 선택한 파일 fetch → 저장
  for (const file of selected) {
    try {
      process.stdout.write(`⏳ ${file.name} 가져오는 중...`);
      const content = await fetchFile(file.category, file.name);
      const written = await writeFile(file.category, file.name, content);

      if (written) {
        // 커서를 줄 처음으로 이동 후 덮어쓰기
        process.stdout.write(`\r✅ ${file.name.padEnd(20)} → ${DEST_DIR[file.category]}/\n`);
      }
    } catch (err) {
      process.stdout.write(`\r❌ ${file.name.padEnd(20)} — 실패\n`);
      err.message.split('\n').forEach((line) => console.log(`   ${line}`));
    }
  }

  console.log('');
  console.log('──────────────────────────────');
  console.log('완료!');
  console.log('──────────────────────────────');
  console.log('');
}

module.exports = { run };
