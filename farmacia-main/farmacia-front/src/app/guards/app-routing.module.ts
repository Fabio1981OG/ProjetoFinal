import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../component/login/login.component";
import { DelProdutoComponent } from "../component/produto/del-produto/del-produto.component";
import { EditProdutoComponent } from "../component/produto/edit-produto/edit-produto.component";
import { InfoProdutoComponent } from "../component/produto/info-produto/info-produto.component";
import { ListProdutoComponent } from "../component/produto/list-produto/list-produto.component";
import { NovoProdutoComponent } from "../component/produto/novo-produto/novo-produto.component";
import { AutenticacaoGuard } from "./autenticacao.guard";



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },


  {
    path:'produto/lista-produto',
    component: ListProdutoComponent,
     canActivate: [
      AutenticacaoGuard],
    },

      {
        path: 'produto/editar-produto/:codigo',
        component: EditProdutoComponent,
        canActivate: [
          AutenticacaoGuard]
      },
      {
        path: 'produto/novo-produto',
        component: NovoProdutoComponent,
        canActivate: [
          AutenticacaoGuard]
      },
      {
        path: 'produto/info-produto/:codigo',
        component: InfoProdutoComponent,
        canActivate: [
          AutenticacaoGuard]
      },
      {
        path: 'produto/delete-produto/:codigo',
        component: DelProdutoComponent,
        canActivate: [
          AutenticacaoGuard]
      },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

