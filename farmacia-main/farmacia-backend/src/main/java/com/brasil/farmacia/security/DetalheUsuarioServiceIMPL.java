
package com.brasil.farmacia.security;


import com.brasil.farmacia.model.Usuarios;
import com.brasil.farmacia.repository.UsuarioRepository;
import com.brasil.farmacia.security.config.DetalheUsuarioData;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class DetalheUsuarioServiceIMPL implements UserDetailsService {

    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String matricula) throws UsernameNotFoundException {
        Optional<Usuarios> usuario = repository.findById(matricula);
        if (usuario.isEmpty()) {
            throw new UsernameNotFoundException("Usuário [" + matricula + "] não encontrado");
        }

        return new DetalheUsuarioData(usuario);
    }
}

