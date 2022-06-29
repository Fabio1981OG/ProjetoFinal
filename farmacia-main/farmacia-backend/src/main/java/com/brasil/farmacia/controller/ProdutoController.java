package com.brasil.farmacia.controller;


import com.brasil.farmacia.model.Produto;
import com.brasil.farmacia.service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/produto")
@AllArgsConstructor
public class ProdutoController {

    private ProdutoService produtoService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Produto> listar() {
        return produtoService.listarTodos();
    }

   
    @GetMapping("/{codigo}")
    public Optional<Produto> buscar(@PathVariable String codigo) {

        return produtoService.buscarPorCodigo(codigo);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto salvar(@RequestBody @Valid Produto produto) {

        return produtoService.salvaProduto(produto);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Produto> atualizar(@PathVariable String codigo, @RequestBody @Valid Produto produto) {

        produto.setCodigo(codigo);
        Produto atualizar = produtoService.atualizarProduto(produto);
        return ResponseEntity.ok(atualizar);
    }

   
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable String codigo) {

        produtoService.deletarPorCodigo(codigo);
    }

}