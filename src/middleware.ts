import { defineMiddleware } from 'astro:middleware'
import { verifyJwt } from '@/lib/jwt'

const protectedRoutes = [
    // Recetas
    { method: 'POST', path: '/api/recipes' },
    { method: 'PUT', path: '/api/recipes' },
    { method: 'DELETE', path: '/api/recipes' },
    // Usuarios
    { method: 'PUT', path: '/api/users' },
    //Favoritos
    { method: 'POST', path: '/api/users' },     // POST /api/user/[id]/favorites
    { method: 'DELETE', path: '/api/users' },   // DELETE /api/user/[id]/favorites
    {method: 'GET', path: '/api/users' }        // GET /api/user/[id]/favorites/[recipeId]
]

export const onRequest = defineMiddleware(async ({ request, cookies }, next) => {
    const { pathname } = new URL(request.url)
    const method = request.method

    // Verificar si la ruta y método requieren autenticación
    const requiresAuth = protectedRoutes.some(route => {
        return route.method === method && pathname.startsWith(route.path)
    })

    if (requiresAuth) {
        const token = cookies.get('token')?.value

        if (!token) {
            return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 })
        }

        const userData = verifyJwt(token)
        if (!userData) {
            return new Response(JSON.stringify({ error: 'Token inválido o expirado' }), { status: 401 })
        }
    }

    return next()
})