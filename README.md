# Portfolio

A modern, full-featured portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This portfolio includes a powerful admin dashboard for managing content, real-time updates, 3D visualizations, and comprehensive performance optimizations.

## 🚀 Features

### Core Features
- **Modern Tech Stack**: Built with the latest versions of Next.js 15, React 19, and TypeScript 5
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Interactive 3D Projects Section**: Powered by Three.js and React Three Fiber for immersive project showcases
- **Custom Cursor**: Magnetic cursor effects with smooth animations
- **Real-time Updates**: Supabase Realtime integration for instant content synchronization
- **Admin Dashboard**: Comprehensive content management system for portfolio customization
- **Authentication System**: Secure login and registration with Supabase Auth
- **Image Upload**: Integrated image upload service with Supabase Storage

### Performance & SEO
- **Performance Optimized**: Image optimization, code splitting, bundle optimization, and modern build tools
- **SEO Optimized**: Dynamic metadata, structured data (JSON-LD), Open Graph tags, sitemap generation
- **Service Worker**: PWA capabilities with offline support
- **Performance Monitoring**: Core Web Vitals tracking and custom analytics
- **Resource Hints**: Preconnect, DNS prefetch, and preload optimizations
- **Critical CSS**: Inline critical CSS for faster initial render

### User Experience
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support, skip links
- **Loading States**: Comprehensive loading indicators and page transitions
- **Error Handling**: Error boundaries and graceful error handling
- **Theme Support**: Dark/light theme support with next-themes
- **Smooth Animations**: Framer Motion animations throughout the application

### Developer Experience
- **Type Safety**: Full TypeScript coverage with strict mode
- **Testing**: End-to-end tests with Playwright
- **Code Quality**: ESLint configuration and best practices
- **State Management**: Zustand for efficient state management

## 🛠️ Tech Stack

### Core Framework
- **Framework**: Next.js 15.4.7 with App Router
- **Language**: TypeScript 5
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **PostCSS**: Tailwind CSS PostCSS plugin

### UI Components & Libraries
- **UI Primitives**: Radix UI (Dialog, Dropdown, Select, Tabs, Tooltip, Avatar, Checkbox, etc.)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Open Sans)
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: Sonner (Toast notifications)

### 3D & Graphics
- **3D Library**: Three.js
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber
- **React Three Cannon**: Physics simulation for 3D objects

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime subscriptions

### State Management & Utilities
- **State Management**: Zustand
- **Class Utilities**: clsx, tailwind-merge, class-variance-authority

### Testing
- **E2E Testing**: Playwright
- **Test Coverage**: JSON and JUnit test reports

### Analytics & Monitoring
- **Analytics**: Google Analytics (gtag)
- **Performance**: Custom performance monitoring utilities

