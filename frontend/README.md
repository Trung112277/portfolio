# Portfolio Frontend

A modern, responsive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with the latest versions of Next.js, React, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: Floating buttons with glow effects and animated tech stack display
- **Performance Optimized**: Image optimization, code splitting, and modern build tools
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Open Sans)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── button/            # Button components
│   ├── common/            # Common UI components
│   ├── feature/           # Feature-specific components
│   └── ui/                # Base UI components
├── constant/               # Constants and data
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── services/               # API services
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio/frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
Update color schemes in `src/app/globals.css` CSS variables:

```css
:root {
  --primary: #1fc3ff;
  --secondary: #your-color;
  /* ... */
}
```

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

## 🔧 Development

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Use semantic HTML elements
- Implement proper accessibility features

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the component composition pattern
- Use CSS custom properties for theming

## 📱 Responsive Design

The portfolio is built with a mobile-first approach:
- Responsive grid layouts
- Flexible typography scales
- Touch-friendly interactive elements
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push

### Other Platforms
1. Build the project: `npm run build`
2. Start the server: `npm run start`
3. Deploy the `.next` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
