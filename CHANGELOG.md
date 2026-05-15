# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-05-15

### Added
- Movies and TV Shows now have their own separate Home, Explore, and Search pages
- TV Home dashboard with a featured show banner and genre carousels
- TV Explore page with genre filter dialog
- TV Search page with debounced input, results count, and pagination
- TV genre filter dialog using TMDB's TV genre list
- TVBanner component for the TV home featured show
- TVCategories component for horizontal TV genre carousels

### Changed
- Navbar redesigned with Movies and TV Shows section tabs that highlight based on current URL
- Home, Explore, and Search nav links context-switch to the active section
- Movies routes moved to `/movies`, `/movies/explore`, `/movies/search`
- TV Explore moved to `/tv/explore`, TV Search added at `/tv/search`
- Root `/` now redirects to `/movies`

## [0.2.0] - 2025

### Added
- Responsive navbar with mobile hamburger menu
- Pagination across movie and TV listing pages
- TMDB API data fetching hooks with React Query (stale-while-revalidate, infinite cache)
- TV Shows browsing with `DiscoverTV` component
- TV show detail page with season/episode selector
- TV episode watch page with season dropdown and episode buttons
- Multiple streaming providers (VidsrcCC, VidsrcTO, Embed, VidsrcVIP, Vidjoy)
- HLS streaming support via VideoPlayer component
- Movie genre filter dialog on Explore page
- Search params persisted in the URL for shareable links

### Changed
- Refactored component exports to barrel pattern
- Improved dashboard UI with genre category carousels

## [0.1.0] - 2025

### Added
- Initial TMDB Movies app
- Movie home dashboard with banner and category carousels
- Movie detail page (`/movieInfo/$movieId`)
- Movie watch page (`/watch/$movieId`) with iframe stream providers
- Movie search with debounced input
- Movie explore/discover page
- TanStack Router file-based routing
- TanStack Query for data fetching
- Tailwind CSS styling with dark theme (`#020713` background)
