
# 🎸 Rock in Turin Dance School - Guida Completa Setup Locale

## 📋 Indice
- [Prerequisiti](#prerequisiti)
- [Installazione Database MongoDB](#installazione-database-mongodb)
- [Setup Progetto](#setup-progetto)
- [Configurazione Ambiente](#configurazione-ambiente)
- [Avvio Applicazione](#avvio-applicazione)
- [Funzionalità Admin CRUD](#funzionalità-admin-crud)
- [API Endpoints](#api-endpoints)
- [Gestione Media](#gestione-media)
- [Troubleshooting](#troubleshooting)

## 🛠️ Prerequisiti

### Software Richiesto
```bash
# Node.js (versione 18 o superiore)
node --version  # Deve essere >= 18.0.0
npm --version   # Deve essere >= 8.0.0

# MongoDB (versione 6.0 o superiore)
mongod --version  # Deve essere >= 6.0.0

# Git
git --version
```

### Sistema Operativo
- Windows 10/11
- macOS 10.15+
- Linux Ubuntu 20.04+

## 🗄️ Installazione Database MongoDB

### Windows
```bash
# 1. Scarica MongoDB Community Server
# https://www.mongodb.com/try/download/community

# 2. Installa MongoDB come servizio Windows
# Durante l'installazione, seleziona "Install MongoDB as a Service"

# 3. Avvia MongoDB
net start MongoDB

# 4. Verifica installazione
mongo --version
```

### macOS
```bash
# 1. Installa con Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# 2. Avvia MongoDB
brew services start mongodb/brew/mongodb-community

# 3. Verifica installazione
mongosh --version
```

### Linux (Ubuntu/Debian)
```bash
# 1. Importa la chiave pubblica
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# 2. Aggiungi repository MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 3. Aggiorna pacchetti e installa
sudo apt-get update
sudo apt-get install -y mongodb-org

# 4. Avvia MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# 5. Verifica installazione
mongosh --version
```

## 🚀 Setup Progetto

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/rock-turin-dance-cms.git
cd rock-turin-dance-cms
```

### 2. Installazione Dipendenze Frontend
```bash
# Installa dipendenze React
npm install
```

### 3. Installazione Dipendenze Backend
```bash
# Crea directory server se non esiste
mkdir -p server

# Vai nella directory server
cd server

# Inizializza package.json
npm init -y

# Installa dipendenze backend
npm install express mongoose cors dotenv multer bcryptjs jsonwebtoken nodemailer

# Installa dipendenze di sviluppo
npm install --save-dev nodemon concurrently

# Torna alla root
cd ..
```

### 4. Struttura Directory
```
rock-turin-dance-cms/
├── src/                    # Frontend React
├── server/                 # Backend Node.js
│   ├── config/            # Configurazioni database
│   ├── controllers/       # Controller API
│   ├── models/           # Modelli dati
│   ├── routes/           # Route API
│   ├── middleware/       # Middleware
│   ├── uploads/          # File caricati
│   └── server.js         # Server principale
├── public/
└── README-LOCAL-SETUP.md
```

## ⚙️ Configurazione Ambiente

### 1. File .env (Root del progetto)
```bash
# Crea file .env nella root
touch .env
```

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rock_turin_dance
DB_NAME=rock_turin_dance

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rockabilly2024!

# Email Configuration (Optional - per newsletter)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./server/uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,video/mp4,video/mov

# Frontend Configuration
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Rock in Turin Dance School
```

### 2. Package.json Scripts (Root)
Aggiungi questi script al `package.json` principale:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client": "vite",
    "server": "cd server && nodemon server.js",
    "build": "vite build",
    "start": "cd server && node server.js",
    "setup-db": "node server/scripts/setupDatabase.js"
  }
}
```

## 🏃‍♂️ Avvio Applicazione

### 1. Setup Database
```bash
# Assicurati che MongoDB sia in esecuzione
# Windows:
net start MongoDB

# macOS:
brew services start mongodb/brew/mongodb-community

# Linux:
sudo systemctl start mongod

# Verifica connessione
mongosh
> show dbs
> exit
```

### 2. Avvio Sviluppo
```bash
# Installa concurrently globalmente (se non presente)
npm install -g concurrently

# Avvia frontend e backend insieme
npm run dev
```

### 3. URL Accesso
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 🔧 Funzionalità Admin CRUD

### Accesso Admin Portal
1. Vai su http://localhost:8080
2. Clicca sul pulsante "Admin" nella navigazione
3. Credenziali default:
   - Username: `admin`
   - Password: `rockabilly2024!`

### Gestione Corsi
```javascript
// Endpoint: /api/courses

// GET - Lista tutti i corsi
GET /api/courses?page=1&limit=10&level=beginner

// GET - Corso singolo
GET /api/courses/:id

// POST - Crea nuovo corso
POST /api/courses
{
  "name": "Rockabilly Base",
  "description": "Corso introduttivo al rockabilly",
  "instructor": "Marco Rossi",
  "time": "Martedì 19:00-20:30",
  "location": "Sala 1 - Via Roma 123",
  "price": 80,
  "level": "beginner",
  "maxParticipants": 20,
  "duration": 8,
  "startDate": "2024-01-15",
  "endDate": "2024-03-15"
}

// PUT - Aggiorna corso
PUT /api/courses/:id

// DELETE - Elimina corso
DELETE /api/courses/:id
```

### Gestione Eventi
```javascript
// Endpoint: /api/events

// GET - Lista tutti gli eventi
GET /api/events?page=1&limit=10&upcoming=true

// POST - Crea nuovo evento
POST /api/events
{
  "name": "Rockabilly Night",
  "description": "Serata di ballo rockabilly con DJ",
  "date": "2024-02-14T20:00:00Z",
  "venue": "Club Vintage - Torino",
  "ticketPrice": 15,
  "category": "rockabilly",
  "maxAttendees": 100,
  "organizer": "Rock in Turin",
  "contactInfo": "info@rockinturin.com"
}

// PUT - Aggiorna evento
PUT /api/events/:id

// DELETE - Elimina evento
DELETE /api/events/:id
```

### Gestione Iscrizioni
```javascript
// Endpoint: /api/subscriptions

// GET - Lista iscrizioni
GET /api/subscriptions?courseId=:courseId

// POST - Nuova iscrizione
POST /api/subscriptions
{
  "courseId": "course_id_here",
  "participantName": "Mario Bianchi",
  "participantEmail": "mario@example.com",
  "participantPhone": "+39 123 456 7890",
  "experienceLevel": "beginner",
  "specialRequests": "Nessuna richiesta speciale"
}

// PUT - Aggiorna stato iscrizione
PUT /api/subscriptions/:id
{
  "status": "confirmed" // pending, confirmed, cancelled
}

// DELETE - Cancella iscrizione
DELETE /api/subscriptions/:id
```

### Gestione Newsletter
```javascript
// Endpoint: /api/newsletter

// GET - Lista iscritti
GET /api/newsletter

// POST - Aggiungi iscritto
POST /api/newsletter
{
  "email": "user@example.com",
  "name": "Nome Utente"
}

// DELETE - Rimuovi iscritto
DELETE /api/newsletter/:id
```

## 📁 Gestione Media

### Upload File
```javascript
// Endpoint: /api/upload
// Metodo: POST (multipart/form-data)

// JavaScript esempio:
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('File caricato:', data.data.url);
});
```

### Tipi File Supportati
- **Immagini**: JPEG, PNG, GIF
- **Video**: MP4, MOV, AVI
- **Dimensione massima**: 10MB

### Gestione Media Database
```javascript
// Endpoint: /api/media

// GET - Lista media
GET /api/media?type=photo&category=events

// POST - Aggiungi media
POST /api/media
{
  "title": "Rockabilly Night 2024",
  "description": "Foto della serata",
  "type": "photo", // photo, video, event
  "category": "events", // events, courses, gallery
  "thumbnail": "/uploads/thumb-123.jpg",
  "fullImageUrl": "/uploads/full-123.jpg",
  "videoUrl": "/uploads/video-123.mp4"
}
```

## 🔧 API Endpoints Completi

### Autenticazione
```javascript
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Corsi
```javascript
GET    /api/courses              # Lista corsi
GET    /api/courses/:id          # Corso singolo
POST   /api/courses              # Crea corso
PUT    /api/courses/:id          # Aggiorna corso
DELETE /api/courses/:id          # Elimina corso
```

### Eventi
```javascript
GET    /api/events               # Lista eventi
GET    /api/events/:id           # Evento singolo
POST   /api/events               # Crea evento
PUT    /api/events/:id           # Aggiorna evento
DELETE /api/events/:id           # Elimina evento
```

### Iscrizioni
```javascript
GET    /api/subscriptions        # Lista iscrizioni
GET    /api/subscriptions/:id    # Iscrizione singola
POST   /api/subscriptions        # Crea iscrizione
PUT    /api/subscriptions/:id    # Aggiorna iscrizione
DELETE /api/subscriptions/:id    # Elimina iscrizione
```

### Media
```javascript
GET    /api/media                # Lista media
GET    /api/media/:id            # Media singolo
POST   /api/media                # Aggiungi media
PUT    /api/media/:id            # Aggiorna media
DELETE /api/media/:id            # Elimina media
POST   /api/upload               # Upload file
```

### Newsletter
```javascript
GET    /api/newsletter           # Lista iscritti
POST   /api/newsletter           # Aggiungi iscritto
DELETE /api/newsletter/:id       # Rimuovi iscritto
```

## 🧪 Test API con curl

### Test Corso
```bash
# Crea corso
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rockabilly Principianti",
    "description": "Corso base di rockabilly",
    "instructor": "Mario Rossi",
    "time": "Lunedì 19:00-20:30",
    "location": "Sala A",
    "price": 75
  }'

# Lista corsi
curl -X GET "http://localhost:3000/api/courses"
```

### Test Evento
```bash
# Crea evento
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Swing Night",
    "description": "Serata swing",
    "date": "2024-03-01T20:00:00Z",
    "venue": "Club Jazz",
    "ticketPrice": 12
  }'
```

## 🐛 Troubleshooting

### MongoDB Non Si Connette
```bash
# Verifica se MongoDB è in esecuzione
# Windows:
tasklist | findstr mongod

# macOS/Linux:
ps aux | grep mongod

# Riavvia MongoDB
# Windows:
net stop MongoDB
net start MongoDB

# macOS:
brew services restart mongodb/brew/mongodb-community

# Linux:
sudo systemctl restart mongod
```

### Errore Porta 3000 Occupata
```bash
# Trova processo sulla porta 3000
# Windows:
netstat -ano | findstr :3000

# macOS/Linux:
lsof -i :3000

# Termina processo (sostituisci PID)
# Windows:
taskkill /PID <PID> /F

# macOS/Linux:
kill -9 <PID>
```

### Problemi Dipendenze
```bash
# Pulisci cache npm
npm cache clean --force

# Rimuovi node_modules
rm -rf node_modules package-lock.json

# Reinstalla
npm install
```

### Errori CORS
Aggiungi al file `server/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  credentials: true
}));
```

### Log Debugging
```bash
# Abilita log dettagliati
export DEBUG=*
npm run dev

# Windows:
set DEBUG=*
npm run dev
```

## 📊 Monitoraggio Database

### Connessione MongoDB Shell
```bash
# Connetti al database
mongosh rock_turin_dance

# Comandi utili
> show collections
> db.courses.find().pretty()
> db.events.find().sort({date: 1}).pretty()
> db.courseSubscriptions.countDocuments()
> db.newsletterSubscribers.find()
```

### Backup Database
```bash
# Backup completo
mongodump --db rock_turin_dance --out ./backup/

# Restore
mongorestore --db rock_turin_dance ./backup/rock_turin_dance/
```

## 🔐 Sicurezza

### Variabili Ambiente Sensibili
- Non committare mai il file `.env`
- Usa password complesse per JWT_SECRET
- Cambia credenziali admin default

### HTTPS in Produzione
```javascript
// server/server.js
const https = require('https');
const fs = require('fs');

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('path/to/private-key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem')
  };
  
  https.createServer(options, app).listen(443);
}
```

## 📈 Performance

### Indicizzazione Database
```javascript
// Gli indici sono creati automaticamente all'avvio
// Verifica indici:
> db.courses.getIndexes()
> db.events.getIndexes()
```

### Caching
```javascript
// Implementa caching Redis (opzionale)
npm install redis
```

## 🚀 Deploy in Produzione

### Variabili Ambiente Produzione
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/rock_turin_dance
PORT=443
JWT_SECRET=super-secure-production-secret
```

### Build Produzione
```bash
# Build frontend
npm run build

# Avvia server produzione
npm start
```

---

## 📞 Supporto

Per problemi o domande:
1. Controlla la sezione [Troubleshooting](#troubleshooting)
2. Verifica i log del server
3. Controlla connessione database
4. Consulta documentazione MongoDB: https://docs.mongodb.com/

---

**Versione Guida**: 2.0  
**Ultimo Aggiornamento**: Gennaio 2024  
**Compatibilità**: Node.js 18+, MongoDB 6.0+
