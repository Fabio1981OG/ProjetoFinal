import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
@Component({
  selector: 'app-info-produto',
  templateUrl: './info-produto.component.html',
  styleUrls: ['./info-produto.component.css']
})
export class InfoProdutoComponent implements OnInit {

  produto: Produto ={
    codigo: '',
    nome: ''
  }

  displayedColumns: string[] = ['nome', 'codigo',  'acoes'];
  // dataSource = new MatTableDataSource<Produto>(this.produto.empresas );

  displayedColumnsForms: string[] = ['nomeFormulario', 'acoes'];
  // dataSourceForms = new MatTableDataSource<Formularios>(this.produto.formularios );

  constructor(
    private produtoService: ProdutoService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.produto.codigo = this.route.snapshot.paramMap.get('codigo') || ""
    this.preencherCampos(this.produto.codigo)
    // this.produto.empresas?.forEach(empresas =>{console.log(empresas.nome)})
    // this.crirarFormulario()

  }


  /**
  * Busca um produto
  * @param codigo Busca os dados de um produto de acordo com o seu codigo
  */
  preencherCampos(codigo:string){
    this.produtoService.buscarPorcodigo(codigo).subscribe((buscado)=>{
      this.produto = buscado
      // this.dataSource = new MatTableDataSource<Empresas>(this.produto.empresas);
    })
  }

}