### Build & Deployment
- **Build Tool**: Turbopack (development), Next.js build system (production)
- **Bundle Optimization**: Custom webpack configuration for code splitting
- **Image Optimization**: Next.js Image component with WebP/AVIF support

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication route group
│   │   │   └── login/                 # Login page
│   │   ├── api/                      # API routes
│   │   │   ├── admin/                # Admin endpoints
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── author-name/          # Author name API
│   │   │   ├── introduction/         # Introduction content API
│   │   │   ├── profiles/             # User profiles API
│   │   │   ├── projects/             # Projects API
│   │   │   ├── social-media/         # Social media links API
│   │   │   ├── tech-stack/           # Tech stack API
│   │   │   ├── upload-image/         # Image upload API
│   │   │   ├── users/                # Users API
│   │   │   └── work-experience/      # Work experience API
│   │   ├── dashboard/                # Admin dashboard
│   │   │   ├── [...section]/         # Dynamic dashboard sections
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   └── page.tsx              # Dashboard home
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── robots.ts                 # Robots.txt
│   │   └── sitemap.ts                # Sitemap generation
│   │
│   ├── components/                   # Reusable components
│   │   ├── button/                   # Button components
│   │   │   ├── floating-button.tsx
│   │   │   ├── linking-floating-button.tsx
│   │   │   ├── primary-button.tsx
│   │   │   └── ...
│   │   ├── common/                   # Common UI components
│   │   │   ├── error-boundary.tsx
│   │   │   ├── introduction.tsx
│   │   │   ├── role-guard.tsx
│   │   │   └── ...
│   │   ├── feature/                  # Feature-specific components
│   │   │   ├── auth/                 # Authentication components
│   │   │   ├── cursor/               # Custom cursor components
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   ├── form/                 # Form components
│   │   │   ├── glow-bow/             # Glow effect components
│   │   │   ├── linking-floating/     # Floating link components
│   │   │   ├── loading/              # Loading components
│   │   │   ├── sidebar/              # Sidebar components
│   │   │   ├── tech/                 # Tech stack components
│   │   │   ├── threed-section/       # 3D section components
│   │   │   └── timeline/             # Timeline components
│   │   ├── heading/                  # Heading components
│   │   ├── pages/                    # Page components
│   │   ├── providers/                # Context providers
│   │   ├── seo/                      # SEO components
│   │   └── ui/                       # Base UI components (Radix UI)
│   │
│   ├── constant/                     # Constants and configuration
│   │   ├── dashboard-menu.ts
│   │   ├── developer-roles.ts
│   │   ├── frontend-tech.ts
│   │   ├── tech-list.ts
│   │   └── theme-colors.ts
│   │
│   ├── data/                         # Static data
│   │   ├── projects.ts
│   │   └── timeline-data.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAnalytics.ts
│   │   ├── useAuthorName.ts
│   │   ├── useImageUpload.ts
│   │   ├── usePageLoader.ts
│   │   ├── useProjects.ts
│   │   ├── useTechStack.ts
│   │   ├── useWorkExperience.ts
│   │   └── ...
│   │
│   ├── lib/                          # Utility functions
│   │   ├── analytics.ts              # Analytics utilities
│   │   ├── auth-helper.ts            # Authentication helpers
│   │   ├── seo.ts                    # SEO utilities
│   │   ├── supabase-client.ts        # Supabase client
│   │   ├── supabase-server.ts        # Supabase server client
│   │   ├── performance-utils.ts      # Performance utilities
│   │   ├── service-worker.ts         # Service worker manager
│   │   └── ...
│   │
│   ├── middleware/                   # Next.js middleware
│   │   └── middleware.ts
│   │
│   ├── services/                     # API service layer
│   │   ├── auth.service.ts
│   │   ├── projects.service.ts
│   │   ├── tech-stack.service.ts
│   │   ├── users.service.ts
│   │   └── ...
│   │
│   ├── stores/                       # Zustand stores
│   │   ├── author-store.ts
│   │   ├── projects-store.ts
│   │   ├── tech-store.ts
│   │   └── ...
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── database.ts
│   │   ├── project.ts
│   │   ├── tech-stack.ts
│   │   └── ...
│   │
│   └── utils/                        # Utility functions
│       └── activity-tracker.ts
│
├── public/                           # Static assets
│   ├── frontend-tech/                # Tech stack logos
│   ├── logo/                         # Logo assets
│   └── ...
│
├── tests/                            # Test files
│   └── e2e/                          # End-to-end tests
│       ├── dashboard.spec.ts
│       └── home.spec.ts
│
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm** or **yarn**: Package manager
- **Supabase Account**: For backend services (database, auth, storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Trung112277/portfolio
   cd portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `frontend` directory with the following variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Google Analytics (Optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id

   # SEO Verification (Optional)
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_code
   NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_verification_code
   NEXT_PUBLIC_YAHOO_VERIFICATION=your_yahoo_verification_code
   ```

4. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Set up the database schema (tables for users, projects, tech stack, work experience, etc.)
   - Configure authentication providers (email, OAuth)
   - Set up storage buckets for image uploads
   - Enable Realtime subscriptions for tables you want to sync in real-time

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run end-to-end tests with Playwright UI

## 🎨 Customization

### Colors & Theme

Update color schemes in `src/app/globals.css` CSS variables:

```css
:root {
  --primary: #1fc3ff;
  --secondary: #your-color;
  --accent: #your-color;
  /* ... */
}
```

Theme colors are also defined in `src/constant/theme-colors.ts` for button colors and other UI elements.

### Tech Stack

Modify the tech stack in `src/constant/frontend-tech.ts`:

```typescript
export const FRONTEND_TECH_STACK: TechStack[] = [
  {
    id: 'your-tech',
    name: 'Your Tech',
    color: '#your-color',
    logo: '/path/to/logo.png',
    description: 'Description',
    category: 'category'
  }
]
```

### Author Name

The author name is dynamically fetched from Supabase. You can manage it through the dashboard or directly via the API at `/api/author-name`.

### Projects

Projects can be managed through the admin dashboard at `/dashboard` or via the API endpoints at `/api/projects`.

## 🔧 Development

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use semantic HTML elements
- Implement proper accessibility features
- Follow the component composition pattern

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Use CSS custom properties for theming
- Keep components small and focused
- Use custom hooks for reusable logic

### Testing Guidelines

- Write E2E tests for critical user flows
- Test accessibility features
- Test responsive design on multiple viewports
- Test authentication flows
- Test form submissions and validations

### Performance Guidelines

- Monitor Core Web Vitals
- Use performance monitoring utilities
- Optimize bundle size
- Implement proper loading states
- Lazy load heavy components (3D sections, etc.)
- Optimize images with Next.js Image component

### API Routes

All API routes are located in `src/app/api/`. They use Supabase for database operations and include proper error handling and validation.

### State Management

- Use Zustand stores for global state (`src/stores/`)
- Use React hooks for component-specific state
- Use React Context for theme and other providers

### Database Schema

The application expects the following Supabase tables:
- `users` - User profiles
- `projects` - Portfolio projects
- `tech_stack` - Technology stack items
- `work_experience` - Work experience entries
- `social_media` - Social media links
- `introduction` - Introduction/about content
- `author_name` - Author name configuration

## 📱 Responsive Design

The portfolio is built with a mobile-first approach:
- Responsive grid layouts
- Flexible typography scales
- Touch-friendly interactive elements
- Optimized for all screen sizes (mobile, tablet, desktop)
- Adaptive 3D rendering based on device capabilities

## 🔐 Authentication & Authorization

- **Authentication**: Supabase Auth with email/password and OAuth providers
- **Authorization**: Role-based access control (admin, user roles)
- **Protected Routes**: Dashboard and admin sections are protected
- **Session Management**: Automatic token refresh and session persistence

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy automatically on push to main branch

### Other Platforms

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm run start
   ```

3. **Deploy the `.next` folder** to your hosting platform

### Environment Variables

Make sure to set all required environment variables in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations)

### Performance Optimization

- Enable compression in your hosting platform
- Configure CDN for static assets
- Set up proper caching headers
- Enable HTTP/2 or HTTP/3
- Use edge functions for API routes if available

## 🧪 Testing

### End-to-End Testing

The project uses Playwright for E2E testing. Tests are located in `tests/e2e/`.

**Run tests:**
```bash
npm run test:e2e
```

**Run tests with UI:**
```bash
npm run test:e2e:ui
```

**Test browsers:**
- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

## 📊 Analytics & Monitoring

### Google Analytics

Configure Google Analytics by setting `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your environment variables.

### Performance Monitoring

The application includes custom performance monitoring utilities that track:
- Core Web Vitals (LCP, FID, CLS)
- Custom metrics
- Resource loading times
- API response times

## 🔍 SEO Features

- Dynamic metadata generation
- Structured data (JSON-LD) for Person and Website
- Open Graph tags
- Twitter Card tags
- Dynamic sitemap generation
- Robots.txt configuration
- Semantic HTML structure

## 🎯 Key Features Explained

### 3D Projects Section

The projects section uses Three.js and React Three Fiber to create an immersive 3D experience. Projects are displayed as interactive 3D objects with physics simulations.

### Custom Cursor

The custom cursor provides magnetic effects and smooth animations, enhancing user interaction throughout the site.

### Real-time Updates

Using Supabase Realtime, changes to portfolio content are instantly synchronized across all connected clients without page refresh.

### Admin Dashboard

The dashboard provides a comprehensive interface for managing:
- Projects
- Tech stack
- Work experience
- Social media links
- Introduction content
- User profiles
- Author name

### Image Upload

Images are uploaded to Supabase Storage with optimization and proper error handling. The service supports multiple image formats and automatic optimization.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Playwright](https://playwright.dev/) - End-to-end testing framework

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

Built with ❤️ using Next.js, React, and TypeScript