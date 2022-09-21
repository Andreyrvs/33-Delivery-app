module.exports = (Sequelize, _DataTypes) => {
  const Product = Sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    price: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: true,
    },
    urlImage: {
      type: Sequelize.STRING(200),
      allowNull: false,
      field: 'url_image',
    },
  }, {
    tableName: 'products',
    timestamps: false,
  });

  return Product;
};