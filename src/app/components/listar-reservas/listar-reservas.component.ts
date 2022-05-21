import { Component, OnInit } from '@angular/core';
import { arrayRemove } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from 'src/app/models/Reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent implements OnInit {
  listaReservas: Reserva[] = [];

  constructor(private _reservaService: ReservaService, 
              private toastr: ToastrService) { }

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

  eliminarReserva(id: any) {
    this._reservaService.eliminarReserva(id).then(() => {
      this.toastr.error('¡La reserva se eliminó con éxito!', 'Reserva eliminado')
    }, error => {
      this.toastr.error('Opss... ocurrió un error', 'Error');
      console.log(error);
    })
  }

  editarReserva(reserva: Reserva) {
    this._reservaService.addReservaEdit(reserva);
  }

}
