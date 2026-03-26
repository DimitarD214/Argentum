# Astera Jewelry Store - Production-Ready Implementation Tasks

## 1. Visual Polish & Branding Updates
- [x] Rename "Argentum" to "Astera" globally (codebase, metadata, UI).
- [x] Update Hero Section text to: "Astera premium jewelry".
- [x] Integrate Spring Campaign background video (hero-campaign.mp4), properly scaled and aligned.
- [x] Implement Light Blue-Green luxury theme (seafoam/mint/aqua-glacier with neutral whites/creams).
- [x] Update typography to high-end serif (Playfair Display) for headings.
- [x] Refine spacing, whitespace, and design tokens for a premium look.
- [x] Add micro-interactions (hover-zoom, "Add to Basket" animations, fade-ins).

## 2. Core E-commerce Functionality
- [x] Implement global cart state (persistent basket).
- [x] Build dynamic Product Detail Pages (PDP).
- [x] Add category and material filtering on the Shop page.
- [x] Replaced image placeholders with generated artisan jewelry photography.

## 3. User Profiles & History
- [x] Set up user authentication (Sign up/Login) using NextAuth v5.
- [x] Create User Dashboard ("My Account", order history, saved addresses, wishlist).
- [x] Sync basket state with logged-in user profiles (persistent storage).

## 4. Stripe Integration
- [x] Install Stripe SDKs (stripe, @stripe/stripe-js).
- [x] Configure Stripe API connection.
- [x] Implement Checkout Flow (redirect or embedded element).
- [x] Set up Stripe Webhook handling (successful payments, order status, clearing basket).

## 5. Verification
- [x] Run browser subagent to test "Add to Basket" flow.
- [x] Verify Light Blue-Green theme consistency across mobile and desktop.
