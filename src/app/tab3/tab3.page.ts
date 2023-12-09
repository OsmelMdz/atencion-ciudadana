import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: any = [];
  isLargeScreen: boolean = true; // Inicialmente asumimos que la pantalla es grande
  constructor(private http: HttpClient,private callNumberService: CallNumber,private alertController: AlertController) {
    this.getC();
  }

  async makeCall(phoneNumber: number) {
    // Simulación de llamada
    const alertSimulating = await this.alertController.create({
      header: 'Llamada de emergencia',
      message: `Simulando llamada al número ${phoneNumber}`,
    });
    await alertSimulating.present();

    // Cerrar la alerta después de 2 segundos
    setTimeout(() => {
      alertSimulating.dismiss();
    }, 2000);

    // Llamada a la función de simulación
    this.simulateCall(phoneNumber);
  }

  private async simulateCall(phoneNumber: number) {
    // Puedes agregar un retardo simulado antes de mostrar el mensaje de éxito
    setTimeout(async () => {
      const alertSuccess = await this.alertController.create({
        header: 'Llamada simulada exitosa',
        message: `Llamada simulada exitosa al número ${phoneNumber}`,
        cssClass: 'success-alert' // Agrega una clase para estilos de éxito
      });
      await alertSuccess.present();

      // Cerrar la alerta después de 2 segundos
      setTimeout(() => {
        alertSuccess.dismiss();
      }, 2000);
    }, 2000); // Un retardo de 2 segundos, por ejemplo

   /*  // Puedes agregar otro retardo simulado antes de mostrar el mensaje de error
    setTimeout(async () => {
      const alertError = await this.alertController.create({
        header: 'Error simulado',
        message: `Error simulado al intentar llamar al número ${phoneNumber}`,
        cssClass: 'error-alert' // Agrega una clase para estilos de error
      });
      await alertError.present();

      // Cerrar la alerta después de 2 segundos
      setTimeout(() => {
        alertError.dismiss();
      }, 2000);
    }, 3000); // */
    //Un retardo de 3 segundos, por ejemplo
  }


  getC() {
    const url = 'http://localhost/atencion_ciudadana/ver_contactos.php'; // Cambia la URL según tu configuración
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.data = data;
        console.log(this.data);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

}
