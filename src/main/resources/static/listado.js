document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = '/api/blog';

    // Función para formatear la fecha
    function formatearFecha(fecha) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(fecha).toLocaleDateString('es-ES', options);
    }

    // Función para cargar las tareas
    async function cargarBlog() {
        try {
            // Realiza una solicitud HTTP GET a la API para obtener los blogs
            const response = await fetch(apiUrl);

            // Verifica si la respuesta fue exitosa (código de estado 200-299)
            if (!response.ok) {
                // Si la respuesta no es exitosa, lanza un error con el mensaje de estado
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            // Convierte la respuesta en formato JSON y la almacena en la variable blogs
            const blogs = await response.json();

            // Obtiene el elemento del DOM donde se mostrarán los blogs
            const blogsBody = document.getElementById('blog-body');

            // Limpia el contenido previo del elemento para evitar duplicados
            blogsBody.innerHTML = '';

            // Itera sobre cada blog obtenido de la API
            blogs.forEach(blog => {
                // Crea una nueva fila de blog para cada blog
                const row = document.createElement('tr');

                // Define el contenido HTML de la fila, incluyendo los datos del blog y los botones de acción
                row.innerHTML = `
                <td>${blog.titulo}</td>
                <td>${blog.contenido}</td>
                <td>${blog.autor}</td>
                <td>${formatearFecha(blog.fechaPublicacion)}</td>
                <td>${blog.estado}</td>
                <td>
                    <button class="btn btn-info" onclick="verBlog(${blog.id})">Ver</button>
                    <button class="btn btn-warning" onclick="editarBlog(${blog.id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarBlog(${blog.id})">Eliminar</button>
                </td>
            `;

                // Agrega la nueva fila al cuerpo de la tabla en el DOM
                blogsBody.appendChild(row);
            });
        } catch (error) {
            // Captura cualquier error que ocurra durante el proceso
            console.error('Error al cargar los blogs:', error);

            // Muestra un mensaje de alerta al usuario en caso de error
            alert('No se pudieron cargar los blogs. Por favor, intenta de nuevo más tarde.');
        }
    }


    // Función para eliminar un blog con confirmación
    window.eliminarBlog = async function(id) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            cargarBlog();
            Swal.fire('Eliminado', 'El blog ha sido eliminado.', 'success');
        }
    };

    // Función para editar tarea
    window.editarBlog = function(id) {
        localStorage.setItem('blogId', id); // Almacenar el ID de la tarea
        window.location.href = 'formulario.html'; // Redirigir al formulario
    };

    // Función para crear nueva tarea
    window.nuevoBlog = function() {
        localStorage.removeItem('blogId'); // Limpiar el ID en caso de que exista
        window.location.href = 'formulario.html'; // Redirigir al formulario
    };

    window.verBlog = async function(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            const blog = await response.json();

            // Llenar el modal con los detalles del blog
            document.getElementById('modal-titulo').innerText = blog.titulo;
            document.getElementById('modal-contenido').innerText = blog.contenido;
            document.getElementById('modal-autor').innerText = blog.autor;
            document.getElementById('modal-fecha').innerText = formatearFecha(blog.fechaPublicacion);
            document.getElementById('modal-estado').innerText = blog.estado;

            // Mostrar el modal
            $('#blogModal').modal('show');
        } catch (error) {
            console.error('Error al cargar los detalles del blog:', error);
            alert('No se pudieron cargar los detalles del blog. Por favor, intenta de nuevo más tarde.');
        }
    };

    cargarBlog();
});