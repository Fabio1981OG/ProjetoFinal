import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  formulario!: FormGroup



  produto: Produto ={
    codigo: '',
    nome: ''
  }

  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private router:          Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }




  ngOnInit(): void {
    this.criarFormulario()
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigo: ['', [Validators.required]],
     
    })
  }


  criarProduto(){
   // console.log(this.produto.parceiroCnpj)
    this.produtoService.salvarProduto(this.produto).subscribe(()=>{
      this._snackBar.open('Produto cadastrado com sucesso', 'Ok', {duration: 3000});
      this.formulario.reset()
      this.router.navigate(['produto/lista-produto'])
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




  validarCampos(): boolean {
    return this.formulario.valid
  }

}

