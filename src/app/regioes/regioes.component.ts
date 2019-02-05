import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegiaoUserService} from '../services/regiaoUser/regiaoUser.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EstadosDddService} from '../services/estadosDdd/estadosDdd.service';
import {CidadeService} from '../services/cidade/cidade.service';
import {ProdutoService} from '../services/produto/produto.service';
import {TokenService} from '../services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './regioes.component.html',
  styleUrls: ['./regioes.component.css']
})
export class RegioesComponent implements OnInit {
    listRegiaoMacro = [];
    access_token;
    tokenService;
    listDdds = [];
    listCidades = [];
    estados = [];
    produtos = [];
    getService;
    deleteOpen;
    statusApi = 0;
    getServiceCidade;
    getServiceProduto;
    helperService;
    regioes = [];
    dddEscolhido;
    ufEscolhido;
    regiaoMacroEscolhido;
    valueDdds: any = [];
    valueCidades: any = [];
    msgDelete = '';
    regiaoSelecionado = {
        createdAt: '2018-10-16',
        tipoProdutoId: '',
        tipoCadastro: '',
        status: 'Ativo',
        listArt: [],
        nome: '',
        descricao: ''
    }
    visualizacaoOpen;
    criaOrUpdateOpen;
    createOpen;
    confirmaDelete;
    p: number = 1;

