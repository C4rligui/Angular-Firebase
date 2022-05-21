import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from 'src/app/models/Reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  form: FormGroup;
  loading = false;
  titulo = 'Crear Reserva';
  id: string | undefined;

  constructor(private fb: FormBuilder,
              private _reservaService: ReservaService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      comensales: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      dia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      hora: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    })
  }

  ngOnInit(): void {
    this._reservaService.getReservaEdit().subscribe(data => {
      this.id = data.id;
      this.titulo = 'Editar Reserva';
      this.form.patchValue({
        titular: data.titular,
        comensales: data.comensales,
        dia: data.dia,
        hora: data.hora,
      })
    })
  }

  guardarReserva() {
    if(this.id == undefined) {
      this.agregarReserva();
    } else {
      this.editarReserva(this.id);
    }
  }

  editarReserva(id: string) {
    const RESERVA: any = {
      titular: this.form.value.titular,
      comensales: this.form.value.comensales,
      dia: this.form.value.dia,
      hora: this.form.value.hora,
      fechaModificacion: new Date(),
    }

    this.loading = true;
    this._reservaService.editarReserva(id, RESERVA).then(() => {
      this.loading = false;
      this.titulo = 'Crear Reserva';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('La reserva fue actualizada correctamente', 'Reserva Actualizada');
    }, error => {
      console.log(error);
    }
    );
  }

  agregarReserva() {
    const RESERVA: Reserva = {
      titular: this.form.value.titular,
      comensales: this.form.value.comensales,
      dia: this.form.value.dia,
      hora: this.form.value.hora,
      fechaReserva: new Date(),
      fechaModificacion: new Date(),
    }

    this.loading = true;
    this._reservaService.guardarReserva(RESERVA).then(() => {
      this.loading = false;
      console.log('Reserva anotada');
      this.toastr.success('La reserva ha sido anotada correctamente', 'Reserva hecha');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Opps.. ocurrió un error', 'Error')
      console.log(error);
    })
  }

}
