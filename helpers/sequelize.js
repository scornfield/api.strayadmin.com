var sequelize = new Sequelize(config.dbName, config.dbUser, null, {
	host: config.dbHost,
	dialect: 'mysql',
	logging: console.log, // TODO: turn this off when we're production ready

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

module.exports = sequelize;