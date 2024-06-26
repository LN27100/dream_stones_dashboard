//  configure et exécute le serveur backend de l'application, qui gère les requêtes et les réponses entre le frontend et la base de données

import express from 'express';
// Module pour analyser le corps des requêtes HTTP
import bodyParser from 'body-parser';
// Bibliothèque pour interagir avec les bases de données relationnelles
import { Sequelize, Model, DataTypes } from 'sequelize';
// Module pour gérer les requêtes CORS
import cors from 'cors';
// Bibliothèque pour hacher les mots de passe
import { hash, compare } from 'bcrypt';


const { json, urlencoded } = bodyParser;
// Crée une instance de l'application Express
const app = express();

// Définit le numéro de port sur 3000
const port = 3000;

// Options CORS spécifiant les paramètres d'origine, de méthodes et d'en-têtes autorisés
const corsOptions = {
  origin: 'http://localhost:8080', // Autorise uniquement les requêtes depuis ce domaine
  methods: 'GET, POST, PUT, DELETE', // Autorise ces méthodes HTTP
  allowedHeaders: 'Content-Type,Authorization', // Autorise ces en-têtes HTTP
};

app.use(cors(corsOptions));

// Initialise une connexion à la base de données MySQL avec Sequelize
const sequelize = new Sequelize('dream_stones_project', 'LN27100', '02111979Lh#', {
  host: 'localhost', 
  dialect: 'mysql' 
});


// Définition des modèles qui itéragissent avec les tables de la bdd

// MODELE ADMIN

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

app.use(json());
app.use(urlencoded({ extended: true }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données MySQL établie');
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
  }
})();

app.post('/logout', async (req, res) => {
  try {      
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
});


app.post('/admins', async (req, res) => {
  const { last_name, first_name, email, password } = req.body;

  try {
    // Hasher le mot de passe
    const hashedPassword = await hash(password, 10);

    // CREER un nouvel ADMINISTRATEUR
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

/// ROUTE pour RECUPERER un ADMINISTRATEUR par son identifiant
app.get('/admins/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId, { attributes: ['id', 'last_name', 'first_name', 'email'] });

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Administrateur non trouvé.' });
    }

    return res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'administrateur :', error);
    return res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la récupération de l\'administrateur.' });
  }
});


// ROUTE pour RECUPERER la liste des ADMINISTRATEURS
app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.findAll({ 
      attributes: ['id', 'last_name', 'first_name', 'email'] 
    });

    res.status(200).json({ admins });
  } catch (error) {
    console.error('Erreur lors de la récupération des administrateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des administrateurs' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.json({ success: false, message: 'Identifiants incorrects. Veuillez réessayer.' });
    }

    const passwordMatch = await compare(password, admin.password);

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

// TROUVER UN ADMIN
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




// MODELE PRODUITS
class Product extends Model {}

Product.init({
  PRODUCT_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PRODUCT_REF: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  PRODUCT_DESC: {
    type: DataTypes.STRING(750),
    allowNull: false
  },
  PRODUCT_STOCK: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PRODUCT_UNIT_PRICE: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false
  },
  PRODUCT_ORIGIN_COUNTRY: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  PRODUCT_PICTURE: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  SPL_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TYPE_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PRODUCT_NAME: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  PRODUCT_COLOR: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'product',
  timestamps: false
});

// ROUTE pour CREER un PRODUIT
app.post('/products', async (req, res) => {
  const { PRODUCT_REF, PRODUCT_DESC, PRODUCT_STOCK, PRODUCT_UNIT_PRICE, PRODUCT_ORIGIN_COUNTRY, PRODUCT_PICTURE, SPL_ID, TYPE_ID, PRODUCT_NAME, PRODUCT_COLOR } = req.body;

  try {
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

    res.status(201).json({ message: 'Pierre ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
  }
});


// ROUTE pour RECUPERER la liste des PIERRES
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ attributes: ['PRODUCT_ID', 'PRODUCT_REF', 'PRODUCT_DESC', 'PRODUCT_STOCK', 'PRODUCT_UNIT_PRICE', 'PRODUCT_ORIGIN_COUNTRY', 'PRODUCT_PICTURE', 'SPL_ID', 'TYPE_ID', 'PRODUCT_NAME', 'PRODUCT_COLOR'] });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// ROUTE pour RECUPERER les STATS sur les COULEURS des PIERRES
app.get('/dashboard/stoneColors', async (req, res) => {
  try {
    const colorCounts = await Product.findAll({
      attributes: ['PRODUCT_COLOR', [sequelize.fn('COUNT', sequelize.col('PRODUCT_COLOR')), 'count']],
      group: ['PRODUCT_COLOR']
    });

    const stoneColors = colorCounts.map(colorCount => ({
      color: colorCount.PRODUCT_COLOR,
      count: colorCount.get('count')
    }));

    res.status(200).json({ stone_colors: stoneColors });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques sur les couleurs des pierres :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques sur les couleurs des pierres' });
  }
});


// ROUTE pour RECUPERER les détails d'une PIERRE par son ID
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  console.log('Tentative de récupération des détails du produit avec l\'ID :', productId);

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      console.log('Produit non trouvé pour l\'ID :', productId);
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du produit :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des détails du produit' });
  }
});


