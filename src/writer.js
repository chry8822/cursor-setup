// 현재 프로젝트의 .cursor/ 폴더에 파일을 생성하는 모듈

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

// 카테고리별 저장 경로
const DEST_DIR = {
  rules: '.cursor/rules',
  commands: '.cursor/commands',
  skills: '.cursor/skills',
};

// 파일 1개 저장 (덮어쓰기 여부 확인 포함)
async function writeFile(category, name, content) {
  // skills는 .cursor/skills/{name}/SKILL.md 구조로 저장
  const destDir = category === 'skills'
    ? path.join(process.cwd(), DEST_DIR.skills, name)
    : path.join(process.cwd(), DEST_DIR[category]);
  const filename = category === 'skills' ? 'SKILL.md' : name;
  const destPath = path.join(destDir, filename);

  // 폴더 없으면 생성
  fs.mkdirSync(destDir, { recursive: true });

  // 이미 파일이 존재하면 덮어쓸지 확인
  if (fs.existsSync(destPath)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `⚠️  ${filename} 이 이미 존재합니다. 덮어쓸까요?`,
      initial: false,
    });

    if (!overwrite) {
      console.log(`⏭️  건너뜀: ${category === 'skills' ? `${name}/SKILL.md` : filename}`);
      return false;
    }
  }

  fs.writeFileSync(destPath, content, 'utf-8');
  return true;
}

module.exports = { writeFile, DEST_DIR };
