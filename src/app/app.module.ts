import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LoginInService} from './services/loginIn/login-in.service';
import {ProdutoService} from './services/produto/produto.service';
import {EstadosDddService} from './services/estadosDdd/estadosDdd.service';
import {CidadeService} from './services/cidade/cidade.service';
import {TokenService} from './services/token/token.service';
import {RegiaoUserService} from './services/regiaoUser/regiaoUser.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { RegioesComponent } from './regioes/regioes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {CidadesComponent} from './cidades/cidades.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegioesComponent,
    NavbarComponent,
    LoginPageComponent,
    ProdutosComponent,
    UsuariosComponent,
    CidadesComponent
  ],
  imports: [
      Ng2SearchPipeModule,
      NgxPaginationModule,
      BrowserModule,
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      DropDownsModule,
      FormsModule, NgbModule.forRoot(),
      RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'regioes', component: RegioesComponent},
      { path: 'produtos', component: ProdutosComponent},
      { path: 'usuarios', component: UsuariosComponent},
      { path: 'cidades', component: CidadesComponent}
    ])

  ],
  providers: [LoginInService, ProdutoService, EstadosDddService, CidadeService, RegiaoUserService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
