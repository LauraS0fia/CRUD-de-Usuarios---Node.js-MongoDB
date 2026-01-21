const table = document.getElementById("userTable");
const form = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");

let editingId = null;

// Cargar usuarios al inicio
async function loadUsers() {
    const res = await fetch("/api/users");
    const users = await res.json();

    table.innerHTML = "";

    users.forEach(u => {
        table.innerHTML += `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.age}</td>
                <td>
                    <button onclick="editUser('${u._id}', '${u.name}', '${u.email}', ${u.age})">Editar</button>
                    <button onclick="deleteUser('${u._id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Editar usuario → llenar formulario
function editUser(id, name, email, age) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("age").value = age;

    editingId = id;
    submitBtn.textContent = "Actualizar";
    
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Eliminar usuario
async function deleteUser(id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        await fetch("/api/users/" + id, { method: "DELETE" });
        loadUsers();
    }
}

// Guardar / Actualizar
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value
    };

    try {
        // Si estamos editando → PUT
        if (editingId) {
            await fetch("/api/users/" + editingId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            editingId = null;
            submitBtn.textContent = "Guardar";
        } 
        // Si es nuevo → POST
        else {
            await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
        }

        form.reset();
        loadUsers();
    } catch (error) {
        alert('Error al guardar el usuario');
        console.error(error);
    }
});

loadUsers();