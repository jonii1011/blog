package com.example.blog.Service;

import com.example.blog.Entity.Blog;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public interface BlogService {

    List<Blog> listarBlogs();
    Blog guardarTarea(Blog blog);
    void eliminarBlog(@NotBlank Long id);
    Blog buscarBlogPorId(@NotBlank Long id);
}
