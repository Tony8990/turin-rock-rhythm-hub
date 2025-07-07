
# 🎸 Rock in Turin Dance School - Guida Completa Setup Locale

## 📋 Indice
- [Prerequisiti](#prerequisiti)
- [Installazione Database PostgreSQL](#installazione-database-postgresql)
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

# PostgreSQL (versione 13 o superiore)
psql --version  # Deve essere >= 13.0

# Git
git --version
```

### Sistema Operativo
- Windows 10/11
- macOS 10.15+
- Linux Ubuntu 20.04+

## 🗄️ Installazione Database PostgreSQL

### Windows
```bash
# 1. Scarica PostgreSQL Installer
# https://www.postgresql.org/download/windows/

# 2. Durante l'installazione:
# - Porta: 5432 (default)
# - Username: postgres
# - Password: scegli una password sicura
# - Database: postgres (default)

# 3. Aggiungi PostgreSQL al PATH
# Aggiungi C:\Program Files\PostgreSQL\15\bin al PATH di sistema

# 4. Verifica installazione
psql --version
```

### macOS
```bash
# 1. Installa con Homebrew
brew install postgresql@15

# 2. Avvia PostgreSQL
brew services start postgresql@15

# 3. Crea utente database
createuser -s postgres

# 4. Verifica installazione
psql --version
```

### Linux (Ubuntu/Debian)
```bash
# 1. Aggiorna repository
sudo apt update

# 2. Installa PostgreSQL
sudo apt install postgresql postgresql-contrib

# 3. Avvia PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 4. Configura utente
sudo -u postgres psql
postgres=# ALTER USER postgres PASSWORD 'your_password';
postgres=# \q

# 5. Verifica installazione
psql --version
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
# Vai nella directory server
cd server

# Installa dipendenze backend
npm install

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
│   ├── uploads/          # File caricati
│   └── server.js         # Server principale
├── public/
└── README-LOCAL-SETUP.md
```

## ⚙️ Configurazione Ambiente

### 1. Configurazione Database PostgreSQL
```bash
# Accedi a PostgreSQL
psql -U postgres -h localhost

# Crea database per il progetto
CREATE DATABASE rock_turin_dance;

# Crea utente specifico
CREATE USER dance_admin WITH PASSWORD 'your_secure_password';

# Assegna privilegi
GRANT ALL PRIVILEGES ON DATABASE rock_turin_dance TO dance_admin;

# Esci da PostgreSQL
\q
```

### 2. File .env (Root del progetto)
```bash
# Crea file .env nella root
touch .env
```

```env
# Database Configuration
DATABASE_URL="postgresql://dance_admin:your_secure_password@localhost:5432/rock_turin_dance"

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration (per future funzionalità auth)
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

### 3. Package.json Scripts (Root)
Aggiungi questi script al `package.json` principale:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client": "vite",
    "server": "cd server && nodemon server.js",
    "build": "vite build",
    "start": "cd server && node server.js"
  }
}
```

## 🏃‍♂️ Avvio Applicazione

### 1. Verifica Database
```bash
# Testa connessione database
psql -U dance_admin -d rock_turin_dance -h localhost
# Se funziona, esci con \q
```

### 2. Avvio Sviluppo
```bash
# Installa concurrently globalmente (se non presente)
npm install -g concurrently

# Avvia frontend e backend insieme
npm run dev
```

### 3. URL Accesso
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 🔧 Funzionalità Admin CRUD

### Database Setup Automatico
Il database si configura automaticamente al primo avvio del server. Le tabelle vengono create con questi comandi:

```sql
-- Tabella Corsi
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  time VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  max_participants INTEGER DEFAULT 20,
  price DECIMAL(10,2),
  image_url TEXT,
  level VARCHAR(50) DEFAULT 'beginner',
  duration INTEGER,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Eventi
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  venue VARCHAR(255) NOT NULL,
  ticket_price DECIMAL(10,2),
  image_url TEXT,
  max_attendees INTEGER,
  category VARCHAR(50) DEFAULT 'rockabilly',
  organizer VARCHAR(255),
  contact_info VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Iscrizioni Corsi
