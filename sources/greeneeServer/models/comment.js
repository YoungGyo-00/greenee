const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			comment: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
		}, {
			sequelize,
			timestamps: true,
			underscroed: false,
			modelName: 'Comment',
			tableName: 'comments',
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}
	
	static associate(db){
		db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'name' });
		db.Comment.belongsTo(db.Post, { foreignKey: 'postId', targetKey: 'id' });
	}
};