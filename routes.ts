/**
 * An array of routes that are publicly accessible
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/auth/login",
    "/auth/register",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in user to home page
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register"
]

/**
 *  An array of routes that are used for admin routes
 * These routes will redirect logged in Admin to admin page
 * @type {string[]}
 */
export const adminRoutes: string[] = [
    "/admin/dashboard",
    "/admin/fligts",
    "/admin/users",
    "/admin/tickets",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth"

/**
 * The prefix for admin routes
 * Routes that start with this prefix are used for admin purposes
 * @type {string}
 */
export const adminRoutePrefix: string = "/admin"
/**
 * The default login redirect path
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/"
export const DEFAULT_ADMIN_REDIRECT: string = "/admin/dashboard"
