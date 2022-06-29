import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-edit-produto',
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.css']

})
export class EditProdutoComponent implements OnInit {

formulario!:FormGroup


  produto: Produto ={
    codigo: '',
    nome: ''
  }

  constructor(
   private produtoService: ProdutoService,
   private formBuilder: FormBuilder,
   private _snackBar: MatSnackBar,
   private router: Router,
   private route:ActivatedRoute,
   private dialog: MatDialog,
  ) { }



  ngOnInit(): void {
    this.produto.codigo = this.route.snapshot.paramMap.get('codigo') || ""
    this.preencherCampos(this.produto.codigo)
    this.criarFormulario()
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      nome: [this.produto.nome, [Validators.required, Validators.minLength(3)]],
      email:[this.produto.codigo, [Validators.required]],

    })
  }


  editarProduto(){
    this.produtoService.atualizarProduto(this.produto).subscribe(()=>{
      this._snackBar.open('Produto atualizado com sucesso', 'OK',{duration: 3000});
      const codigo = this.produto.codigo
      this.formulario.reset()
      this.router.navigate([`produto/info-produto/${codigo}`])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.fields.forEach((element: { title: string | undefined; }) => {
          this._snackBar.open( element.title ||"Dados invalidos" , 'OK',{duration: 3000});
        });

      } else {
        if(Number.parseInt(ex.error.status) == 403){
          this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});



        }else{
        this._snackBar.open(ex.error.title || "Dados invalidos", 'OK',{duration: 3000});

        ex.error.fields.forEach((element: { userMesage: string | undefined; }) => {
          this._snackBar.open( element.userMesage ||"Dados invalidos" , 'OK',{duration: 3000});
        });
        }
      }

    })

 }


  preencherCampos(codigo:string){
    this.produtoService.buscarPorcodigo(this.produto.codigo).subscribe((buscado)=>{
      this.produto = buscado
    })
  }




  validarCampos(): boolean  {
    return this.formulario.valid
  }
}
