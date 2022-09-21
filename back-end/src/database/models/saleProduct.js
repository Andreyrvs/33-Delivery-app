module.exports = (Sequelize, _DataTypes) => {
  const SaleProduct = Sequelize.define('SaleProduct', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    saleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'sale_id'
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'product_id'
    }
  }, {
    tableName: 'products',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId'
    });

    models.Product.belongsToMany(models.Sales, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId'
    });
  }

  return SaleProduct;
};