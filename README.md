# LiftupLabs - Event Management Platform

A comprehensive event management platform built with React and Vite, designed to help students, professionals, and institutions discover, create, and manage events, courses, notes, and career opportunities.

![LiftupLabs](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.7-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### Core Functionality
- **Event Management**
  - Browse and discover events with advanced filtering
  - Create and host events with detailed information
  - Event registration and participant management
  - Event analytics and dashboard for organizers
  - Real-time event updates and notifications

- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Email verification system
  - Password reset and forgot password functionality
  - Role-based access control (Student, Professional, Institution, Admin)
  - Protected routes and session management

- **Dashboard Features**
  - Personalized user dashboard
  - My Events dashboard (hosted and registered events)
  - Admin dashboard with platform statistics
  - Event analytics and insights
  - User profile management

### Additional Features
- **Course Discovery** - Browse and explore educational courses
- **Notes Sharing** - Access and share academic notes
- **Community Hub** - Connect with peers and professionals
- **Career Hub** - Explore career opportunities and resources
- **Institution Explorer** - Discover educational institutions
- **About Us & Contact** - Learn about the platform and get in touch
- **Global Search** - Search across events, courses, and resources
- **Responsive Design** - Fully responsive UI for all devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: TailwindCSS 4.1.16
- **Routing**: React Router DOM 7.9.5
- **Icons**: Lucide React 0.555.0
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LiftupLabs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# API Configuration
# Backend API URL - Update this based on your environment

# For local development (backend running on localhost)
VITE_API_URL=http://localhost:5000/api

# For production (deployed backend)
# VITE_API_URL=https://your-backend-url.com/api
```

> **Important**: The URL must end with `/api` because all backend routes are under the `/api` prefix.

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

## 🏗️ Project Structure

```
LiftupLabs/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable React components
│   │   ├── ui/           # UI components (buttons, cards, etc.)
│   │   ├── homepage/     # Homepage-specific components
│   │   ├── AboutSection.jsx
│   │   ├── ContactForm.jsx
│   │   ├── CreateEventForm.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── BrowseEvents.jsx
│   │   ├── MyEventsDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   ├── services/         # API service functions
│   ├── lib/              # Utility functions
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md
```

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔐 Authentication Flow

1. **Registration**: Users can register with email and password
2. **Email Verification**: Verification email sent to user's email
3. **Login**: Users login with verified credentials
4. **Protected Routes**: Authenticated users can access dashboard and features
5. **Password Reset**: Forgot password functionality available

## 🌐 API Integration

The frontend communicates with the backend API through the `VITE_API_URL` environment variable. Ensure the backend server is running before using the application.

### Backend Repository
The backend for this project is located at: `../LiftupLabs_Backend`

For backend setup and API documentation, refer to the [Backend README](../LiftupLabs_Backend/README.md)

## 📱 Key Pages

### Public Pages
- **Landing Page** (`/`) - Platform introduction and features
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Email Verification** (`/verify-email`) - Email verification page
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password`) - Password reset confirmation

### Protected Pages (Requires Authentication)
- **Dashboard** (`/dashboard`) - Main user dashboard with:
  - Home section
  - Browse Events
  - My Events
  - Discover Courses
  - Browse Notes
  - Community Hub
  - Career Hub
  - Explore Institutions
  - About Us
  - Admin Dashboard (admin only)

## 🎨 Design System

The application uses a custom design system built with TailwindCSS:
- **Primary Color**: Orange (`orange-600`, `orange-50`, etc.)
- **Typography**: System fonts with custom styling
- **Components**: Reusable UI components in `src/components/ui/`
- **Responsive**: Mobile-first responsive design

## 🔒 Security Features

- JWT token-based authentication
- Protected routes with authentication checks
- Secure password handling
- CORS configuration
- Environment variable protection

## 📚 Context Providers

### AuthContext
Manages user authentication state, login, logout, and user profile.

```jsx
const { user, login, logout, register, isLoading } = useAuth();
```

### NotificationContext
Handles application-wide notifications and toasts.

```jsx
const { showNotification } = useNotification();
```

## 🚀 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

For detailed deployment instructions, see [VERCEL_UPDATE_GUIDE.md](./VERCEL_UPDATE_GUIDE.md)

### Environment Variables for Production

Make sure to set the following environment variables in your deployment platform:
- `VITE_API_URL` - Your production backend API URL

## 📖 Additional Documentation

The project includes several detailed documentation files:
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment setup guide
- [ABOUT_US_CONTACT_FEATURE.md](./ABOUT_US_CONTACT_FEATURE.md) - About Us and Contact feature documentation
- [EMAIL_VERIFICATION_FEATURE.md](./EMAIL_VERIFICATION_FEATURE.md) - Email verification implementation
- [FORGOT_PASSWORD_FEATURE.md](./FORGOT_PASSWORD_FEATURE.md) - Password reset feature
- [CONTACT_FORM_TESTING.md](./CONTACT_FORM_TESTING.md) - Contact form testing guide
- [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) - Deployment troubleshooting
- [API_URL_FIX.md](./API_URL_FIX.md) - API URL configuration guide
- [LAYOUT_FIX.md](./LAYOUT_FIX.md) - Layout fixes and improvements

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Error**
- Ensure backend server is running
- Check `VITE_API_URL` in `.env` file
- Verify the URL ends with `/api`

**2. Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

**3. Authentication Issues**
- Clear browser localStorage
- Check JWT token expiration
- Verify backend authentication endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Quality

The project uses ESLint for code quality:
```bash
npm run lint
```

## 🔄 Version History

- **v0.0.0** - Initial release with core features

## 👥 Team

Liftuplabs Team

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite Team for the blazing fast build tool
- TailwindCSS for the utility-first CSS framework
- Lucide React for beautiful icons

## 📞 Support

For support, please contact through the Contact Form in the application or open an issue in the repository.

---

**Built with ❤️ by the LiftupLabs Team**
