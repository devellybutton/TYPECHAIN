# 타입스크립트로 블록체인 만들기

## 1. 프로젝트 세팅

#### 새로운 프로젝트 생성, package.json 파일 생성
```
npm init -y
```
- y 옵션 (--yes) : 모든 옵션 자동 승인 

#### 타입스크립트를 devDependencies에 설치
```
npm install -D typescript
```

#### tsconfig.json 파일 생성
```
touch tsconfig.json
```

#### undici-types 의존성 에러 해결
> ../node_modules/@types/node/globals.d.ts:416:25 - error TS2792: Cannot find module 'undici-types'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

1. rm -rf node_modules package-lock.json
2. Node.js의 타입 정의를 다른 버전으로 설치
```
npm i @types/node@20.8.0
```
3. npm run build 입력시 정상 실행됨.

----

## 2. TypeScript 설정과 컴파일 과정

### 1) tsconfig.json 핵심 설정
```
{
  "compilerOptions": {
    // 컴파일된 JS 파일이 생성될 위치
    "outDir": "./dist", 
    
    // 컴파일 대상 JS 버전 (ES5, ES6 등)
    "target": "ES6",
    
    // 실행 환경 및 사용 가능한 API 정의
    "lib": ["ES6", "DOM"]
  },
  
  // 컴파일할 TypeScript 파일 위치
  "include": ["src/**/*"]
}
```
#### target
- 컴파일될 javascript 버전 지정
- 예: ES5, ES6, ES2015, ES2020 등 
- 하위 호환성을 고려해 선택

#### lib
- 사용 가능한 API 환경 정의
- 주요 옵션:
  - "DOM": 브라우저 API (window, document 등)
  - "ES6": ES6 문법 및 기능
- 미설정시 기본값: ["ES5", "ES6", "ES7", "ES2015.Promise"]
- "DOM" 속성값을 지정해주지 않아도 @types/node 라이브러리를 설치하면 typescript 컴파일러 덕분에 DOM 객체를 불러올 수 있음.
```
$npm install --save-dev @types/node
```

### 2) 컴파일 프로세스
```
{
  "scripts": {
    "build": "tsc"  // npm run build로 실행
  }
}
```
- tsc 명령어는 TypeScript 컴파일러를 실행함.
- tsconfig.json 설정에 따라 TS 파일을 JS로 변환함.

----

## 3. TypeScript 타입 정의와 JSDoc

### 1) 타입 정의
- 역할: TypeScript가 자바스크립트 코드와 API의 타입을 이해하도록 도와줌.
- 사용법: 자바스크립트 라이브러리를 TypeScript에서 사용하려면 해당 라이브러리의 타입 정의 파일(.d.ts)이 필요함.

### 2) JSDoc
- 역할: 자바스크립트 파일에 타입 정보를 주석 형식으로 추가하여 TypeScript에서 사용할 수 있게 함.
- 링크: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
- 예: 
```
// JavaScript 파일에 타입 정보 추가 (JSDoc 사용)
/** @type {string} */
const name = "Tom";

/** 
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function add(x, y) {
  return x + y;
}
```
----

## 4. 외부 라이브러리 타입 정의

- JavaScript 라이브러리 사용시 타입 정의 필요

- 방법 1: @types 패키지 설치
```
npm install --save-dev @types/라이브러리이름
```

- 방법 2: 직접 타입 정의 파일(.d.ts) 생성