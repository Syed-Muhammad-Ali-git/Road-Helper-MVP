/**
 * Client-specific protected routes
 */
const clientRoutes = [
  "/",
  "/client/dashboard",
  "/client/history",
  "/client/profile",
  "/client/request-help",
  "/client/request-status",
];

/**
 * Helper-specific protected routes
 */
const helperRoutes = [
  "/helper/dashboard",
  "/helper/earnings",
  "/helper/profile",
  "/helper/requests",
  "/helper/active-job",
];

/**
 * Public routes accessible without authentication
 */
const publicRoutes = ["/login", "/register", "/forgot-password"];

/**
 * All protected routes (for backward compatibility)
 */
const protectedRoutes = [...clientRoutes, ...helperRoutes];

export { publicRoutes, protectedRoutes, clientRoutes, helperRoutes };
