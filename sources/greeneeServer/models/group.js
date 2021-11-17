const Sequelize = require('sequelize');

module.exports = class Group extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			title: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
		}, {
			sequelize,
			timestamps: true,
			underscored: false,
			modelName: 'Group',
			tableName: 'groups',
			paranoid: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}
	
	static associate(db) {
		db.Group.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'name' });
		db.Group.hasMany(db.Board, { foreignKey: 'groupId', sourceKey: 'id'});
	}
}