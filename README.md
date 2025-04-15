
# 📝 TaskWave - To-Do List App

TaskWave est une application **MERN Stack** complète de gestion des tâches avec une interface moderne et des fonctionnalités utiles pour organiser votre quotidien efficacement.

---

## 🚀 Étape 1 : Cloner le projet

```bash
git clone https://github.com/Bouachraf/TodoList.git
cd TodoList
```

---

## 🛠️ Étape 2 : Installation des dépendances

### 📦 Backend - Spring Boot

```bash
cd taskwave-backend
npm install
echo "MONGO_URI=mongodb://localhost:27017/taskwave" > .env
echo "PORT=5000" >> .env
```

> ⚠️ Assurez-vous d’avoir MongoDB installé.

### 🌐 Frontend - React.js + TailwindCSS + PrimeReact

```bash
cd ../taskwave-frontend
npm install
```

> ⚠️ Node.js 16+ recommandé.

---

## ▶️ Étape 3 : Lancer l’application

### ▶️ Backend

```bash
cd taskwave-backend
npm run dev
```

Par défaut, le backend s'exécute sur : `http://localhost:5000`

### ▶️ Frontend

```bash
cd ../taskwave-frontend
npm start
```

Par défaut, le frontend s'exécute sur : `http://localhost:5173`

---

## ✨ Fonctionnalités principales

### ✅ Gestion des tâches
- Ajouter / Modifier / Supprimer des tâches
- Marquer une tâche comme terminée
- Définir la **priorité** (Low, Medium, High)
- Ajouter une **description**
- Sélectionner une **date limite** via DatePicker

🖼️ _Aperçu :_
![tasklist](./screenshots/task-list.png)

---

### 🗂️ Filtrage et affichage amélioré
- Filtrer par tâches actives/complétées	
- Visualisation des tâches sous forme de **cartes** ou **tableaux** (avec PrimeReact)
- Icônes dynamiques selon la priorité
- Texte barré et grisé si tâche terminée

🖼️ _Exemple affichage avec priorité & statut :_
![priority](./screenshots/priority-status.png)

---

### 🛠️ Mode édition rapide

- Modifier les champs d’une tâche existante (titre, description, priorité, date)

🖼️ _Formulaire d’édition :_
![edit](./screenshots/edit-task.png)

---

## 🧰 Stack technique

- **Frontend** : React.js, Tailwind CSS, PrimeReact, Vite
- **Backend** : Express.js, Node Js
- **Base de données** : MongoDB compass
- **API REST** : CRUD des tâches

---

## 📂 Structure du projet

```
TodoList/
├── taskwave-backend/
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   ├── server.js        # Serveur principal
│   └── package.json
└── taskwave-frontend/
    ├── public/
    ├── src/
    │   ├── components/  # Composants React
    │   ├── styles/      # Fichiers CSS
    │   ├── App.js
    │   └── index.js
    └── package.json
---

## 🙌 Auteurs

- [@Bouachraf](https://github.com/Bouachraf)

---

## 📜 Licence

MIT License
