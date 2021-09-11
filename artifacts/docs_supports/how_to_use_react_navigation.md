# React Navigation

1. 아래 명령어를 순서대로 입력한다.

```bash
$ yarn add @react-navigation/native
$ yarn add react-native-screens react-native-safe-area-context
```

2. android/app/src/main/java/[my package name]/MainActivity.java 파일에서 다음을 추가한다.
   + 이는 Activity가 다시 시작되는 동안 일관되게 지속되지 않는 View state와 관련된 충돌을 방지하는데 필요하다고 한다. (6.x 버전부터 생긴 것 같네요.)

```java
import android.os.Bundle;

//~~~~~~~~~~~~~~~~
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

3. 사용할 네이게이션에 해당하는 모듈을 다운받는다.

```bash
$ yarn add @react-navigation/bottom-tabs
```

