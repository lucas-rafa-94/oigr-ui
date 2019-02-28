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
    dddTodos = false;
    cidadeTodos = false;
    listRegiaoMacro = [];
    listMissingCidades = [];
    access_token;
    buscaCidades;
    tokenService;
    listDdds = [];
    listCidades = [];
    listEstados: any = [];
    valueEstados: any = [];
    estados = [];
    produtos = [];
    mensagem;
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
    showSpinner;
    msgDelete = '';
    regiaoSelecionado = {
        createdAt: '2018-10-16',
        tipoProdutoId: '',
        tipoCadastro: '',
        status: 'Rascunho',
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
        this.getMissingCidades();
        this.showSpinner = true;
        this.buscaCidades = false;
    }
    deleteClose() {
        this.statusApi = 0
        this.getRegioesApi();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    cidadeSelecionarTodos(){
        if(this.cidadeTodos === false){
            this.valueCidades = this.listCidades;
            this.cidadeTodos = false;
        } else if (this.cidadeTodos === true){
            this.valueCidades = [];
            this.cidadeTodos = true;
        }
    }

    dddSelecionarTodos(){
        if(this.dddTodos === false){
            this.valueDdds = this.listDdds;
            this.dddTodos = false;
        } else if (this.dddTodos === true){
            this.valueDdds = [];
            this.dddTodos = true;
        }
    }
    buscaCidadesFun(){
        if(this.buscaCidades){
            return true;
        }else{
            return false;
        }
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

    ativo(status){
        if(status === 'Ativo'){
            return false;
        }else{
            return true;
        }
    }

    notAtivo(status){
        if(status === 'Ativo'){
            return true;
        }else{
            return false;
        }
    }

    getMissingCidades(){
        this.showSpinner = true;
        this.getService.getCidadesMissing().subscribe(
            data => {
                this.listMissingCidades = data;
                this.showSpinner = false;
            },
            error => {
                this.showSpinner = false;
                console.log(error);
            }
        );
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
                for (var i = 0; i < data.length ; i++){
                    var estado = {
                        id: data[i][0],
                        nome: data[i][1]
                    }
                    this.listEstados.push(estado);
                }
                console.log(this.listEstados);
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

    onEstadoSelected(event) {
        console.log(event);
        this.getCidadesApi(event);
        // this.listCidades = [];
    }

    getCidadesApi(estados) {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.showSpinner = true;
        console.log(estados)
        let ids = '';
        for(var i = 0; i < estados.length; i ++){
            ids += estados[i].id + ',';
        }
        console.log(ids);
        this.getServiceCidade.getCidadesByEstado(ids, this.access_token).subscribe(
            data => {
                console.log(data);
                for (var i = 0; i < data.length ; i++){
                    var cidade = {
                        id: data[i][0],
                        nome: data[i][3]
                    }
                    this.listCidades.push(cidade);
                }
                this.buscaCidades = true;
                this.showSpinner = false;
                console.log(this.listCidades);

            },
            error => {
                this.showSpinner = false;
                console.log(error);
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
        this.valueDdds = [];
        this.listDdds = [];
        this.valueCidades = [];
        this.valueEstados = [];
        this.listCidades = [];
        this.listEstados = [];
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.getRegioesApi();
        this.getMissingCidades();
    }

    createClose() {
        this.statusApi = 0;
        this.listDdds = [];
        this.valueDdds = [];
        this.listDdds = [];
        this.valueCidades = [];
        this.valueEstados = [];
        this.listCidades = [];
        this.listDdds = [];
        this.listEstados = [];
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.buscaCidades = false;
        this.getRegioesApi();
    }


    openEditar(regiao) {
        this.statusApi = 0;
        this.regiaoSelecionado = regiao;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        console.log(regiao);
        if(regiao.tipoCadastro === 'DDD'){
            this.dddEscolhido = true;
            this.ufEscolhido = false;
            this.getRegioesApiByDdd(regiao);
        }else if (regiao.tipoCadastro === 'UF'){
            this.ufEscolhido = true;
            this.dddEscolhido = false;
            this.getEstadosCidadesApiByRegiao(regiao);
        }

    }

    getEstadosCidadesApiByRegiao(regiao) {
        this.showSpinner = true;
        this.helperService.getEstados(this.access_token).subscribe(
            data => {
                console.log(data);
                for (var i = 0; i < data.length ; i++){
                    var estado = {
                        id: data[i][0],
                        nome: data[i][1]
                    }
                    this.listEstados.push(estado);
                }
                console.log(this.listEstados);
                this.getService.getRegioesByEstado(regiao.id, this.access_token).subscribe(
                    dataRegiao => {
                        console.log(dataRegiao);
                        this.valueEstados = dataRegiao;
                        let ids = '';
                        for(var i = 0; i < this.valueEstados.length; i ++){
                            ids += this.valueEstados[i].id + ',';
                        }
                        this.getServiceCidade.getCidadesByEstado(ids, this.access_token).subscribe(
                            dataGetCidades => {
                                console.log(dataGetCidades);
                                for (var i = 0; i < dataGetCidades.length ; i++){
                                    var cidade = {
                                        id: dataGetCidades[i][0],
                                        nome: dataGetCidades[i][3]
                                    }
                                    this.listCidades.push(cidade);
                                }
                                console.log(this.listCidades);
                                this.getService.getRegioesByCidade(regiao.id, this.access_token).subscribe(
                                    dataListCidade => {
                                        console.log(dataListCidade);
                                        this.valueCidades = dataListCidade;
                                        this.showSpinner = false;
                                    },
                                    errorListCidade => {
                                        console.log(errorListCidade);
                                        this.showSpinner = false;
                                    }
                                );

                            },
                            errorGetCidades => {
                                console.log(errorGetCidades);
                            }
                        );
                    },
                    errorRegiao => {
                            console.log(errorRegiao);
                            this.showSpinner = false;
                    }
                );
            },
            error => {
                console.log(error);
            }
        );
    }
    getRegioesApiByDdd(regiao) {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.showSpinner = true;
        this.helperService.getDdds(this.access_token).subscribe(
            data => {
                for (var i = 0; i < data.length ; i++){
                    var ddd = {
                        value: data[i][0],
                        id: data[i][1]
                    }
                    this.listDdds.push(ddd);

                }
                this.getService.getRegioesByDdd(regiao.id, this.access_token).subscribe(
                    dataIn => {
                        console.log(dataIn);
                        this.valueDdds = dataIn;
                        this.showSpinner = false;
                    },
                    errorIn => {
                        console.log(errorIn);
                        this.showSpinner = false;
                    }
                );
                console.log(this.listDdds);
            },
            error => {
                this.showSpinner = false;
                console.log(error)
            }
        );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }


    openCreate() {
        this.statusApi = 0;
        this.regiaoSelecionado = {
            createdAt: '',
            tipoProdutoId: '',
            tipoCadastro: '',
            status: 'Rascunho',
            listArt: [],
            nome: '',
            descricao: ''
        };
        this.listDdds = [];
        this.listCidades = [];
        this.listEstados = [];
        this.dddEscolhido = false;
        this.ufEscolhido = false;
        this.regiaoMacroEscolhido = false;
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
                            tipoProdutoId: data[i][2] ,
                            nomeProduto: data[i][3],
                            descricao: data[i][4],
                            status: data[i][5],
                            createdAt: data[i][6],
                            tipoCadastro: data[i][7]
                        }
                        this.regioes.push(regiao);
                    }

                    console.log(data);
                }
            },
            error => {
                    console.log(error);

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
        this.showSpinner = true;
        let arrayPublicaRegioes = [];
        for(let i = 0; i < this.regioes.length; i++){
            if(this.regioes[i].publicar && this.regioes[i].status === 'Rascunho'){
                let regiaoPublicada = {
                    id: this.regioes[i].id,
                    nome: this.regioes[i].nome,
                    regiaoId : this.regioes[i].id,
                    createdAt : this.regioes[i].createdAt
                };
                arrayPublicaRegioes.push(regiaoPublicada);
            }
        }
        console.log(arrayPublicaRegioes);
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.getService.createPublicaRegioes(arrayPublicaRegioes).subscribe(
            data => {

                this.statusApi = 1;
                this.showSpinner = false;
                this.getRegioesApi();
            },
            error => {
                this.statusApi = 2;
                this.showSpinner = false;
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
        this.showSpinner = true;
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
        regiao.status = 'Rascunho';
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.getService.updateRegioes(regiao, this.access_token).subscribe(
            data => {
                if (data.id === 200){
                    this.statusApi = 1;
                }else {
                    this.mensagem = data.status;
                    this.statusApi = 2;
                }
                this.showSpinner = false;
            },
            error => {
                this.mensagem = "Erro ao realizar a operação.";
                this.showSpinner = false;
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


    deleteRegiaoAcao(regiao){
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.getService.deleteRegiao(regiao.id, regiao.nome, this.access_token).subscribe(
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
        this.showSpinner = true;
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
                if (data.id === 200){
                    this.statusApi = 1;
                }else {
                    this.mensagem = data.status;
                    this.statusApi = 2;
                }
                this.showSpinner = false;
            },
            error => {
                console.log(error);
                this.mensagem = "Erro ao realizar a operação."
                this.statusApi = 2;
                this.showSpinner = false;
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