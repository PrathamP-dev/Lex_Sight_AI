# LexSight - AI-Powered Legal Document Analysis

## Overview
LexSight is a Next.js application that makes legal documents simple and accessible for everyone. It helps simplify contracts, agreements, and compliance with AI technology for both legal and non-legal users.

## Current State
- Successfully imported from GitHub and configured for Replit environment
- Next.js 15.3.3 application running on port 5000
- Uses Google Genkit for AI functionality
- Built with React, TypeScript, Tailwind CSS, and Radix UI components
- Deployment configured for autoscale (npm run build -> npm start)
- Frontend fully functional with responsive design
- **Database**: Supabase PostgreSQL for persistent user and document storage
- Authentication system with secure password hashing

## Recent Changes
- **2025-10-04**: Fresh GitHub import successfully configured for Replit
  - Installed all npm dependencies (643 packages)
  - Configured Next.js for Replit proxy environment (already had allowedDevOrigins)
  - Dev server running on port 5000 with host 0.0.0.0 (required for Replit)
  - Configured deployment for autoscale production (npm run build -> npm start)
  - Verified frontend displays correctly - landing page fully functional
  - WebGL 3D effects gracefully fallback to solid background in headless environments
  - All TypeScript and LSP errors resolved
  - Application ready for use - needs Supabase credentials for database features
  - AI features optional - work without GEMINI_API_KEY with graceful degradation

## Project Architecture
- **Frontend**: Next.js 15 with React 18, TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: Supabase (PostgreSQL) for persistent data storage
- **Authentication**: Custom auth with bcrypt password hashing
- **AI Integration**: Google Genkit with Google AI (Gemini)
- **Build Tool**: Next.js with Turbopack
- **3D Graphics**: OGL library for visual effects

## Key Features
- AI-powered document analysis
- Risk analysis for legal documents
- Clause summarization
- Dark/light theme support
- Responsive design with modern UI components

## Environment Setup
- Node.js application
- Development server: `npm run dev` (port 5000)
- Build command: `npm run build`
- Production server: `npm start`

## Database Setup
- **Database**: Supabase PostgreSQL
- **Required Secrets**: SUPABASE_URL, SUPABASE_ANON_KEY (need to be configured)
- **Setup Instructions**: See SUPABASE_SETUP.md for complete database setup
- **Tables**: users, documents (schema provided in supabase-schema.sql)
- **Security**: Application-layer access control via session authentication
- **API Routes**: All database operations are server-side and session-protected
- **Note**: App works without database but signup/login require Supabase setup

## Configuration Notes
- Next.js configured with allowedDevOrigins for Replit proxy support
- TypeScript errors ignored during build for rapid development
- ESLint errors ignored during builds
- Remote image patterns configured for placehold.co

## AI Configuration
- Requires GEMINI_API_KEY environment variable for AI features
- AI functionality gracefully disabled if API key is not present
- Includes flows for risk analysis and clause summarization