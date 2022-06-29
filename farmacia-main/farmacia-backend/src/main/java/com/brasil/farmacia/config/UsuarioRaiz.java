package com.brasil.farmacia.config;

import com.brasil.farmacia.model.Usuarios;
import com.brasil.farmacia.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UsuarioRaiz {

    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;

    @EventListener(ContextRefreshedEvent.class)
    public void salvarUsuario(){
        Usuarios usuario = new Usuarios("12345",passwordEncoder.encode("senha"));
        usuarioRepository.save(usuario);
        System.out.println("SALVO! Matricula: 12345 - Senha: 'senha'");
    }
}
