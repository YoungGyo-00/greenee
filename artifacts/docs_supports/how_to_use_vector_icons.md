# Tab navigation tabBar Icons

+ [custom Icons](https://webruden.tistory.com/186)
+ use react-native-vector-icons

```bash
$ yarn add react-native-vector-icons
```

``` java
// android/app/build.gradle
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

// 이후 android studio에서 invalidate cache/restart & yanr android 
```



