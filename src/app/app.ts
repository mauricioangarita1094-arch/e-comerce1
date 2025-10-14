import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

declare const DD_RUM: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Proyecto_class_vercel');

  constructor() { }

  logInfo(message: string) {
    if (typeof DD_RUM !== 'undefined') {
      DD_RUM.addAction(message, { level: 'info', module: 'AppComponent' });
    } else {
      console.warn('DD_RUM no está definido:', message);
    }
  }

  logError(message: string, error: any) {
    if (typeof DD_RUM !== 'undefined') {
      DD_RUM.addError(message, { error, level: 'error', module: 'AppComponent' });
    } else {
      console.warn('DD_RUM no está definido:', message, error);
    }
  }


  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof DD_RUM !== 'undefined') {
        DD_RUM.addAction('Aplicacion Angular iniciada correctamente');
      }
    }, 1000); //espera 1 segundo
  }


  // Simulación de error
  simulateError() {
    try {
      throw new Error('Error simulado en la aplicación Angular');
    } catch (e) {
      this.logError('Se produjo un error simulado', e);
    }
  }
}
