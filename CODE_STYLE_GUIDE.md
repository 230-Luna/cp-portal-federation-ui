# 코드 스타일 가이드

이 문서는 [Frontend Fundamentals](https://frontend-fundamentals.com/) 사이트의 코드 스타일 컨벤션을 기반으로 작성되었습니다.

## 목차

1. [일반 원칙](#일반-원칙)
2. [TypeScript](#typescript)
3. [React](#react)
4. [컴포넌트 설계](#컴포넌트-설계)
5. [네이밍 컨벤션](#네이밍-컨벤션)
6. [파일 구조](#파일-구조)
7. [성능 최적화](#성능-최적화)
8. [접근성](#접근성)

## 일반 원칙

### 1. 변경하기 쉬운 코드 작성

- **단일 책임 원칙**: 각 함수와 컴포넌트는 하나의 명확한 책임만 가져야 합니다.
- **의존성 최소화**: 외부 의존성을 최소화하고 명확한 인터페이스를 제공합니다.
- **테스트 가능성**: 코드는 테스트하기 쉬워야 합니다.

### 2. 가독성 우선

```typescript
// ❌ 나쁜 예
const x = (a: number, b: number) => a + b;

// ✅ 좋은 예
const addNumbers = (firstNumber: number, secondNumber: number): number => {
  return firstNumber + secondNumber;
};
```

### 3. 일관성 유지

- 동일한 패턴을 일관되게 사용합니다.
- 팀 전체가 동의한 컨벤션을 따릅니다.

## TypeScript

### 타입 정의

```typescript
// ❌ 나쁜 예
const user: any = { name: 'John', age: 30 };

// ✅ 좋은 예
interface User {
  name: string;
  age: number;
  email?: string;
}

const user: User = { name: 'John', age: 30 };
```

### 함수 타입

```typescript
// ❌ 나쁜 예
function processData(data: any) {
  return data.map((item: any) => item.name);
}

// ✅ 좋은 예
interface DataItem {
  id: number;
  name: string;
}

function processData(data: DataItem[]): string[] {
  return data.map((item) => item.name);
}
```

### 제네릭 활용

```typescript
// ✅ 좋은 예
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}
```

## React

### 컴포넌트 구조

```typescript
// ✅ 좋은 예
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button
      className={`button button--${variant} button--${size}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### Hooks 사용

```typescript
// ✅ 좋은 예
import { useState, useEffect, useCallback } from 'react';

interface UseCounterProps {
  initialValue?: number;
  step?: number;
}

export const useCounter = ({ initialValue = 0, step = 1 }: UseCounterProps = {}) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount((prev) => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
```

### 조건부 렌더링

```typescript
// ❌ 나쁜 예
{isLoading ? <LoadingSpinner /> : null}

// ✅ 좋은 예
{isLoading && <LoadingSpinner />}
```

## 컴포넌트 설계

### 1. 프레젠테이션 컴포넌트

```typescript
// ✅ 좋은 예
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="user-card__actions">
        {onEdit && (
          <button onClick={() => onEdit(user)}>편집</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(user.id)}>삭제</button>
        )}
      </div>
    </div>
  );
};
```

### 2. 컨테이너 컴포넌트

```typescript
// ✅ 좋은 예
export const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('사용자 목록을 불러오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = useCallback((user: User) => {
    // 편집 로직
  }, []);

  const handleDelete = useCallback((userId: number) => {
    // 삭제 로직
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

## 네이밍 컨벤션

### 파일명

```
// 컴포넌트
Button.tsx
UserCard.tsx
UserList.tsx

// 훅
useCounter.ts
useApi.ts
useLocalStorage.ts

// 유틸리티
formatDate.ts
validateEmail.ts
constants.ts
```

### 변수명

```typescript
// ❌ 나쁜 예
const data = [];
const fn = () => {};
const obj = {};

// ✅ 좋은 예
const userList = [];
const handleSubmit = () => {};
const userConfig = {};
```

### 함수명

```typescript
// 동사로 시작
const fetchUserData = () => {};
const handleClick = () => {};
const validateForm = () => {};
const formatCurrency = (amount: number) => {};
```

## 파일 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── UserCard/
│       ├── UserCard.tsx
│       └── index.ts
├── hooks/              # 커스텀 훅
│   ├── useApi.ts
│   └── useLocalStorage.ts
├── pages/              # 페이지 컴포넌트
│   ├── Home/
│   └── UserList/
├── services/           # API 서비스
│   ├── userService.ts
│   └── apiClient.ts
├── types/              # 타입 정의
│   ├── user.ts
│   └── api.ts
├── utils/              # 유틸리티 함수
│   ├── formatDate.ts
│   └── validation.ts
└── constants/          # 상수
    └── api.ts
```

## 성능 최적화

### 1. 메모이제이션

```typescript
// ✅ 좋은 예
export const ExpensiveComponent: React.FC<{ data: Data[] }> = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.processed}</div>
      ))}
    </div>
  );
});
```

### 2. 이벤트 핸들러 최적화

```typescript
// ✅ 좋은 예
export const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    // 검색 로직
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="검색..."
    />
  );
};
```

## 접근성

### 1. 시맨틱 HTML

```typescript
// ❌ 나쁜 예
<div onClick={handleClick}>버튼</div>

// ✅ 좋은 예
<button onClick={handleClick} type="button">
  버튼
</button>
```

### 2. ARIA 속성

```typescript
// ✅ 좋은 예
<div
  role="button"
  tabIndex={0}
  aria-pressed={isPressed}
  onKeyDown={handleKeyDown}
  onClick={handleClick}
>
  토글 버튼
</div>
```

### 3. 키보드 네비게이션

```typescript
// ✅ 좋은 예
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};
```

## 코드 리뷰 체크리스트

### 기능적 측면
- [ ] 요구사항을 정확히 구현했는가?
- [ ] 에러 처리가 적절한가?
- [ ] 경계 조건을 고려했는가?

### 코드 품질
- [ ] 함수와 변수명이 명확한가?
- [ ] 중복 코드가 없는가?
- [ ] 복잡도가 적절한가?

### 성능
- [ ] 불필요한 리렌더링이 없는가?
- [ ] 메모리 누수가 없는가?
- [ ] 번들 크기가 적절한가?

### 접근성
- [ ] 키보드로 조작 가능한가?
- [ ] 스크린 리더가 읽을 수 있는가?
- [ ] 색상 대비가 충분한가?

## 자동화 도구

### 스크립트 명령어

```bash
# 코드 품질 검사
npm run code-quality

# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 포맷팅 검사
npm run format:check

# 타입 검사
npm run type-check
```

### IDE 설정

VS Code에서 다음 확장 프로그램을 설치하세요:
- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