CREATE TABLE course_subscriptions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  participant_name VARCHAR(255) NOT NULL,
  participant_email VARCHAR(255) NOT NULL,
  participant_phone VARCHAR(50),
  experience_level VARCHAR(50) DEFAULT 'beginner',
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Newsletter
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Tabella Media
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(50),
  thumbnail TEXT,
  full_image_url TEXT,
  video_url TEXT,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Gestione Corsi

#### API Endpoints Corsi
```javascript
// GET - Lista tutti i corsi
GET /api/courses?page=1&limit=10&level=beginner

// GET - Corso singolo
GET /api/courses/:id

// POST - Crea nuovo corso
POST /api/courses
Content-Type: application/json

{
  "name": "Rockabilly Base",
  "description": "Corso introduttivo al rockabilly per principianti",
  "instructor": "Marco Rossi",
  "time": "Martedì 19:00-20:30",
  "location": "Sala 1 - Via Roma 123, Torino",
  "price": 80,
  "level": "beginner",
  "maxParticipants": 20,
  "duration": 8,
  "startDate": "2024-01-15",
  "endDate": "2024-03-15"
}

// PUT - Aggiorna corso
PUT /api/courses/:id
Content-Type: application/json

// DELETE - Elimina corso
DELETE /api/courses/:id
```

#### Esempio Completo Creazione Corso
```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rockabilly Avanzato",
    "description": "Corso avanzato di rockabilly con focus su tecniche complesse e coreografie professionali",
    "instructor": "Laura Bianchi",
    "time": "Giovedì 20:00-21:30",
    "location": "Sala 2 - Via Roma 123, Torino",
    "price": 120,
    "level": "advanced",
    "maxParticipants": 15,
    "duration": 10,
    "startDate": "2024-02-01",
    "endDate": "2024-04-15"
  }'
```

### Gestione Eventi

#### API Endpoints Eventi
```javascript
// GET - Lista tutti gli eventi
GET /api/events?page=1&limit=10&upcoming=true

// GET - Evento singolo
GET /api/events/:id

// POST - Crea nuovo evento
POST /api/events
Content-Type: application/json

{
  "name": "Rockabilly Night",
  "description": "Serata di ballo rockabilly con DJ e band dal vivo",
  "date": "2024-02-14T20:00:00Z",
  "venue": "Club Vintage - Via Garibaldi 45, Torino",
  "ticketPrice": 15,
  "category": "rockabilly",
  "maxAttendees": 100,
  "organizer": "Rock in Turin",
  "contactInfo": "info@rockinturin.com"
}

// PUT - Aggiorna evento
PUT /api/events/:id
Content-Type: application/json

// DELETE - Elimina evento
DELETE /api/events/:id
```

#### Esempio Completo Creazione Evento
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Swing & Lindy Hop Festival",
    "description": "Festival di 3 giorni con workshop, gare e spettacoli di swing e lindy hop",
    "date": "2024-03-15T18:00:00Z",
    "venue": "Palazzetto dello Sport - Torino",
    "ticketPrice": 45,
    "category": "swing",
    "maxAttendees": 300,
    "organizer": "Swing Turin Association",
    "contactInfo": "festival@swingturin.it",
    "isFeatured": true
  }'
```

## 📁 Gestione Media

### Upload File
```javascript
// Endpoint: /api/upload
// Metodo: POST (multipart/form-data)

// JavaScript esempio frontend:
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    if (result.success) {
      console.log('File caricato:', result.data.url);
      return result.data.url;
    }
  } catch (error) {
    console.error('Errore upload:', error);
  }
};
```

### Esempio Upload con curl
```bash
# Upload immagine
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/your/image.jpg"

# Risposta:
{
  "success": true,
  "message": "File caricato con successo",
  "data": {
    "filename": "file-1643723456789-987654321.jpg",
    "originalName": "image.jpg",
    "mimetype": "image/jpeg",
    "size": 2048576,
    "url": "/uploads/file-1643723456789-987654321.jpg"
  }
}
```

### Tipi File Supportati
- **Immagini**: JPEG, JPG, PNG, GIF
- **Video**: MP4, MOV, AVI
- **Dimensione massima**: 10MB

## 🧪 Test Completi API

### Script Test Completo
Crea un file `test-api.js`:

```javascript
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