    getTokenSession() {
        if (!localStorage.getItem('currentToken') || localStorage.getItem('currentToken') === '') {
            this.router.navigate(['']);
        }
    }
    constructor(private router: Router, service: RegiaoUserService , assetsService: EstadosDddService, cidadeService: CidadeService, produtoService: ProdutoService, private modalService: NgbModal, tokenService: TokenService) {
        this.getTokenSession();
        this.tokenService = tokenService;
        this.getServiceProduto = produtoService;
        this.getService = service;
        this.helperService = assetsService;
        this.getServiceCidade = cidadeService;
        this.getRegioesApi();
        this.getProdutosService();
        this.visualizacaoOpen = true;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.confirmaDelete = false;
        this.dddEscolhido = false;
        this.ufEscolhido = false;
        this.regiaoMacroEscolhido = false;
        this.deleteOpen = false;
    }
    deleteClose() {
        this.statusApi = 0
        this.getRegioesApi();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    openDelete(regiao) {
        this.statusApi = 0;
        this.regiaoSelecionado = regiao;
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = true;
    }

    deleteRegiao() {
        if (this.deleteOpen) {
            return true;
        } else {
            return false;
        }
    }
    getProdutosService() {
        this.produtos = [];
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getServiceProduto.getProdutos(this.access_token).subscribe(
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
                        } else {
                            for (var i = 0; i < data.length ; i++){
                                var produto = {
                                    id: data[i][0],
                                    nome: data[i][1],
                                    categoriaCommerceId: data[i][2]

                                }
                                this.produtos.push(produto);
                            }
                        }
                    },
                    error => {
                        if (error.status === 200) {
                            console.log(error);
                        } else {
                            console.log(error);
                        }
                    }
                );
            }
    //         errorToken => {
    //             console.log(errorToken);
    //         }
    //     );
    // }

    onProdutoSelected(event){
        console.log(event);
    }


    openLg(content, regiao) {
        console.log(regiao.nome)
        this.modalService.open(content, {size: 'lg'});
        this.msgDelete = regiao.nome;
    }


    ngOnInit() {
    }

    dddShown(){
        if(this.dddEscolhido) {
            return true;
        } else {
            return false;
        }
    }

    dddCheck(){
        this.dddEscolhido = true;
        this.ufEscolhido = false;
        this.regiaoMacroEscolhido = false;
        this.getDddsApi();
    }

    getDddsApi() {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.helperService.getDdds(this.access_token).subscribe(
                    data => {
                        for (var i = 0; i < data.length ; i++){
                            var ddd = {
                                value: data[i][0],
                                id: data[i][1]
                            }
                            this.listDdds.push(ddd);
                        }
                        console.log(this.listDdds);
                    },
                    error => {
                        if (error.status === 200) {
                            console.log(error);
                        } else {
                            console.log(error);
                        }
                    }
                );
            }
    //         errorToken => {
    //             console.log(errorToken);
    //         }
    //     );
    // }

    ufShown(){
        if(this.ufEscolhido) {
            return true;
        } else {
            return false;
        }
    }

    ufCheck(){
        this.dddEscolhido = false;
        this.ufEscolhido = true;
        this.regiaoMacroEscolhido = false;
        this.getEstadosApi();
    }

    getEstadosApi() {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.helperService.getEstados(this.access_token).subscribe(
                    data => {
                        console.log(data);
                        this.estados = data;
                    },
                    error => {
                        if (error.status === 200) {
                            console.log(error);
                        } else {
                            console.log(error);
                        }
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    onEstadoSelected(event){
        console.log(event);
        this.getCidadesApi(event);
    }

    getCidadesApi(estado) {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getServiceCidade.getCidadesByEstado(estado, this.access_token).subscribe(
                    data => {
                        console.log(data);
                        for (var i = 0; i < data.length ; i++){
                            var cidade = {
                                id: data[i][0],
                                nome: data[i][3]
                            }
                            this.listCidades.push(cidade);
                        }
                        console.log(this.listCidades);

                    },
                    error => {
                        if (error.status === 200) {
                            console.log(error);
                        } else {
                            console.log(error);
                        }
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    regiaoMacroShown(){
        if(this.regiaoMacroEscolhido) {
            return true;
        } else {
            return false;
        }
    }

    regiaoMacroCheck(){
        this.dddEscolhido = false;
        this.ufEscolhido = false;
        this.regiaoMacroEscolhido = true;
    }




    visualizacao(){
        if(this.visualizacaoOpen) {
            return true;
        } else {
            return false;
        }
    }

    updateRegiao(){
        if(this.criaOrUpdateOpen) {
            return true;
        } else {
            return false;
        }
    }

    createRegiao(){
        if(this.createOpen) {
            return true;
        } else {
            return false;
        }
    }

    updateClose() {
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.getRegioesApi();
    }

    createClose() {
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.getRegioesApi();
    }


    openEditar(regiao) {
        this.statusApi = 0;
        this.regiaoSelecionado = regiao;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.createOpen = false;
    }

    openCreate() {
        this.statusApi = 0;
        this.regiaoSelecionado = {
            createdAt: '',
            tipoProdutoId: '',
            tipoCadastro: '',
            status: 'Ativo',
            listArt: [],
            nome: '',
            descricao: ''
        };
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = true;
    }


    getRegioesApi() {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.getRegioes(this.access_token).subscribe(
                    data => {
                        console.log(data.status);
                        this.regioes = [];
                        if (data.status === 200) {
                            console.log(data);
                        } else {
                            for (var i = 0; i < data.length ; i++){
                                var regiao = {
                                    id: data[i][0],
                                    nome: data[i][1],
                                    publicar: false,
                                    produtoId: data[i][2] ,
                                    nomeProduto: data[i][3],
                                    descricao: data[i][4],
                                    status: data[i][5],
                                    createdAt: data[i][6]
                                }
                                this.regioes.push(regiao);
                            }
                            console.log(data);
                        }
                    },
                    error => {
                        if (error.status === 200) {
                            console.log(error);
                        } else {
                            console.log(error);
                        }
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    checkRegioes(regioes, id){
        this.regioes = regioes;
        for (let i = 0; i < regioes.length; i++){
            if(regioes[i].id === id){
                regioes[i].publicar = true;
            }
        }
    }

    publicaRegioes(){
        let arrayPublicaRegioes = [];
        for(let i = 0; i < this.regioes.length; i++){
            if(this.regioes[i].publicar){
                let regiaoPublicada = {
                    nome: this.regioes[i].nome,
                    regiaoId : this.regioes[i].id,
                    createdAt : this.regioes[i].createdAt
                };
                arrayPublicaRegioes.push(regiaoPublicada);
            }
        }
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.createPublicaRegioes(arrayPublicaRegioes).subscribe(
                    data => {
                            this.statusApi = 1;
                    },
                    error => {
                        this.statusApi = 2;
                        console.log(error);
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    updateRegiaoAcao(regiao){
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.updateRegiao(regiao, this.access_token).subscribe(
                    data => data => {
                        console.log(data.status);
                        console.log(data.status);
                        this.regioes = data;
                        this.statusApi = 1;
                    },
                    error => {
                        console.log(error);
                        this.statusApi = 2;
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }


    deleteRegiaoAcao(regiao){
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.deleteRegiao(regiao.id, this.access_token).subscribe(
                    data => {
                        this.getRegioesApi();
                        this.deleteClose();
                    },
                    error => {
                        console.log(error);
                        this.statusApi = 2;
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    createRegiaoAcao(regiao){
        regiao.createdAt = '2018-10-16'
        if (this.ufShown()){
            let arrayCidades = [];
            regiao.tipoCadastro = 'UF';
            for(let i = 0; i < this.valueCidades.length; i++){
                arrayCidades.push(this.valueCidades[i].id);
            }
            regiao.listArt = arrayCidades;
        }
        if(this.dddShown()){
            regiao.tipoCadastro = 'DDD';
            let arrayDdds = [];
            for(let i = 0; i < this.valueDdds.length; i++){
                arrayDdds.push(this.valueDdds[i].id);
            }
            regiao.listArt = arrayDdds;
        }
        console.log(regiao);
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.createRegioes(regiao, this.access_token).subscribe(
                    data => {
                        if(data.id === 200){
                            this.regioes = data;
                            this.statusApi = 1;
                        }else{
                            this.regioes = data;
                            this.statusApi = 2;
                        }
                    },
                    error => {
                        console.log(error);
                        this.statusApi = 2;
                    }
                );
    //         } ,
    //         errorToken => {
    //             console.log(errorToken);
    //         }
    //     );
    // }
    }
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

}
