package com.example.blog.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String titulo;
    @NotBlank
    private String contenido;
    @NotBlank
    private String autor;
    private Date fechaPublicacion = new Date();
    private Estado estado;
    private boolean borrado = false;

    public Blog() {
    }

    public Blog(Long id, String titulo, String contenido, String autor, Date fechaPublicacion, Estado estado, boolean borrado) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.autor = autor;
        this.fechaPublicacion = fechaPublicacion;
        this.estado = estado;
        this.borrado = borrado;
    }
}
