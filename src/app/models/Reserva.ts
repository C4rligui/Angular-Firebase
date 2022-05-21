export class Reserva {
    id?: string;
    titular: string;
    comensales: number;
    dia: Date;
    hora: string;
    fechaReserva: Date;
    fechaModificacion: Date;

    constructor(titular: string, comensales: number, dia: Date, hora: string) {
        this.titular = titular;
        this.comensales = comensales;
        this.dia = dia;
        this.hora = hora;
        this.fechaReserva = new Date();
        this.fechaModificacion = new Date();
    }
}