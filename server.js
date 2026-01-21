const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");


// Conectarse a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud_node_puro")
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Error en MongoDB:", err));

// Función para leer cuerpo JSON
function readBody(req) {
    return new Promise((resolve) => {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => resolve(body ? JSON.parse(body) : {}));
    });
}

const server = http.createServer(async (req, res) => {

    // ------------------ ARCHIVOS ESTÁTICOS ------------------
    if (req.method === "GET" && !req.url.startsWith("/api")) {
        let filePath = path.join(
            __dirname,
            "public",
            req.url === "/" ? "index.html" : req.url
        );

        const ext = path.extname(filePath);
        const types = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript"
        };

        if (fs.existsSync(filePath)) {
            res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
            return res.end(fs.readFileSync(filePath));
        }
    }

    // ------------------ API CRUD ------------------
    if (req.url.startsWith("/api/users")) {

        // GET /api/users
        if (req.method === "GET" && req.url === "/api/users") {
            const users = await User.find();
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(users));
        }

        // POST /api/users
        if (req.method === "POST" && req.url === "/api/users") {
            const body = await readBody(req);
            const newUser = await User.create(body);
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(newUser));
        }

        // PUT / DELETE /api/users/:id
        const match = req.url.match(/^\/api\/users\/(.+)$/);

        if (match) {
            const id = match[1];

            // PUT actualizar
            if (req.method === "PUT") {
                const body = await readBody(req);
                const updated = await User.findByIdAndUpdate(id, body, { new: true });
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(updated));
            }

            // DELETE eliminar
            if (req.method === "DELETE") {
                await User.findByIdAndDelete(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Eliminado" }));
            }
        }
    }

    // Si no encuentra nada:
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
});

// Iniciar servidor
server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});