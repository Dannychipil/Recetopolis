import { defineMiddleware } from "astro:middleware";
import { verifyJwt } from "@/lib/jwt";

const protectedRoutes = [
  // Recetas
  { method: "POST", path: "/api/recipes" },
  { method: "PUT", path: "/api/recipes" },
  { method: "DELETE", path: "/api/recipes" },
  // Usuarios
  { method: "PUT", path: "/api/users" },
  // Favoritos
  { method: "POST", path: "/api/users" },
  { method: "DELETE", path: "/api/users" },
  { method: "GET", path: "/api/users" },
];

const protectedPages = ["/profile"];

export const onRequest = defineMiddleware(
  async ({ request, cookies, locals, redirect }, next) => {
    const { pathname } = new URL(request.url);
    const method = request.method;

    const localsAny = locals as any;

    // Leer token una sola vez
    const token = cookies.get("token")?.value;
    localsAny.user = token ? (verifyJwt(token) as any) : null;

    // Proteger páginas — redirige al login si no está autenticado
    const isProtectedPage = protectedPages.some((page) =>
      pathname.startsWith(page),
    );
    if (isProtectedPage && !localsAny.user) {
      return redirect("/login");
    }

    // Proteger API routes — regresa 401 si no está autenticado
    const requiresAuth = protectedRoutes.some(
      (route) => route.method === method && pathname.startsWith(route.path),
    );
    if (requiresAuth && !localsAny.user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    return next();
  },
);
