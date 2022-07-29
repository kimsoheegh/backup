const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                loginId: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true
                },
                email: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING(200),
                    allowNull: false
                },
                nickname: {
                    type: DataTypes.STRING(30),
                    unique: true
                },
                phoneNumber: {
                    type: DataTypes.STRING(30),
                    allowNull: true
                },
                address: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                }
            },
            {
                modelName: 'User',
                tableName: 'Users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.User.belongsToMany(db.Product, {
            through: 'ProductThumbsUp'
        })
        db.User.belongsToMany(db.Product, {
            through: 'Views',
            as: 'Viewer'
        })
        db.User.belongsToMany(db.Product, {
            through: 'rate'
        })
    }
}