import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/Reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.css']
})
export class VerReservasComponent implements OnInit {
  listaReservas: Reserva[] = [];

  constructor(private _reservaService: ReservaService) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this._reservaService.obtenerReservas().subscribe(doc => {
      this.listaReservas = [];
      doc.forEach((element: any) => {
        this.listaReservas.push({
          id: element.payload.doc.id,
              ...element.payload.doc.data()
        });
      });
      console.log(this.listaReservas)
    })
  }

}
