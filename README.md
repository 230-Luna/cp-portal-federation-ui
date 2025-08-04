# CP Portal Federation UI

쿠버네티스 페더레이션 관리를 위한 웹 인터페이스입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📋 사용 가능한 스크립트

### 개발

```bash
# 개발 서버 실행
npm run dev

# 타입 검사
npm run type-check

# 코드 품질 검사 (린트 + 포맷팅 + 타입 검사)
npm run code-quality
```

### 코드 품질 관리

```bash
# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# 포맷팅 검사
npm run format:check
```

## 🎯 코드 스타일 가이드

이 프로젝트는 [Frontend Fundamentals](https://frontend-fundamentals.com/) 사이트의 코드 스타일 컨벤션을 기반으로 합니다.

### 주요 원칙

1. **변경하기 쉬운 코드 작성**
   - 단일 책임 원칙 준수
   - 의존성 최소화
   - 테스트 가능한 코드

2. **가독성 우선**
   - 명확한 함수명과 변수명
   - 적절한 주석과 문서화
   - 일관된 코드 스타일

3. **타입 안전성**
   - TypeScript 엄격 모드 사용
   - 명시적 타입 정의
   - any 타입 사용 최소화

### 자동화 도구

- **ESLint**: 코드 품질 및 스타일 검사
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안전성 보장

자세한 내용은 [CODE_STYLE_GUIDE.md](./CODE_STYLE_GUIDE.md)를 참조하세요.

## 🏗️ 프로젝트 구조

```
src/
├── apis/              # API 클라이언트
├── components/        # 재사용 가능한 컴포넌트
├── error/            # 에러 처리
├── hooks/            # 커스텀 훅
├── models/           # 데이터 모델
├── pages/            # 페이지 컴포넌트
└── utils/            # 유틸리티 함수
```

## 🛠️ 개발 도구 설정

### VS Code 확장 프로그램

다음 확장 프로그램을 설치하세요:

- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag

### 자동 포맷팅

프로젝트에 포함된 `.vscode/settings.json` 설정으로 저장 시 자동 포맷팅이 적용됩니다.

## 📚 기술 스택

- **React 19**: 사용자 인터페이스
- **TypeScript**: 타입 안전성
- **Chakra UI**: 컴포넌트 라이브러리
- **React Query**: 서버 상태 관리
- **React Router**: 라우팅
- **Vite**: 빌드 도구

## 🤝 기여하기

1. 코드 스타일 가이드를 준수해주세요
2. 새로운 기능 추가 시 테스트를 작성해주세요
3. 커밋 메시지는 명확하고 설명적으로 작성해주세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
