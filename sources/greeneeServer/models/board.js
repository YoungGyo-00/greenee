const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			title: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			content: {
				type: Sequelize.STRING(140),
				allowNull: false,
			},
		}, {
			sequelize,
			timestamps: true,
			underscored: false,
			modelName: 'Board',
			tableName: 'boards',
			paranoid: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}
	
	static associate(db) {
		db.Board.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'name' });
		db.Board.belongsTo(db.Group, { foreignKey: 'groupId', sourceKey: 'id'});
		db.Board.hasMany(db.Comment, { foreignKey: 'boardId', sourceKey: 'id' });
	}
}