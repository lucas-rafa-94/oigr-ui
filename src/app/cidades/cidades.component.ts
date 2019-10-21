import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CidadeService} from '../services/cidade/cidade.service';
import {EstadosDddService} from '../services/estadosDdd/estadosDdd.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit {
    getService;
    access_token;
    estadoSelecionado;
    showSpinner;
    dddSelecionado;
    statusApi = 0;
    getEstados;
    deleteOpen;
    cidadeSelecionado;
    cidades = [];
    ddds;
    estados;
    visualizacaoOpen;
    criaOrUpdateOpen;
    createOpen;
    p: number = 1;

    getTokenSession() {
        if (!localStorage.getItem('currentToken') || localStorage.getItem('currentToken') === '') {
            this.router.navigate(['']);
        }
    }
  constructor(private router: Router, service: CidadeService, estadoService: EstadosDddService) {
      this.getTokenSession();
      this.getService = service;
      this.getCidades();
      this.getEstados = estadoService;
      this.visualizacaoOpen = true;
      this.criaOrUpdateOpen = false;
      this.createOpen = false;
      this.deleteOpen = false
      this.showSpinner = true;
  }

  ngOnInit() {
  }

    deleteClose() {
        this.statusApi = 0;
        this.getCidades();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    openDelete(cidade) {
        this.cidadeSelecionado = cidade;
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = true;
    }

    deleteCidade() {
        if (this.deleteOpen) {
            return true;
        } else {
            return false;
        }
    }



    visualizacao(){
        if(this.visualizacaoOpen){
            return true;
        } else {
            return false;
        }
    }

    updateCidade(){
        if(this.criaOrUpdateOpen){
            return true;
        } else {
            return false;
        }
    }

    createCidade(){
        if(this.createOpen){
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
        this.deleteOpen = false;
        this.getCidades();
    }

    createClose() {
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.deleteOpen = false;
        this.getCidades();
    }


    openEditar(cidade) {
        console.log(cidade);
        this.getEstadosApi();
        this.getDddsApi();
        this.cidadeSelecionado = cidade;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.deleteOpen = false;
        this.createOpen = false;
    }

    openCreate() {
        this.cidadeSelecionado = {
            estadoId: '',
            dddId: 0,
            nome: ''
        };
        this.getEstadosApi();
        this.getDddsApi();
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.deleteOpen = false;
        this.createOpen = true;
    }

    onEstadoSelected(event){
        console.log(event);
    }

    getEstadosApi() {
                this.getEstados.getEstados(this.access_token).subscribe(
                    data => {
                        console.log(data);
                        // for (var i = 0; i < data.length ; i++){
                        //     this.estados.push(data[i][1]);
                        // }
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
    }

    onDddSelected(event){
        console.log(event);
    }

    getDddsApi() {
                this.getEstados.getDdds(this.access_token).subscribe(
                    data => {
                        console.log(data);
                        this.ddds = data;
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

    getCidades() {
        this.showSpinner = true;

                this.getService.getCidades(this.access_token).subscribe(
                    data => {
                        console.log(data[0]);
                        for (var i = 0; i < data.length ; i++){
                            var cidade = {
                                id: data[i][0],
                                dddId: data[i][1],
                                estadoId: data[i][2],
                                nome: data[i][3],
                                estado: data[i][4]
                            }
                            this.cidades.push(cidade);
                        }
                        this.showSpinner = false;
                    },
                    error => {
                        console.log(error)
                        this.showSpinner = false;
                    }
                );
    }

    updateCidadeAcao(cidade){
                this.showSpinner = true;
                this.getService.updateCidade(cidade, this.access_token).subscribe(
                    data => {
                        this.showSpinner = false;
                        this.statusApi = 1;
                    },
                    error => {
                        this.showSpinner = false;
                        this.statusApi = 2;
                    }
                );
    }

    createCidadeAcao(cidade){
        this.showSpinner = true;
                this.getService.createCidade(cidade, this.access_token).subscribe(
                    data => {
                            this.showSpinner = false;
                            this.cidades = data;
                            this.statusApi = 1;
                    },
                    error => {
                        this.showSpinner = false;
                        this.statusApi = 2;
                    }
                );
    }
    deleteCidadeAcao(cidade){
                this.getService.deleteCidade(cidade.id, this.access_token).subscribe(
                    data => {
                            this.deleteClose();
                            },
                    error => {
                            console.log(error);
                            this.statusApi = 2;
                    }
                );
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
