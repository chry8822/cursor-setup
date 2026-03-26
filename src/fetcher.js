// GitHub 템플릿 레포에서 파일을 가져오는 모듈

const REPO_OWNER = 'chry8822';
const REPO_NAME = 'CursorTeamRules';
const BRANCH = 'master';
const REPO_BASE_PATH = '.cursor'; // 레포 내 파일 루트 경로

const MANIFEST_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/manifest.json`;

// 파일 목록을 CursorTeamRules의 manifest.json에서 동적으로 가져옴
async function fetchManifest() {
  const response = await fetch(MANIFEST_URL);

  if (!response.ok) {
    throw new Error(
      `manifest.json 가져오기 실패 (HTTP ${response.status})\n` +
      `   URL   : ${MANIFEST_URL}\n` +
      `   원인  : 잠시 후 다시 시도해주세요.`
    );
  }

  return response.json();
}

// raw URL 생성
// skills는 .cursor/skills/{name}/SKILL.md, 나머지는 .cursor/{category}/{name}
function getRawUrl(category, name) {
  if (category === 'skills') {
    return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${REPO_BASE_PATH}/skills/${name}/SKILL.md`;
  }
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${REPO_BASE_PATH}/${category}/${name}`;
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

module.exports = { fetchManifest, fetchFile };
