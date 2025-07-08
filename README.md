# Prompt Enhancer FE

A modern Next.js frontend for enhancing AI prompts, featuring Tailwind CSS, markdown rendering, and beautiful UI components.

## Features
- Enhance prompts for AI models with role and optimization level selection
- Beautiful, responsive UI with Tailwind CSS
- Markdown rendering for enhanced prompt output
- Theme toggle (light/dark)
- Toast notifications (optional, can be enabled)
- SEO optimized with Open Graph and Twitter meta tags

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/KirtiPatel79/Promt-Enhancer.git
cd Promt-Enhancer
```

### 2. Install dependencies
```sh
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env` file in the project root:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### 4. Run the development server
```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
- `app/` - App directory (Next.js 13+ routing)
- `components/` - Reusable UI components
- `styles/` - Tailwind and global CSS
- `lib/` - API client and utilities
- `public/` - Static assets (favicon, og-image, etc.)

## Scripts
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `type-check` - Run TypeScript type checking

## SEO & Social
- Favicon: `/public/favicon.jpg` (or `.ico`)
- Open Graph image: `/public/og-image.png` (1200x630px recommended)
- Meta tags are set in `app/layout.tsx`

## Credits
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [react-markdown](https://github.com/remarkjs/react-markdown)

---

**Prompt Enhancer FE** — Transform your prompts into professional, comprehensive instructions for AI systems. 