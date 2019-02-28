import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {RegiaoUserService} from '../services/regiaoUser/regiaoUser.service';
import {TokenService} from '../services/token/token.service';

@Component({
  selector: 'app-download',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    getService;
    showSpinner;
    usuarios;
    access_token;
    tokenService;
    msgDelete = '';
    deleteOpen;
    statusApi = 0;
    usuarioSelecionado = {
        email: '',
        id: 0,
        nome: '',
        password: ''
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

    constructor(private router: Router, service: RegiaoUserService , private modalService: NgbModal, tokenService: TokenService) {
        this.getTokenSession();
        this.getService = service;
        this.tokenService = tokenService;
        this.visualizacaoOpen = true;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.confirmaDelete = false;
        this.getUsuarios();
        this.showSpinner = true;
    }


    openLg(content, usuario) {
            console.log(usuario.nome)
            this.modalService.open(content, {size: 'lg'});
            this.msgDelete = usuario.nome;
    }


    ngOnInit() {
    }

    deleteClose() {
        this.statusApi = 0
        this.getUsuarios();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    openDelete(usuario) {
        this.usuarioSelecionado = usuario;
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = true;
    }

    deleteUsuario() {
        if (this.deleteOpen) {
            return true;
        } else {
            return false;
        }
    }

    visualizacao(){
        if(this.visualizacaoOpen) {
            return true;
        } else {
            return false;
        }
    }

    updateUsuario(){
        if(this.criaOrUpdateOpen) {
            return true;
        } else {
            return false;
        }
    }

    createUsuario(){
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
        this.getUsuarios();
    }

    createClose() {
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.getUsuarios();
    }


    openEditar(usuario) {
        this.usuarioSelecionado = usuario;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.createOpen = false;
    }

    openCreate() {
        this.usuarioSelecionado = {
            email: '',
            id: 0,
            nome: '',
            password: ''
        };
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = true;
    }


    getUsuarios() {
        // this.tokenService.getToken().subscribe(
        //     data => {
        //         console.log(data.access_token);
        //         this.access_token = data.access_token;
        this.showSpinner = true;
                this.getService.getUsuarios(this.access_token).subscribe(
                    datain => {
                        console.log(datain.status);
                        if (datain.status === 200) {
                            console.log(datain);
                            this.usuarios = datain;
                        } else {
                            console.log(datain);
                            this.usuarios = datain;
                        }
                        this.showSpinner = false;
                    },
                    errorin => {
                        console.log(errorin);
                        this.showSpinner = false;
                    }
                );
        //     } ,
        //     error => {
        //         console.log(error);
        //     }
        // );
    }

    updateUsuarioAcao(usuario){
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.showSpinner = true;
                this.getService.updateUsuario(usuario, this.access_token).subscribe(
                    data => {
                        console.log(data.status);
                        this.usuarios = data;
                        this.statusApi = 1;
                        this.showSpinner = false
                    },
                    error => {
                        console.log(error);
                        this.statusApi = 2;
                        this.showSpinner = false
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    createUsuarioAcao(usuario){
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
        this.showSpinner = true;
                this.getService.createUsuario(usuario, this.access_token).subscribe(
                    data => {
                        console.log(data.status);
                        this.usuarios = data;
                        this.statusApi = 1;
                        this.showSpinner = false;
                    },
                    error => {
                        console.log(error);
                        this.statusApi = 2;
                        this.showSpinner = false;
                    }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
    }

    deleteUsuarioAcao(usuario) {
        // this.tokenService.getToken().subscribe(
        //     dataToken => {
        //         console.log(dataToken.access_token);
        //         this.access_token = dataToken.access_token;
                this.getService.deleteUsuario(usuario.id, this.access_token).subscribe(
                    data => {
                        this.getUsuarios();
                        this.deleteClose();
                    },
                    error => {
                        this.statusApi = 2;
                        }
                );
        //     } ,
        //     errorToken => {
        //         console.log(errorToken);
        //     }
        // );
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
