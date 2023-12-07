import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private alertController: AlertController, private router: Router) { }
  async mostrarPoliticasAlerta() {
    const alert = await this.alertController.create({

      header: 'Políticas de Privacidad',
      message: 'Bienvenido a la aplicación Atención Ciudadana. En nombre de la aplicación, valoramos y respetamos su privacidad. Esta Política de Privacidad tiene como objetivo proporcionarle información detallada sobre cómo recopilamos, utilizamos, compartimos y protegemos sus datos personales. Al utilizar nuestra aplicación, usted acepta las prácticas descritas en esta política. Recopilación de Datos Personales Recopilamos datos personales de las siguientes maneras: 1. Datos Proporcionados por el Usuario: Al registrarse o utilizar nuestra aplicación, usted puede proporcionarnos datos como su nombre, dirección de correo electrónico y otros datos de perfil. 2. Datos Generados por la Aplicación: La aplicación puede recopilar automáticamente datos técnicos, como la dirección IP, el tipo de dispositivo, el sistema operativo, la ubicación aproximada y el comportamiento de uso. Uso de Datos Personales Utilizamos sus datos personales para los siguientes fines: 1. Mejora de la Experiencia del Usuario: Utilizamos la información recopilada para personalizar su experiencia en la aplicación y proporcionar contenido relevante. 2. Comunicación: Podemos utilizar su dirección de correo electrónico para enviarle actualizaciones importantes, noticias y notificaciones relacionadas con la aplicación. 3. Seguridad: Implementamos medidas de seguridad para proteger sus datos personales de accesos no autorizados y garantizar un entorno seguro para todos los usuarios. Compartir Datos Personales No compartimos sus datos personales con terceros, excepto en las siguientes situaciones: 1. Cumplimiento Legal: Si estamos obligados por ley o autoridad competente, podemos divulgar sus datos personales. 2. Proveedores de Servicios: Podemos compartir datos con proveedores de servicios de confianza que nos ayudan a ofrecer y mantener la aplicación, siempre bajo estrictos acuerdos de confidencialidad. Protección de Datos Personales Hemos implementado medidas de seguridad adecuadas para proteger sus datos personales. Esto incluye encriptación de datos, medidas de seguridad en la comunicación y protección contra posibles vulnerabilidades. Derechos del Usuario Usted tiene ciertos derechos en relación con sus datos personales, que incluyen el acceso, la corrección, la eliminación y la limitación de su procesamiento. Para ejercer estos derechos o realizar consultas sobre sus datos personales, comuníquese con nosotros a través de correo electrónico de contacto. Actualizaciones de la Política de Privacidad Esta Política de Privacidad puede actualizarse ocasionalmente. Le notificaremos sobre cambios significativos en la política o mediante notificaciones en la aplicación. Cumplimiento Normativo Cumplimos con todas las leyes y regulaciones relacionadas con la protección de datos personales en México, incluida la Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP). Enfoque de Seguridad Nuestra aplicación sigue un enfoque de seguridad "desde el diseño". Realizamos revisiones de seguridad y pruebas regulares, incluidas pruebas de penetración, para garantizar la protección continua de sus datos. Estándares de Autenticación Seguimos las recomendaciones de estándares reconocidos, como OAuth 2.0, para garantizar un proceso seguro y confiable de autenticación de usuarios y protección de sus credenciales de acceso. Le agradecemos por confiar en Atención Ciudadana. Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad o el tratamiento de sus datos personales, no dude en ponerse en contacto con nosotros a través de correo electrónico de contacto. Su privacidad es importante para nosotros, y trabajamos diligentemente para proteger sus datos personales y brindarle una experiencia segura y valiosa en nuestra aplicación.',
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
              // El usuario aceptó las políticas
              console.log('El usuario aceptó las políticas de privacidad.');
            } else {
              // El usuario no aceptó las políticas
              console.log('El usuario no aceptó las políticas de privacidad.');
              this.router.navigate(['/tab12']);
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
  }
}