// Test Corso
const testCourse = async () => {
  try {
    // Crea corso
    const courseData = {
      name: 'Test Rockabilly Course',
      description: 'Corso di test per verificare le API',
      instructor: 'Test Instructor',
      time: 'Mercoledì 19:00-20:30',
      location: 'Sala Test',
      price: 50,
      level: 'beginner'
    };
    
    const createResponse = await axios.post(`${API_BASE}/courses`, courseData);
    console.log('✅ Corso creato:', createResponse.data.data.id);
    
    const courseId = createResponse.data.data.id;
    
    // Leggi corso
    const readResponse = await axios.get(`${API_BASE}/courses/${courseId}`);
    console.log('✅ Corso letto:', readResponse.data.data.name);
    
    // Aggiorna corso
    const updateData = { ...courseData, price: 60 };
    const updateResponse = await axios.put(`${API_BASE}/courses/${courseId}`, updateData);
    console.log('✅ Corso aggiornato:', updateResponse.data.data.price);
    
    // Lista corsi
    const listResponse = await axios.get(`${API_BASE}/courses`);
    console.log('✅ Lista corsi:', listResponse.data.data.length);
    
    // Elimina corso
    await axios.delete(`${API_BASE}/courses/${courseId}`);
    console.log('✅ Corso eliminato');
    
  } catch (error) {
    console.error('❌ Errore test corso:', error.response?.data || error.message);
  }
};

// Test Evento
const testEvent = async () => {
  try {
    // Crea evento
    const eventData = {
      name: 'Test Rockabilly Event',
      description: 'Evento di test per verificare le API',
      date: '2024-06-01T20:00:00Z',
      venue: 'Venue Test',
      ticketPrice: 25,
      category: 'rockabilly'
    };
    
    const createResponse = await axios.post(`${API_BASE}/events`, eventData);
    console.log('✅ Evento creato:', createResponse.data.data.id);
    
    const eventId = createResponse.data.data.id;
    
    // Leggi evento
    const readResponse = await axios.get(`${API_BASE}/events/${eventId}`);
    console.log('✅ Evento letto:', readResponse.data.data.name);
    
    // Lista eventi
    const listResponse = await axios.get(`${API_BASE}/events`);
    console.log('✅ Lista eventi:', listResponse.data.data.length);
    
    // Elimina evento
    await axios.delete(`${API_BASE}/events/${eventId}`);
    console.log('✅ Evento eliminato');
    
  } catch (error) {
    console.error('❌ Errore test evento:', error.response?.data || error.message);
  }
};

// Esegui test
const runTests = async () => {
  console.log('🧪 Inizio test API...\n');
  
  await testCourse();
  console.log('');
  await testEvent();
  
  console.log('\n✅ Test completati!');
};

runTests();
```

Esegui i test:
```bash
cd server
npm install axios
node test-api.js
```

## 🔧 Operazioni Database Manuali

### Accesso diretto al Database
```bash
# Connetti al database
psql -U dance_admin -d rock_turin_dance -h localhost

# Comandi utili
\dt                          # Lista tabelle
\d courses                   # Struttura tabella courses
SELECT * FROM courses;       # Tutti i corsi
SELECT * FROM events WHERE date > NOW();  # Eventi futuri
\q                           # Esci
```

### Query Utili
```sql
-- Corsi con più iscrizioni
SELECT c.name, COUNT(cs.id) as subscriptions
FROM courses c
LEFT JOIN course_subscriptions cs ON c.id = cs.course_id
GROUP BY c.id, c.name
ORDER BY subscriptions DESC;

-- Eventi del mese corrente
SELECT name, date, venue
FROM events
WHERE date >= DATE_TRUNC('month', CURRENT_DATE)
AND date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
ORDER BY date;

-- Statistiche generali
SELECT 
  (SELECT COUNT(*) FROM courses WHERE is_active = true) as active_courses,
  (SELECT COUNT(*) FROM events WHERE date > NOW()) as upcoming_events,
  (SELECT COUNT(*) FROM course_subscriptions) as total_subscriptions,
  (SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true) as newsletter_subscribers;
```

### Backup e Restore
```bash
# Backup database
pg_dump -U dance_admin -h localhost rock_turin_dance > backup_$(date +%Y%m%d).sql

