import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-del-produto',
  templateUrl: './del-produto.component.html',
  styleUrls: ['./del-produto.component.css']
})
export class DelProdutoComponent implements OnInit {

  produto: Produto ={
    nome: '',
    codigo: ''
  }

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route:ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.produto.codigo = this.route.snapshot.paramMap.get('codigo') || ""
    this.preencherCampos(this.produto.codigo)
  }


  deletarProduto(codigo:string){
       this.produtoService.deletarProduto(this.produto.codigo).subscribe(()=>{
        this._snackBar.open('Produto deletado com sucesso', 'OK',{duration: 3000});
        this.router.navigate(['/produto/lista-produto'])
      }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this._snackBar.open( element.message ||"" , 'OK',{duration: 3000});
          console.log(element.message)
        });

      } else {
        if(Number.parseInt(ex.error.status) == 403){
          this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});


        }else{
          this._snackBar.open(ex.error.message, 'OK',{duration: 3000});
        console.log(ex.error.message)

        }
      }
    })
  }


    preencherCampos(codigo:string){
      this.produtoService.buscarPorcodigo(codigo).subscribe((buscado)=>{
        this.produto = buscado
      })
    }
}
