package com.example.blog.Service;

import com.example.blog.Entity.Blog;
import com.example.blog.Repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<Blog> listarBlogs() {
        return blogRepository.findAll().stream()
                .filter(blog -> !blog.isBorrado()).toList();
    }

    @Override
    public Blog guardarTarea(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public void eliminarBlog(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(); //Busca el blog por id sino marca una excepcion con orElseThrow
        blog.setBorrado(true);
        blogRepository.save(blog);
    }

    @Override
    public Blog buscarBlogPorId(Long id) {
        return blogRepository.findById(id).orElseThrow();
    }
}
