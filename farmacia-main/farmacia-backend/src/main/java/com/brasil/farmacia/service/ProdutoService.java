package com.brasil.farmacia.service;

import com.brasil.farmacia.model.Produto;
import com.brasil.farmacia.repository.ProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProdutoService {

    private ProdutoRepository produtoRepository;

    public Optional<Produto> buscarPorCodigo(String matricula) {

        if (!produtoRepository.existsById(matricula)) {
            throw new RuntimeException("Produto não encontrado");
        }
        return produtoRepository.findById(matricula);
    }


    public List<Produto> listarTodos() {

        return produtoRepository.findAll();
    }


    public Produto salvaProduto(Produto produto) {

        return produtoRepository.save(produto);
    }


    public Produto atualizarProduto(Produto produto) {

        buscarPorCodigo(produto.getCodigo());
        return produtoRepository.save(produto);
    }


    public void deletarPorCodigo(String matricula) {
        buscarPorCodigo(matricula);
        produtoRepository.deleteById(matricula);
    }
}