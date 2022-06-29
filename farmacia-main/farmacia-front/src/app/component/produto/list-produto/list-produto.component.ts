import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css']
})
export class ListProdutoComponent implements OnInit {

  ELEMENT_DATA: Produto[] = []
  columns : String[] = ['nome', 'codigo', 'actions']

  @ViewChild(MatPaginator) paginator: any;

  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  constructor(
    private produtoService: ProdutoService,
    private service: AuthService,

    ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.produtoService.listarTodos().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Produto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


sair(){
  this.service.logout()
}

}
