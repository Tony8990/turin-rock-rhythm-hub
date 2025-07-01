
# Rock in Turin Dance School CMS

A modern, animated single-page application for a rockabilly and swing dance school with an intuitive admin portal for content management.

## 🎯 Features

- **Dynamic Homepage** - Visually striking carousel showcasing dance posts, videos, and upcoming events
- **Course Subscription System** - Students can register for courses with detailed forms
- **Media Gallery** - Responsive grid layout for photos and embedded videos with filter options
- **Newsletter Section** - Engaging signup form with animated confirmation
- **Admin Portal** - Secure dashboard for staff to manage content, courses, events, and subscribers
- **Vintage Design** - Retro-modern styling with smooth animations

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL (recommended for production)
- **State Management**: React Query (@tanstack/react-query)
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your WSL environment:

### 1. Node.js and npm
```bash
# Install Node.js using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

### 2. PostgreSQL Database
```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Switch to postgres user and create database
sudo -u postgres psql

# In PostgreSQL shell, create database and user:
CREATE DATABASE rock_turin_dance;
CREATE USER dance_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE rock_turin_dance TO dance_admin;
\q
```

### 3. Git (if not already installed)
```bash
sudo apt install git
```

## 🚀 Local Development Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/rock-turin-dance-cms.git
cd rock-turin-dance-cms
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add the following environment variables to `.env.local`:
```env
# Database Configuration
DATABASE_URL="postgresql://dance_admin:your_secure_password@localhost:5432/rock_turin_dance"

# Application Settings
VITE_APP_TITLE="Rock in Turin Dance School"
VITE_API_URL="http://localhost:3000/api"

# Email Configuration (for newsletter functionality)
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-email-password"

# Admin Authentication (for admin portal)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_admin_password"

# File Upload Settings
MAX_FILE_SIZE="10MB"
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif,video/mp4"
```

### Step 4: Database Setup
```bash
# Create database tables (if using a backend)
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### Step 5: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🗄️ Database Schema

### Core Tables

#### courses
```sql
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255),
    schedule VARCHAR(255),
    location VARCHAR(255),
    max_participants INTEGER,
    price DECIMAL(10,2),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### course_subscriptions
```sql
CREATE TABLE course_subscriptions (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    participant_name VARCHAR(255) NOT NULL,
    participant_email VARCHAR(255) NOT NULL,
    participant_phone VARCHAR(50),
    experience_level VARCHAR(50),
    special_requests TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending'
);
```

#### events
```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    ticket_price DECIMAL(10,2),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### newsletter_subscribers
```sql
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

## 📁 Project Structure

```
rock-turin-dance-cms/
├── public/
│   ├── lovable-uploads/         # Uploaded media files
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── AdminPortal.tsx      # Admin dashboard
│   │   ├── CarouselSection.tsx  # Homepage carousel
│   │   ├── CourseSubscriptionForm.tsx # Course registration
│   │   ├── HeroSection.tsx      # Homepage hero
│   │   ├── MediaGallery.tsx     # Photo/video gallery
│   │   ├── Navigation.tsx       # Site navigation
│   │   └── NewsletterSection.tsx # Newsletter signup
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── pages/                   # Page components
│   └── types/                   # TypeScript type definitions
├── .env.local                   # Environment variables
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Database (if backend is implemented)
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript compiler check

# Testing (when implemented)
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
```

## 🎨 Customization

### Theme Colors
The application uses a vintage color palette. To customize colors, edit `tailwind.config.ts`:

```typescript
extend: {
  colors: {
    'vintage-cream': '#F5E6D3',
    'vintage-teal': '#4A9B8E',
    'vintage-gold': '#D4AF37',
    // Add your custom colors here
  }
}
```

### Adding New Course Types
1. Update the courses array in `src/components/CourseSubscriptionForm.tsx`
2. Add corresponding database entries
3. Update admin portal course management

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment:
- Database connection string
- SMTP configuration for emails
- File upload settings
- Admin credentials

### Recommended Hosting Platforms
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Database**: Railway, Supabase, or AWS RDS
- **File Storage**: AWS S3, Cloudinary, or similar

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Database**: Use strong passwords and limit database access
3. **Admin Portal**: Implement proper authentication in production
4. **File Uploads**: Validate file types and sizes
5. **CORS**: Configure properly for production domains

## 🐛 Troubleshooting

### Common Issues

#### PostgreSQL Connection Issues
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Restart PostgreSQL
sudo service postgresql restart

# Check database connection
psql -U dance_admin -d rock_turin_dance -h localhost
```

#### Node.js Version Issues
```bash
# Check current Node.js version
node --version

# Switch to LTS version
nvm use --lts
```

#### Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### WSL-Specific Issues

#### Port Access
If you can't access `localhost:8080` from Windows:
```bash
# Check WSL IP address
ip route show | grep -i default | awk '{ print $3}'

# Use the WSL IP instead of localhost
```

#### File Permissions
```bash
# Fix file permissions if needed
sudo chown -R $USER:$USER /path/to/project
chmod -R 755 /path/to/project
```

## 📞 Support

For development issues or questions:
1. Check the troubleshooting section above
2. Review the component documentation
3. Check browser console for errors
4. Verify environment variables are set correctly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Note**: This project is currently configured for frontend-only operation with mock data. For full database functionality, consider integrating with a backend service or using Lovable's Supabase integration.
