import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public politicasAceptadas = false;
  public politicasCanceladas = false; // Nueva propiedad
  public recordatorioMostrado = false; // Nueva propiedad

  constructor(private alertController: AlertController, private router: Router) {
    this.politicasAceptadas = localStorage.getItem('politicasAceptadas') === 'true';
  }

  async mostrarPoliticasAlerta() {
    if (!this.politicasAceptadas || (this.politicasAceptadas && !this.recordatorioMostrado)) {
      const aceptoPoliticas = await this.mostrarAlertaPoliticas();

      if (aceptoPoliticas) {
        console.log('El usuario aceptó las políticas de privacidad.');
        localStorage.setItem('politicasAceptadas', 'true');
       // this.router.navigate(['/tabs/tab1']);
        this.politicasCanceladas = false; // Habilita las tabs
        this.recordatorioMostrado = true; // Marca el recordatorio como mostrado
      } else {
        console.log('El usuario no aceptó las políticas de privacidad.');
        this.politicasCanceladas = true; // Deshabilita las tabs
        //this.router.navigate(['/tabs/tab1']);
      }
    } else {
      // Si las políticas ya fueron aceptadas y el recordatorio fue mostrado
      //this.router.navigate(['/tabs/tab1']);
    }
  }

  async mostrarAlertaPoliticas() {
    let aceptoPoliticas = false;

    const alert = await this.alertController.create({
      header: 'Políticas de Privacidad',
      message: '... (tu mensaje de políticas)',
      inputs: [
        {
          name: 'aceptoPoliticas',
          type: 'checkbox',
          label: 'Acepto las políticas de privacidad',
          value: 'acepto',
        },
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.aceptoPoliticas) {
              console.log('El usuario aceptó las políticas de privacidad.');
              aceptoPoliticas = true;
              this.router.navigate(['/tabs/tab12']);
            } else {
              console.log('El usuario no aceptó las políticas de privacidad.');
              this.router.navigate(['/tabs/tab1']);
            }
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();

    return aceptoPoliticas;
  }
}
