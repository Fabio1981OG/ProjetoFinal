
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './guards/app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { DelProdutoComponent } from './component/produto/del-produto/del-produto.component';
import { EditProdutoComponent } from './component/produto/edit-produto/edit-produto.component';
import { InfoProdutoComponent } from './component/produto/info-produto/info-produto.component';
import { ListProdutoComponent } from './component/produto/list-produto/list-produto.component';
import { NovoProdutoComponent } from './component/produto/novo-produto/novo-produto.component';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DelProdutoComponent,
    EditProdutoComponent,
    InfoProdutoComponent,
    ListProdutoComponent,
    NovoProdutoComponent,
    LoginComponent
  ],
  imports: [

    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [

    AuthInterceptorProvider,
    [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
