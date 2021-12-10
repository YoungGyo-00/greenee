const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Group = require('./group');
const Board = require('./board');

const db = {};
const sequelize = new Sequelize(
	config.database, config.username, config.password, {
		dialect: 'mysql'
	}
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Group = Group;
db.Board = Board;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Group.init(sequelize);
Board.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Group.associate(db);
Board.associate(db);

module.exports = db;