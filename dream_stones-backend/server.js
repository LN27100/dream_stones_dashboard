const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const cors = require('cors');

// Créer une instance de l'application Express
const app = express();
const port = 3000;

// Configuration CORS qui contrôle les requêtes entrantes
const corsOptions = {
  origin: 'http://localhost:8080', //domaines sont autorisés à accéder à votre serveur
  methods: 'GET, POST', //méthodes HTTP sont autorisées dans les requêtes CORS
  allowedHeaders: 'Content-Type,Authorization', //spécifie quels en-têtes HTTP sont autorisés dans les requêtes CORS. 
};
app.use(cors(corsOptions));

// Configurer la connexion à la base de données MySQL
const sequelize = new Sequelize('dream_stones_project', 'LN27100', '02111979Lh#', {
  host: 'localhost',
  dialect: 'mysql'
});

// Définir le modèle Admin
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
  company_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admin',
  timestamps: false
});

// Middleware pour parser les données JSON envoyées dans le corps de la requête
app.use(bodyParser.json());

// Middleware pour parser les données de formulaire envoyées dans le corps de la requête
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données MySQL établie');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

// Route pour créer un nouvel administrateur
app.post('/admins', async (req, res) => {
  const { last_name, first_name, email, password, company_name } = req.body;

  try {
    // Créer un nouvel administrateur
    const newAdmin = await Admin.create({
      last_name,
      first_name,
      email,
      password,
      company_name
    });

    res.status(201).json({ message: 'Administrateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'administrateur' });
  }
});


// ADMINISTRATEUR

// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Rechercher l'administrateur dans la base de données par e-mail
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.json({ success: false, message: 'Identifiants incorrects. Veuillez réessayer.' });
    }

    // Vérifier si le mot de passe est correct
    if (admin.password === password) {
      // Mot de passe correct, connexion réussie
      return res.json({ success: true, message: 'Connexion réussie.' });
    } else {
      // Mot de passe incorrect
      return res.json({ success: false, message: 'Identifiants incorrects. Veuillez réessayer.' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.' });
  }
});

// Route pour récupérer les données d'un administrateur par son ID
app.get('/admins/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    // Récupérer les données de l'administrateur à partir de la base de données
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

//PRODUITS

// create
app.post('/products', async (req, res) => {
  const { PRODUCT_REF, PRODUCT_DESC, PRODUCT_STOCK, PRODUCT_UNIT_PRICE, PRODUCT_ORIGIN_COUNTRY, PRODUCT_PICTURE, SPL_ID, TYPE_ID, PRODUCT_NAME, PRODUCT_COLOR } = req.body;

  try {
    // Créer un nouveau produit
    const newProduct = await Product.create({
      PRODUCT_REF,
      PRODUCT_DESC,
      PRODUCT_STOCK,
      PRODUCT_UNIT_PRICE,
      PRODUCT_ORIGIN_COUNTRY,
      PRODUCT_PICTURE,
      SPL_ID,
      TYPE_ID,
      PRODUCT_NAME,
      PRODUCT_COLOR
    });

    res.status(201).json({ message: 'Produit ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
  }
});

// read
app.get('/products', async (req, res) => {
  try {
    // Récupérer tous les produits
    const products = await Product.findAll();

    res.status(200).json({ products });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// update
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { PRODUCT_REF, PRODUCT_DESC, PRODUCT_STOCK, PRODUCT_UNIT_PRICE, PRODUCT_ORIGIN_COUNTRY, PRODUCT_PICTURE, SPL_ID, TYPE_ID, PRODUCT_NAME, PRODUCT_COLOR } = req.body;

  try {
    // Rechercher le produit à mettre à jour
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé.' });
    }

    // Mettre à jour les attributs du produit
    product.PRODUCT_REF = PRODUCT_REF;
    product.PRODUCT_DESC = PRODUCT_DESC;
    product.PRODUCT_STOCK = PRODUCT_STOCK;
    product.PRODUCT_UNIT_PRICE = PRODUCT_UNIT_PRICE;
    product.PRODUCT_ORIGIN_COUNTRY = PRODUCT_ORIGIN_COUNTRY;
    product.PRODUCT_PICTURE = PRODUCT_PICTURE;
    product.SPL_ID = SPL_ID;
    product.TYPE_ID = TYPE_ID;
    product.PRODUCT_NAME = PRODUCT_NAME;
    product.PRODUCT_COLOR = PRODUCT_COLOR;

    // Sauvegarder les modifications
    await product.save();

    res.status(200).json({ success: true, message: 'Produit mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du produit' });
  }
});

// delete
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Rechercher le produit à supprimer
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé.' });
    }

    // Supprimer le produit de la base de données
    await product.destroy();

    res.status(200).json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du produit' });
  }
});

// compter les produits dans la table
app.get('/dashboard/totalStones', async (req, res) => {
  try {
    // Compter le nombre de pierres dans la table 'product'
    const count = await Product.count();

    res.status(200).json({ total_stones: count });
  } catch (error) {
    console.error('Erreur lors du comptage des pierres :', error);
    res.status(500).json({ error: 'Erreur lors du comptage des pierres' });
  }
});



// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur écoute sur le port ${port}`);
});
