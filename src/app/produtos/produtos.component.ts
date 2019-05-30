import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProdutoService} from '../services/produto/produto.service';
import {TokenService} from '../services/token/token.service';


@Component({
  selector: 'app-upload',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
    getService;
    produtos = [];
    access_token;
    tokenService;
    showSpinner;
    statusApi = 0;
    produtoSelecionado = {
        nome: '',
        createdAt: ''
    };
    visualizacaoOpen;
    deleteOpen;
    criaOrUpdateOpen;
    createOpen;
    p: number = 1;

  // getTokenSession() {
  //   if (!localStorage.getItem('currentToken') || localStorage.getItem('currentToken') === '') {
  //     this.router.navigate(['']);
  //   }
  // }
  constructor(private router: Router, service: ProdutoService, tokenService: TokenService) {
      // this.getTokenSession();
      this.tokenService = tokenService;
      this.getService = service;
      this.getProdutosService();
      this.visualizacaoOpen = true;
      this.criaOrUpdateOpen = false;
      this.createOpen = false;
      this.deleteOpen = false;
      this.showSpinner = true;
  }

    visualizacao() {
        if (this.visualizacaoOpen) {
            return true;
        } else {
            return false;
        }
    }

    updateProduto() {
        if (this.criaOrUpdateOpen){
            return true;
        } else {
            return false;
        }
    }

    createProduto() {
        if (this.createOpen) {
            return true;
        } else {
            return false;
        }
    }

    deleteProduto() {
        if (this.deleteOpen) {
            return true;
        } else {
            return false;
        }
    }


    updateClose() {
        this.statusApi = 0
        this.getProdutosService();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
    }

    createClose() {
        this.statusApi = 0;
        this.produtoSelecionado = {
            nome: '',
            createdAt: ''
        };
        this.getProdutosService();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
    }

    deleteClose() {
        this.statusApi = 0
        this.getProdutosService();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    openDelete(produto) {
        this.produtoSelecionado = produto;
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = true;
    }


    openEditar(produto) {
        this.produtoSelecionado = produto;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
    }

    openCreate() {

        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = true;
        this.deleteOpen = false;
    }


    getProdutosService() {
        this.showSpinner = true;
        this.produtos = [];
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.getProdutos(this.access_token).subscribe(
                    data => {
                        if (data.status === 200) {
                            for (var i = 0; i < data.length ; i++){
                                var produto = {
                                    id: data[i][0],
                                    nome: data[i][1],
                                    categoriaCommerceId: data[i][2]
                                }
                                this.produtos.push(produto);
                            }
                            console.log(data[1][1]);
                            this.showSpinner = false;
                        } else {
                            for (var i = 0; i < data.length ; i++){
                                var produto = {
                                    id: data[i][0],
                                    nome: data[i][1],
                                    categoriaCommerceId: data[i][2]

                                }
                                this.produtos.push(produto);
                            }
                            this.showSpinner = false;
                        }
                    },
                    error => {
                        console.log(error)
                        this.showSpinner = false;
                    }
                );
            }
    //         errorToken => {
    //             console.log(errorToken);
    //         }
    //     );
    // }

    updateProdutoAcao(produto) {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.showSpinner = true;
                this.getService.updateProduto(produto, this.access_token).subscribe(
                    data => {
                        console.log(data.status);
                        if (data.status === 200) {
                            console.log(data);
                            this.produtos = data;
                            this.statusApi = 1;
                        } else {
                            console.log(data);
                            this.produtos = data;
                            this.statusApi = 1;
                        }
                        this.showSpinner = false;
                    },
                    error => {
                        this.statusApi = 1;
                        this.showSpinner = false;
                    }
                );
            }
    //         errorToken => {
    //             console.log(errorToken);
    //         }
    //     );
    // }

    createProdutoAcao(produto){

        this.showSpinner = true;

        if(produto.nome !== '' && produto.categoriaCommerceId !== '' ){
            // this.tokenService.getToken().subscribe(
            //     dataToken => {
            //         console.log(dataToken.access_token);
            //         this.access_token = dataToken.access_token;
            this.getService.createProduto(produto, this.access_token).subscribe(
                data => {
                    console.log(data.status);
                    if(data.id === 400){
                        this.statusApi = 2;
                    }else{
                        this.statusApi = 1;
                    }
                    this.showSpinner = false;
                },
                error => {
                    if (error.status === 200) {
                        console.log(error);
                        this.statusApi = 2;
                    } else {
                        console.log(error);
                    }
                    this.showSpinner = false;
                }
            );
        }else{
            this.statusApi = 2;
            this.showSpinner = false;
        }
        //         errorToken => {
        //             console.log(errorToken);
        //         }
        //     );
        }
    deleteProdutoAcao(produto) {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.deleteProduto(produto.id, this.access_token).subscribe(
                    data => {
                        this.deleteClose();
                    },
                    error => {
                        this.statusApi = 2;
                    }
                );
            }
    //         errorToken => {
    //             console.log(errorToken);
    //         }
    //     );
    // }

    submitSucesso() {
        if (this.statusApi === 1) {
            return true;
        } else {
            return false;
        };
    }
    submitFalha() {
        if (this.statusApi === 2) {
            return true;
        } else {
            return false;
        };
    }

    ngOnInit() {}
}



