import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViajeService, Viaje } from '../viaje.service';

@Component({
  selector: 'app-ver-viajes',
  templateUrl: './ver-viajes.page.html',
  styleUrls: ['./ver-viajes.page.scss'],
})
export class VerViajesPage implements OnInit {
  viajes: Viaje[] = [];
  viajeSeleccionado: Viaje | null = null;
  mensajeUnido: string | null = null;

  
  isModalOpen = false;
  comunaSeleccionada: string = '';

  
  usuarioLogueado: string = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}').nombre || 'Usuario';

  constructor(
    private viajeService: ViajeService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
   
    this.viajes = this.viajeService.obtenerViajes(); 
  }

  seleccionarViaje(viaje: Viaje) {
    this.viajeSeleccionado = viaje;
  }

  unirseAlViaje() {
    if (this.viajeSeleccionado && this.viajeSeleccionado.unidos.length < 4) {
      
      const nombrePasajero = this.usuarioLogueado;

      // Agregar al pasajero a la lista de 'unidos'
      this.viajeSeleccionado.unidos.push(nombrePasajero);

      // Actualizar el mensaje
      this.mensajeUnido = `Te has unido al viaje de ${this.viajeSeleccionado.nombre}. El precio del viaje es $${this.viajeSeleccionado.precio}. Lo pagarás al conductor en el vehículo.`;

      // Guardar los viajes en localStorage
      this.guardarViajes();
    } else {
      this.mensajeUnido = 'El viaje ya está completo o no ha sido seleccionado.';
    }
  }

  guardarViajes() {
    localStorage.setItem('viajes', JSON.stringify(this.viajes)); // Guarda los viajes actualizados
  }

  
  abrirImagenModal(comuna: string) {
    this.comunaSeleccionada = comuna;
    this.isModalOpen = true;
  }

  
  cerrarModal() {
    this.isModalOpen = false;
  }
}
