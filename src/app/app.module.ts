import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuevaReservaComponent } from './components/nueva-reserva/nueva-reserva.component';
import { ListarReservasComponent } from './components/listar-reservas/listar-reservas.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { VerReservasComponent } from './components/ver-reservas/ver-reservas.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes:Routes= [
  {path: '', component:HomeComponent},
  {path:'ver', component:VerReservasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NuevaReservaComponent,
    ListarReservasComponent,
    VerReservasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
