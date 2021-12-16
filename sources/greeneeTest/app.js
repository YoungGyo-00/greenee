const dbConfig = {
  host: '127.0.0.1',
  user: "greenuser",
  password: "greenpass",
  database: "greenee"
}

// 익스프레스 기본 모듈 불러오기
const express = require('express');
const path = require('path');
const cors = require("cors");

// 익스프레스 객체 생성
const app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 8080);

// express 내 body-parser middle-ware
app.use(cors());
app.use('/static',express.static('D:\\uploads'),()=>{
  console.log(__dirname);
});


// Express 서버 시작
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 시작');
})

// 미들웨어란? 웹 요청과 응답에 관한 정보를 사용해 필요한 처리를 진행할 수 있도록
// 독립된 함수로 분리한 모듈
// body-parser
app.use(express.json());


// mysql & mybatis 
const mybatisMapper = require('mybatis-mapper');
const mysqldb = require('mysql');
mybatisMapper.createMapper(['./mapper.xml']);

// multer 이미지 업로드
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
  filename: function (req, file, cb) {
    let date = new Date();
    let id = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() + ".jpg"
    cb(null, id);
  }
});
const upload = multer({ storage: storage });
// const upload = multer({dest: 'uploads/'})


const router = express.Router();

// 라우터란? 클라이언트의 요청 패스를 보고 요청 정보를 처리할 수 있는 곳으로 기능을 전달해 주는 역할
// 회원가입 시
router.route('/signUp').post((req, res) => {
  console.log('[Router : signUp] : ', req.body);

  // DB 객체 생성
  var connection = mysqldb.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  });

  // DB연결 
  connection.connect((err) => {
    if (err) {
      console.log('[DB connection error] : ', err);
      res.status(500).send({ errorMessage: err.message });
      return;
    }
    let param = {
      id: req.body.id,
      pwd: req.body.pwd,
      nickName: req.body.nickName,
      cellphone: req.body.cellphone
    }
    let dupQuery = mybatisMapper.getStatement('greenee.user', 'duplicatedUser', param);
    let signUpQuery = mybatisMapper.getStatement('greenee.user', 'signupUser');

    connection.query(dupQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ errorMessage: err.message });
        return;
      }
      if (results.length > 0) {
        res.status(403).send({ errorMessage: '해당 아이디, 비밀번호, 전화번호로 회원가입이 되어있습니다.' });
      } else {
        connection.query(signUpQuery, param, (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send({ errorMessage: err.message });
            return;
          }
          console.log(results);
          res.status(200).end();
        })
      }
      connection.end((err) => {
        console.log('[DB connection end]');
      });
    });
  });
});

router.route('/signIn').post((req, res) => {
  console.log('[Router : signIn] : ', req.body);

  // DB 객체 생성
  var connection = mysqldb.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  });

  // DB연결 
  connection.connect((err) => {
    if (err) {
      console.log('[DB connection error] : ', err);
      return;
    }

    let param = {
      id: req.body.id,
      pwd: req.body.pwd
    };

    let query = mybatisMapper.getStatement('greenee.user', 'signinUser', param);
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ errorMessage: err.message });
        return;
      }
      if (results.length == 0) {
        res.status(403).send({ errorMessage: '아이디 혹은 비밀번호가 틀렸습니다.' });
      } else {
        res.status(200).send({ userInfo: results[0] }).end();
      }
    });
  });
});

router.route('/update').post((req, res) => {
  console.log('[Router : update] : ', req.body);

  // DB 객체 생성
  var connection = mysqldb.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  });

  // DB연결 
  connection.connect((err) => {
    if (err) {
      console.log('[DB connection error] : ', err);
      return;
    }

    let param = {
      id: req.body.id,
      nickName: req.body.nickName,
      cellphone: req.body.cellphone,
      age: req.body.age || null,
      gender: req.body.gender || null
    };

    let query = mybatisMapper.getStatement('greenee.user', 'updateUser', param);
    console.log(query);
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ errorMessage: err.message });
        return;
      }
      if (results.length == 0) {
        res.status(403).send({ errorMessage: '아이디 혹은 비밀번호가 틀렸습니다.' });
      } else {
        res.status(200).send({ userInfo: results[0] }).end();
      }
    });
  });
});

router.post('/upload', upload.array('image'), (req, res) => {
  console.log('[Router : upload] : ', req.body, req.files);

  let obj = [];
  let result = JSON.parse(JSON.stringify(req.body));

  if (typeof (result.id) == "string") {
    obj.push({
      id: result.id,
      latitude: result.latitude,
      longitude: result.longitude,
      path: req.files[0].path,
      timeStamp: result.timeStamp
    });
  } else {
    let index = result.id.length;
    for (let i = 0; i < index; i++) {
      obj.push({
        id: result.id[i],
        latitude: result.latitude[i],
        longitude: result.longitude[i],
        path: req.files[i].path,
        timeStamp: result.timeStamp[i]
      });
    }
  }

  // DB 객체 생성
  var connection = mysqldb.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  });

  // DB연결 
  connection.connect((err) => {
    if (err) {
      console.log('[DB connection error] : ', err);
      return;
    }

    obj.map((item) => {
      let query = mybatisMapper.getStatement('greenee.user', 'insertMeta');
      connection.query(query, item, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send({ errorMessage: err.message });
          return;
        }
        if (results.length == 0) {
          res.status(403).send({ errorMessage: '서버가 불안정하여 저장에 실패했습니다.' });
        } else {
          res.status(200).send().end();
        }
      });
    });
  });
});

router.route('/getAllData').get((req, res) => {
  console.log('[Router : getAllData] : ', req.body);

  // DB 객체 생성
  var connection = mysqldb.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  });

  connection.connect((err) => {
    if (err) {
      console.log('[DB connection error] : ', err);
      res.status(500).send({ errorMessage: err.message });
      return;
    }
    
    let query = mybatisMapper.getStatement('greenee.user', 'getAllData');

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ errorMessage: err.message });
        return;
      }
      let result = JSON.parse(JSON.stringify(results));
      console.log(result);

      res.status(200).send(result);
      connection.end((err) => {
        console.log('[DB connection end]');
      });
    });
  });
});

app.use('/user', router);

app.all('*', (req, res) => {
  res.status(404).send({ errorMessage: '요청하신 url에 해당하는 api가 존재하지 않습니다.' });
});