# Restore database
psql -U dance_admin -h localhost rock_turin_dance < backup_20240101.sql

# Backup solo struttura
pg_dump -U dance_admin -h localhost --schema-only rock_turin_dance > structure.sql

# Backup solo dati
pg_dump -U dance_admin -h localhost --data-only rock_turin_dance > data.sql
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Verifica se PostgreSQL è in esecuzione
# Windows:
sc query postgresql-x64-15

# macOS:
brew services list | grep postgresql

# Linux:
sudo systemctl status postgresql

# Riavvia PostgreSQL
# Windows:
sc stop postgresql-x64-15
sc start postgresql-x64-15

# macOS:
brew services restart postgresql@15

# Linux:
sudo systemctl restart postgresql
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

### Problemi Permessi Database
```sql
-- Connetti come superuser
psql -U postgres -h localhost

-- Riassegna privilegi
GRANT ALL PRIVILEGES ON DATABASE rock_turin_dance TO dance_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dance_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dance_admin;
```

### Reset Completo Database
```bash
# Elimina e ricrea database
psql -U postgres -h localhost
DROP DATABASE IF EXISTS rock_turin_dance;
CREATE DATABASE rock_turin_dance;
GRANT ALL PRIVILEGES ON DATABASE rock_turin_dance TO dance_admin;
\q

# Riavvia server per ricreare tabelle
npm run server
```

### Log Debugging
```bash
# Abilita log dettagliati PostgreSQL
# Modifica postgresql.conf:
log_statement = 'all'
log_min_duration_statement = 0

# Riavvia PostgreSQL
# Controlla log in:
# Windows: C:\Program Files\PostgreSQL\15\data\log\
# macOS: /usr/local/var/log/
# Linux: /var/log/postgresql/
```

### Problemi Dipendenze
```bash
# Server
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ..
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoraggio Performance

### Query Performance
```sql
-- Query più lente
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Indici non utilizzati
SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_tup_read = 0;
```

### Spazio Database
```sql
-- Dimensione database
SELECT pg_size_pretty(pg_database_size('rock_turin_dance'));

-- Dimensione tabelle
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🔐 Sicurezza

### Configurazione Sicura PostgreSQL
```sql
-- Crea utente con privilegi limitati per produzione
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE rock_turin_dance TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

### Variabili Ambiente Produzione
```env
# Produzione
NODE_ENV=production
DATABASE_URL=postgresql://app_user:secure_password@localhost:5432/rock_turin_dance
JWT_SECRET=super-secure-production-jwt-secret-key-2024
ADMIN_PASSWORD=secure_admin_password_2024
```

## 🚀 Deploy in Produzione

### Preparazione
```bash
# Build frontend
npm run build

# Install production dependencies
cd server
npm ci --only=production
cd ..
```

### Configurazione Nginx (Linux)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/your/project/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Upload files
    location /uploads {
        proxy_pass http://localhost:3000;
    }
}
```

### Systemd Service (Linux)
```ini
[Unit]
Description=Rock Turin Dance Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/your/project/server
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

---

## 📞 Supporto

Per problemi o domande:
1. Controlla la sezione [Troubleshooting](#troubleshooting)
2. Verifica i log del server (`console.log` nel terminale)
3. Controlla connessione database
4. Testa API con curl o Postman
5. Consulta documentazione PostgreSQL: https://postgresql.org/docs/

---

**Versione Guida**: 3.0  
**Ultimo Aggiornamento**: Gennaio 2024  
**Compatibilità**: Node.js 18+, PostgreSQL 13+, React 18+

## 🎯 Checklist Setup Rapido

- [ ] PostgreSQL installato e funzionante
- [ ] Database `rock_turin_dance` creato
- [ ] Utente `dance_admin` configurato
- [ ] File `.env` configurato correttamente
- [ ] Dipendenze frontend installate (`npm install`)
- [ ] Dipendenze backend installate (`cd server && npm install`)
- [ ] Server avviato (`npm run dev`)
- [ ] Frontend accessibile su http://localhost:5173
- [ ] Backend API raggiungibile su http://localhost:3000/api/health
- [ ] Test API funzionanti
- [ ] Upload file funzionante
- [ ] Database tabelle create automaticamente

**Tempo stimato setup completo**: 30-45 minuti