// ROUTE pour METTRE A JOUR (UPDATE) une PIERRE
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { PRODUCT_REF, PRODUCT_DESC, PRODUCT_STOCK, PRODUCT_UNIT_PRICE, PRODUCT_ORIGIN_COUNTRY, PRODUCT_PICTURE, SPL_ID, TYPE_ID, PRODUCT_NAME, PRODUCT_COLOR } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé.' });
    }

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

    await product.save();

    res.status(200).json({ success: true, message: 'Produit mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du produit' });
  }
});

// ROUTE pour SUPPRIMER une PIERRE
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


// ROUTE pour obtenir le TOTAL des PIERRES
app.get('/dashboard/totalStones', async (req, res) => {
  try {
    const count = await Product.count();

    res.status(200).json({ total_stones: count });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du comptage des pierres' });
  }
});


// MODELE COMMANDES 

// Définir la classe Order
class Order extends Model {}

Order.init({
  ORDERS_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ORDERS_SHIPPING: DataTypes.STRING(50),
  ORDERS_PAYEMENT_MODE: DataTypes.STRING(50),
  ORDERS_DELETE_ARTICLE: DataTypes.STRING(50),
  ORDERS_NEW_PRICE: DataTypes.DECIMAL(9, 2),
  ORDER_STATUS: DataTypes.STRING(50),
  ORDERS_SHIPPING_FEES: DataTypes.DECIMAL(9, 2),
  ORDER_CANCELLATION: DataTypes.STRING(50),
  ORDERS_TOTAL_PRICE: DataTypes.DECIMAL(9, 2),
  ORDERS_TOTAL_QUANTITY: DataTypes.INTEGER,
  ORDERS_REF: {
    type: DataTypes.STRING(50),
    unique: true
  },
  ORDERS_DATE: DataTypes.DATE,
  ORDERS_QUANTITY: DataTypes.INTEGER,
  USERPROFILE_ID: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  timestamps: false
});

// ROUTE pour COMPTER le nombre TOTAL de COMMANDES (ORDERS)
app.get('/orders/count', async (req, res) => {
  try {
    const count = await Order.count();
    res.status(200).json({ total_orders: count });
  } catch (error) {
    console.error('Erreur lors du comptage des commandes :', error);
    res.status(500).json({ error: 'Erreur lors du comptage des commandes' });
  }
});

// ROUTE pour RECUPERER les détails de toutes les COMMANDES VALIDEES
app.get('/orders/validated', async (req, res) => {
  try {
    const validatedOrders = await Order.findAll({ where: { ORDER_STATUS: 'validée' } });
    res.status(200).json({ validated_orders: validatedOrders });
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes validées :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes validées' });
  }
});

// ROUTE Pour RECUPERER les détails de toutes les COMMANDES EN ATTENTE DE VALIDATION
app.get('/orders/pending', async (req, res) => {
  try {
    const pendingOrders = await Order.findAll({ where: { ORDER_STATUS: 'en attente de validation' } });
    res.status(200).json({ pending_orders: pendingOrders });
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes en attente de validation :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes en attente de validation' });
  }
});

// ROUTE pour RECUPERER le NOMBRE de commandes VALIDEES et le NOMBRE de commandes EN ATTENTE (ORDERS)
app.get('/dashboard/orderStatusCount', async (req, res) => {
  try {
    const [validatedResult] = await sequelize.query(`
      SELECT COUNT(*) AS nombre_validées
      FROM orders
      WHERE ORDER_STATUS = 'validée';
    `);

    const [pendingResult] = await sequelize.query(`
      SELECT COUNT(*) AS nombre_en_attente
      FROM orders
      WHERE ORDER_STATUS = 'en attente de validation';
    `);

    res.status(200).json({ 
      nombre_validées: validatedResult[0].nombre_validées,
      nombre_en_attente: pendingResult[0].nombre_en_attente
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de commandes par statut :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre de commandes par statut' });
  }
});


// ROUTE pour RECUPERER le NOMBRE de commandes COMPLETÉES (ORDERS)
app.get('/dashboard/completedOrdersCount', async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      SELECT 
        COUNT(*) AS nombre_complétées
      FROM 
        orders
      WHERE 
        ORDER_STATUS = 'complétée';
    `);

    res.status(200).json({ 
      nombre_complétées: result[0].nombre_complétées
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de commandes complétées :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre de commandes complétées' });
  }
});

// ROUTE pour RECUPERER le nombre de commandes par mois
app.get('/dashboard/ordersByMonth', async (req, res) => {
  try {
    const ordersByMonth = await Order.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('ORDERS_DATE')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('ORDERS_ID')), 'count']
      ],
      group: [sequelize.fn('MONTH', sequelize.col('ORDERS_DATE'))]
    });

    res.status(200).json({ orders_by_month: ordersByMonth });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de commandes par mois :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre de commandes par mois' });
  }
});



// MODELE UTILISATEUR

// Définir la classe Userprofile
class UserProfile extends Model {}

UserProfile.init({
  USERPROFILE_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  sequelize,
  modelName: 'UserProfile',
  tableName: 'userprofil',
  timestamps: false
});

// ROUTE pour COMPTER le nombre d'UTILISATEURS
app.get('/userprofiles/count', async (req, res) => {
  try {
    const count = await UserProfile.count();
    res.status(200).json({ total_userprofiles: count });
  } catch (error) {
    console.error('Erreur lors du comptage des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors du comptage des utilisateurs' });
  }
});



app.listen(port, () => {
  console.log(`Serveur écoute sur le port ${port}`);
});
