# cursor-setup

Cursor IDE의 rules/commands 파일을 템플릿 레포에서 선택적으로 가져오는 CLI 도구

[![npm version](https://img.shields.io/npm/v/cursor-setup)](https://www.npmjs.com/package/cursor-setup)
[![npm downloads](https://img.shields.io/npm/dm/cursor-setup)](https://www.npmjs.com/package/cursor-setup)

## 설치 없이 바로 사용

```bash
npx cursor-setup
```

## 기능

- **파일 선택 설치** — rules / commands 파일을 체크박스로 골라서 적용
- **Node.js 버전 자동 체크** — v18 미만이면 실행 시 자동 감지 후 안내
  - nvm이 설치되어 있으면 원하는 버전으로 바로 전환 가능
  - node-fetch 설치 후 현재 버전 유지 선택도 가능
- **덮어쓰기 보호** — 이미 파일이 존재하면 덮어쓸지 확인 후 진행

## 선택 가능한 파일 목록

### Rules — `.cursor/rules/` 에 저장

| 파일 | 설명 |
|---|---|
| `index.mdc` | 프로젝트 기본 컨벤션 |
| `typescript.mdc` | TypeScript 규칙 |
| `ai-behavior.mdc` | AI 행동 규칙 |

### Commands — `.cursor/commands/` 에 저장

| 파일 | 설명 |
|---|---|
| `check.md` | 컨벤션 + 타입 점검 |
| `commit.md` | Git 커밋 자동화 |
| `create-api.md` | API 서비스 전체 구조 생성 |
| `add-api.md` | 단일 API 엔드포인트 추가 |

## 실행 예시

```
──────────────────────────────
🎯  Cursor 설정 셋업
──────────────────────────────
적용할 파일을 선택하세요 (스페이스바 선택, 엔터 확인)

  ── Rules ──────────────────
  ◯ index.mdc          — 프로젝트 기본 컨벤션
  ◯ typescript.mdc     — TypeScript 규칙
  ◉ ai-behavior.mdc    — AI 행동 규칙

  ── Commands ────────────────
  ◯ check.md           — 컨벤션 + 타입 점검
  ◉ commit.md          — Git 커밋 자동화
  ◯ create-api.md      — API 서비스 전체 구조 생성
  ◯ add-api.md         — 단일 API 엔드포인트 추가

✅ ai-behavior.mdc    → .cursor/rules/
✅ commit.md          → .cursor/commands/
──────────────────────────────
완료!
──────────────────────────────
```

## Node.js 버전 체크 예시

v18 미만 환경에서 실행 시 자동으로 안내합니다.

```
⚠️   Node.js 버전 확인 필요
──────────────────────────────
   현재 버전 : v14.21.3
   필요 버전 : v18 이상

? 어떻게 진행하시겠습니까?
❯ nvm으로 Node 18 (LTS) 설치 및 전환
  node-fetch 설치 후 계속 진행  (현재 Node 버전 유지)
  수동 업그레이드 안내 보기
  종료
```

## 템플릿 소스

파일은 아래 레포에서 가져옵니다.

[chry8822/CursorTeamRules](https://github.com/chry8822/CursorTeamRules)

## npm

[https://www.npmjs.com/package/cursor-setup](https://www.npmjs.com/package/cursor-setup)

## 요구 사항

- Node.js v18 이상 권장 (v14+ 도 node-fetch 설치 후 동작)
