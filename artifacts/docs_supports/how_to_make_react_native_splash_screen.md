# react-native-make

````bash
# yarn 또는 npm으로 설치
$ yarn add -D @bam.tech/react-native-make

# 경로에 있는 이미지의 크기는 최소 3000px*3000px 이다.
# root를 기준으로 상대경로 이다.
$ react-native set-splash --path ./src/img/splash.png --resize center --background "#FFFFFF"

# 위 과정을 모두 거치고 나면 android/app/src/res 에 파일이 자동 생성된다.
````





# react-native-splash-screen

```bash
# yanr 또는 npm 으로 설치 
$ yarn add react-native-splash-screen
```

``` react
// 최상위 파일에서 splash screen을 종료시키는 코드를 추가한다. 
import SplashScreen from 'react-native-splash-screen';

const App = () => {
    useEffect(()=>{
        SplashScreen.hide();
    },[]);
}
```

```java
// MainActivity.java 

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    
  @Override
  protected String getMainComponentName() {
    return "greeneeApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
 	super.onCreate(null);
	}
}
```

