# Changelog


## [1.0.0] - 2026-05-15

### Chore
- Updated CategoryCarousel to be more responsive 

### Added

- Separate Movies and TV Shows sections with dedicated Home, Explore, and Search pages
- TV Home dashboard with a featured show banner and genre-based carousels
- TV Explore page with a genre filter dialog powered by TMDB TV genres
- TV Search page with debounced search input, results count, and pagination
- Universal Search page (`/search`) that searches both Movies and TV Shows simultaneously
- Multi-search results with Movie/TV badges on each result card
- `TVBanner` component for featured TV content
- `TVCategories` component for horizontal TV genre browsing
- Animated mobile sidebar drawer with staggered navigation animations, backdrop blur, icon-labelled links, active route highlighting, and a pinned Browse toggle

### Changed

- Navbar redesigned with Movies and TV section tabs that highlight based on the current route
- Navigation links now dynamically switch based on the active section
- Movies routes moved to `/movies`, `/movies/explore`, and `/movies/search`
- TV routes updated to `/tv`, `/tv/explore`, and `/tv/search`
- Root route (`/`) now redirects to `/movies`
- Search page input now centers vertically when idle and animates to the top when results appear
- Movies/TV section toggle hidden on the search page since search now covers both content types
- Applied a `1440px` max-width constraint across content areas for better readability on large screens
- Hero banners, `MovieInfo`, and `TVInfo` remain full-width for a cinematic layout
- Hero banner updated to use `h-dvh` with a `min-h-[600px]` fallback to prevent collapsing on short screens
- Hero text content aligned within the `1440px` layout grid while preserving full-bleed background images

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
