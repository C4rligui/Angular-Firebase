import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Reserva } from '../models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reserva$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  guardarReserva(reserva: Reserva): Promise<any> {
    return this.firestore.collection('Reservas').add(reserva);
  }

  obtenerReservas(): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.orderBy('fechaReserva', 'asc')).snapshotChanges();
  }

  eliminarReserva(id: string): Promise<any> {
    return this.firestore.collection('Reservas').doc(id).delete();
  }

  editarReserva(id: string, reserva: any): Promise<any> {
    return this.firestore.collection('Reservas').doc(id).update(reserva);
  }

  addReservaEdit(reserva: Reserva) {
    this.reserva$.next(reserva);
  }

  getReservaEdit (): Observable<Reserva> {
    return this.reserva$.asObservable();
  }

}
