# ESLint & Prettier

## ESLint

ESLint는 ES + Lint의 합성어로 ES는 EcmaScript를 의미하고 Lint는 보푸라기라는 뜻인데 이는 프로그래밍에서 에러가 있는 코드에 표시를 달아 놓는 것을 의미한다. 즉 ESLint는 JavaScript의 스타일 가이드를 따르지 않거나 문제가 있는 안티 패턴들을 찾아주고 일관된 코드 스타일로 작성하도록 도와준다. 코딩 컨벤션 및 안티 패턴을 자동 검출 하므로 옮바른 코딩 습관을 위해 필히 사용할 것을 권장한다.



## Prettier

Prettier는 기존의 코드에 적용되어있던 스타일들을 전부 무시하고, 정해진 규칙에 따라 자동으로 코드 스타일을 정리해 주는 코드 포멧터이다. 코드 포멧터(Code Formatter)란 개발자가 작성한 코드를 정해진 코딩 스타일을 따르도록 변환해주는 도구를 말한다. ESLint와 다른점이라면 ESLint는 문법 에러를 잡아내고, 특정 문법 요소를 쓰도록 만드는 등 코드 퀄리티와 관련된 것을 고치기 위해 사용되지만 Prettier는 코드 한 줄의 최대 길이나, 탭의 길이는 몇으로 할 것인지, 따옴표는 홀따옴표(')나 쌍따옴표(")중 무엇을 사용 할 것인지 등등 코드 퀄리티보단 코딩 스타일을 일괄적으로 통일하는 도구에 가깝다.

[출처](https://velog.io/@recordboy/ESLint-Prettier-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

## 해당 앱에 적용된 ESLint와 Prettier 정보

```javascript
// ESLint
{
  "root": true,
  "extends": "@react-native-community",
  "react-native/no-inline-styles": true
}

```

```javascript
// Prettier
{
  "bracketSpacing": true,  // 객체 리터럴에서 괄호에 공백 삽입 여부
  "jsxBracketSameLine": true, // JSX의 마지막 '>'를 다음 줄로 내릴지 여부
  "singleQuote": true, // JSX에 작은 따옴표 사용 여부
  "trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  "arrowParens": "avoid", // 화살표 함수 괄호 사용 방식
  "endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름
  "tabWidth": 2 // 탭 너비
}
// 출처: https://velog.io/@kyusung/eslint-prettier-config
```

