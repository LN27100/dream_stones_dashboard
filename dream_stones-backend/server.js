const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

const sequelize = new Sequelize('dream_stones_project', 'LN27100', '02111979Lh#', {
  host: 'localhost',
  dialect: 'mysql'
});

class Admin extends Model {}
Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admin',
  timestamps: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données MySQL établie');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

  app.post('/admins', async (req, res) => {
    const { last_name, first_name, email, password } = req.body;
  
    try {
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créer un nouvel administrateur
      await Admin.create({
        last_name,
        first_name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'Administrateur créé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la création de l\'administrateur :', error);
      res.status(500).json({ error: 'Erreur lors de la création de l\'administrateur' });
    }
  });
  
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.json({ success: false, message: 'Identifiants incorrects. Veuillez réessayer.' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
      return res.json({ success: true, message: 'Connexion réussie.' });
    } else {
      return res.json({ success: false, message: 'Identifiants incorrects. Veuillez réessayer.' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.' });
  }
});

app.get('/admins/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Administrateur non trouvé.' });
    }

    return res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'administrateur :', error);
    return res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la récupération des données de l\'administrateur.' });
  }
});

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PRODUCT_REF: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  PRODUCT_DESC: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'product',
  timestamps: false
});

app.post('/products', async (req, res) => {
  const { PRODUCT_REF, PRODUCT_DESC } = req.body;

  try {
    const newProduct = await Product.create({
      PRODUCT_REF,
      PRODUCT_DESC,
    });

    res.status(201).json({ message: 'Produit ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ products });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { PRODUCT_REF, PRODUCT_DESC } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé.' });
    }

    product.PRODUCT_REF = PRODUCT_REF;
    product.PRODUCT_DESC = PRODUCT_DESC;

    await product.save();

    res.status(200).json({ success: true, message: 'Produit mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du produit' });
  }
});

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé.' });
    }

    await product.destroy();

    res.status(200).json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du produit' });
  }
});

app.get('/dashboard/totalStones', async (req, res) => {
  try {
    const count = await Product.count();

    res.status(200).json({ total_stones: count });
  } catch (error) {
    console.error('Erreur lors du comptage des pierres :', error);
    res.status(500).json({ error: 'Erreur lors du comptage des pierres' });
  }
});

app.listen(port, () => {
  console.log(`Serveur écoute sur le port ${port}`);
});
