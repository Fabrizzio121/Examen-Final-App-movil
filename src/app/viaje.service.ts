import { Injectable } from '@angular/core';


export interface Viaje {
  nombre: string;
  carrera: string;
  destino: string;
  precio: number; 
  unidos: string[]; 
  usuario: string; 
  comuna?: string;  
}

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private viajesKey: string = 'viajes'; 

  constructor() {}

  
  agregarViaje(viaje: Viaje) {
    const viajes = this.obtenerViajes(); // Obtiene los viajes existentes
    viaje.unidos = []; 
    viajes.push(viaje); 
    this.guardarViajes(viajes); // Guarda los viajes actualizados en localStorage
  }

  
  obtenerViajes(usuario?: string): Viaje[] {
    const viajes = this.cargarViajes();
    return usuario ? viajes.filter((v: Viaje) => v.usuario === usuario) : viajes;
  }

  
  unirseViaje(viaje: Viaje, usuario: string) {
    const viajes = this.obtenerViajes(); // Obtiene los viajes existentes
    const viajeEncontrado = viajes.find((v: Viaje) => v.nombre === viaje.nombre && v.destino === viaje.destino);

    if (viajeEncontrado) {
      if (!viajeEncontrado.unidos.includes(usuario)) {
        viajeEncontrado.unidos.push(usuario); 
        this.guardarViajes(viajes); // Guarda los cambios en localStorage
      }
    }
  }

  
  obtenerPasajeros(nombre: string, destino: string): string[] {
    const viajes = this.obtenerViajes(); 
    const viajeEncontrado = viajes.find((v: Viaje) => v.nombre === nombre && v.destino === destino);
    return viajeEncontrado ? viajeEncontrado.unidos : []; 
  }

  
  private cargarViajes(): Viaje[] {
    const viajes = localStorage.getItem(this.viajesKey);
    return viajes ? JSON.parse(viajes) : []; 
  }

  
  private guardarViajes(viajes: Viaje[]): void {
    localStorage.setItem(this.viajesKey, JSON.stringify(viajes)); 
  }
}
