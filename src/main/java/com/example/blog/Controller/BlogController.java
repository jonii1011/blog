package com.example.blog.Controller;

import com.example.blog.Entity.Blog;
import com.example.blog.Service.BlogServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private BlogServiceImpl blogService;

    @Operation(summary = "Listar todos los blogs", description = "Devuelve una lista de todos los blogs disponibles.")
    @GetMapping
    public List<Blog> listarBlogs() {
        return blogService.listarBlogs();
    }

    @Operation(summary = "Guardar un nuevo blog", description = "Crea un nuevo blog en la base de datos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Blog creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    })
    @PostMapping
    public Blog guardarBlog(@RequestBody Blog blog) {
        return blogService.guardarTarea(blog);
    }

    @Operation(summary = "Actualizar un blog existente", description = "Actualiza un blog existente por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Blog actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Blog no encontrado")
    })
    @PutMapping("/{id}")
    public Blog actualizarBlog(@PathVariable Long id, @RequestBody Blog blog) {
        blog.setId(id);
        return blogService.guardarTarea(blog);
    }

    @Operation(summary = "Eliminar un blog", description = "Elimina un blog existente por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Blog eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Blog no encontrado")
    })
    @DeleteMapping("/{id}")
    public void eliminarBlog(@PathVariable Long id) {
        blogService.eliminarBlog(id);
    }

    @Operation(summary = "Buscar un blog por ID", description = "Devuelve un blog específico por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Blog encontrado"),
            @ApiResponse(responseCode = "404", description = "Blog no encontrado")
    })
    @GetMapping("/{id}")
    public Blog buscarBlogPorId(@PathVariable Long id) {
        return blogService.buscarBlogPorId(id);
    }


}
