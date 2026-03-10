// GitHub 템플릿 레포에서 파일을 가져오는 모듈

const REPO_OWNER = 'chry8822';
const REPO_NAME = 'CursorTeamRules';
const BRANCH = 'master';
const REPO_BASE_PATH = '.cursor'; // 레포 내 파일 루트 경로

// 사용 가능한 템플릿 파일 목록
const TEMPLATE_FILES = [
  { name: 'index.mdc', category: 'rules', description: '프로젝트 기본 컨벤션' },
  { name: 'typescript.mdc', category: 'rules', description: 'TypeScript 규칙' },
  { name: 'ai-behavior.mdc', category: 'rules', description: 'AI 행동 규칙' },
  { name: 'check.md', category: 'commands', description: '컨벤션 + 타입 점검' },
  { name: 'commit.md', category: 'commands', description: 'Git 커밋 자동화' },
  { name: 'create-api.md', category: 'commands', description: 'API 서비스 전체 구조 생성' },
  { name: 'add-api.md', category: 'commands', description: '단일 API 엔드포인트 추가' },
];

// raw URL 생성
function getRawUrl(category, filename) {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${REPO_BASE_PATH}/${category}/${filename}`;
}

// 파일 내용 fetch
async function fetchFile(category, filename) {
  const url = getRawUrl(category, filename);
  const response = await fetch(url);

  if (!response.ok) {
    const hint =
      response.status === 404
        ? '파일 경로 또는 브랜치명을 확인해주세요.'
        : '잠시 후 다시 시도해주세요.';
    throw new Error(
      `${filename} 가져오기 실패 (HTTP ${response.status})\n` +
      `   URL   : ${url}\n` +
      `   원인  : ${hint}`
    );
  }

  return response.text();
}

module.exports = { TEMPLATE_FILES, fetchFile };
