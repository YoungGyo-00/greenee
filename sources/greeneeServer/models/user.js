const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			nickName: {
				type: Sequelize.STRING(10),
				allowNull: false,
				unique: true,
			},
			cellphone: {
				type: Sequelize.STRING(11),
				allowNull: false,
			},
			id: {
				type: Sequelize.STRING(30),
				allowNull: false,
				primaryKey: true,
			},
			pwd: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
			},
			age: {
				type: Sequelize.INTEGER,
				allowNull: true,
			}
		}, {
			sequelize,
			timestamps: true,
			underscroed: false,
			modelName: 'User',
			tableName: 'users',
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}
	
	static associate(db){
		db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'nickName' });
		db.User.hasMany(db.Post, { foreignKey: 'writer', sourceKey: 'nickName' });
		db.User.hasMany(db.Group, { foreignKey: 'writer', sourceKey: 'nickName' });
	}
};