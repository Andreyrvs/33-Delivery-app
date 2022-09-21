/**
   * @param {import('sequelize').Sequelize } Sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */

module.exports = (Sequelize, _DataTypes) => {
  const Sale = Sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',  
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id',
    },
    sellerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',  
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'seller_id',
    },
    totalPrice: {
      type: Sequelize.DECIMAL(9, 2),
      allowNull: false,
      field: 'total_price',
    },
    deliveryAddress: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'delivery_address',
    },
    deliveryNumber: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'delivery_number',
    },
    saleDate: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'sale_date',
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sales',
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
    }),
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
    })
  };

  return Sale;
};