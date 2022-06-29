import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/model/credenciais';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    matricula: '1234',
    senha: 'senha'
  }

  matricula = new FormControl("1234", Validators.required);
  senha = new FormControl("senha", Validators.minLength(3));


  constructor(
    private service: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successfulLogin((resposta.headers.get('Authorization') || "").substring(7));
      this.router.navigate(['produto/lista-produto'])

    }, ex =>{
      this._snackBar.open( ex.error ||"Resposta com campos invalidos" , 'OK',{duration: 5000});

    })
  }

  validaCampos(): boolean {
    return this.matricula.valid && this.senha.valid
  }

}
