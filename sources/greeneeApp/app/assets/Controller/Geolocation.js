import BackgroundGeolocation from 'react-native-background-geolocation';
const start = (callback) => {
  console.log('[geolocationWrapper_start]');
  var initGeoloc = {
    longitude: 0.0,
    latitude: 0.0,
    altitude: 0.0,
    speed: 0.0,
    motion: '',
    state: true,
    distance: 0.0
  };
  var geoloc = {
    longitude: 0.0,
    latitude: 0.0,
    altitude: 0.0,
    speed: 0.0,
    motion: '',
    state: true,
    distance: 0.0
  };
  const distanceCalculation = () => {
    const radians = (degrees) => {
      return (Math.PI/180)*degrees;
    }
    if (initGeoloc.longitude != 0) {
      const distance = Math.acos(Math.cos(radians(90-initGeoloc.latitude))*Math.cos(radians(90-geoloc.latitude)) +
      Math.sin(radians(90-initGeoloc.latitude))*Math.sin(radians(90-geoloc.latitude)) * 
      Math.cos(radians(initGeoloc.longitude-geoloc.longitude)))* 6378.137;
      geoloc.distance = distance;
    }
    initGeoloc = { ...geoloc };
    console.log('#### distance ####', geoloc.distance);
    return 0;
  };

  BackgroundGeolocation.onLocation(
    (location) => {
      geoloc.longitude = location.coords.longitude;
      geoloc.latitude = location.coords.latitude;
      geoloc.altitude = location.coords.altitude;
      geoloc.speed = location.coords.speed;
      geoloc.motion = location.activity.type;
      geoloc.state = location.is_moving;
      distanceCalculation();

      console.log(`
      [onLocation]\n
      위도 : ${geoloc.latitude}\n
      경도 : ${geoloc.longitude}\n
      고도 : ${geoloc.altitude}\n
      속도 : ${geoloc.speed}\n
      모션 : ${geoloc.motion}\n
      상태 : ${geoloc.state}\n
      거리 : ${geoloc.distance}
      `);

      callback({
        longitude: geoloc.longitude,
        latitude: geoloc.latitude,
        altitude: geoloc.altitude,
        speed: geoloc.speed,
        motion: geoloc.motion,
        state: geoloc.state,
        distance: geoloc.distance
      });

    },
    error => {
      console.log('[onLocation] ERROR: ', error);
    }
  );

  BackgroundGeolocation.onMotionChange(location => {
    console.log("[motionchange] ", location);
  });
  
  // This handler fires on HTTP responses
  BackgroundGeolocation.onHttp(response => {
    console.log("[http] ", response);
  });
  
  // This event fires when a change in motion activity is detected
  BackgroundGeolocation.onActivityChange(activityEvent => {
    console.log("[activitychange] ", activityEvent);
  });
  
  // This event fires when the user toggles location-services authorization
  BackgroundGeolocation.onProviderChange(providerEvent => {
    console.log("[providerchange] ", providerEvent);
  });
  

  BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 5,
    stopTimeout: 5,
    stopOnTerminate: false,
    autoSync: false,
    maxRecordsToPersist: 0, // 위치유지 비활성화
    heartbeatInterval: 60,
    preventSuspend: false,
    notification: {
      title: 'Greenee와 함께하는 즐거운 플로깅',
      text: '오늘도 좋은 하루되세요!'
    },
  },
    state => {
      console.log(
        '- BackgroundGeolocation is configured and ready: ',
        state.enabled,
      );
      if (!state.enabled) {
        BackgroundGeolocation.start(function () {
          console.log('- Start success');
          BackgroundGeolocation.changePace(true);
        });
      }
    },
  );
}

const stop = () => {
  console.log('[stopGeolocation]');
  BackgroundGeolocation.removeListeners();
  BackgroundGeolocation.stop();
  return 0;
}
export { start, stop };