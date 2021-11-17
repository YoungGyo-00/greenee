const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const mainRouter = require('./routes');
const authRouter = require('./routes/auth');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const groupsRouter = require('./routes/groups');
const { isLoggedIn } = require('./middlewares');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8001); 

sequelize.sync({ force: false })
	.then(() => {
	console.log('데이터베이스 연결 성공');
	})
	.catch((err) => {
	console.error(err);
	});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/img', express.static(path.join(__dirname, 'Plogging')));
app.use('/img_post', express.static(path.join(__dirname, 'Campaigns')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true,
		secure: false,
	},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/main', isLoggedIn, mainRouter);
app.use('/auth', authRouter);
app.use('/comments', isLoggedIn, commentsRouter);
app.use('/posts', isLoggedIn, postsRouter);
app.use('/groups', isLoggedIn, groupsRouter);

app.use((req,res,next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next)=> {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기 중');
});