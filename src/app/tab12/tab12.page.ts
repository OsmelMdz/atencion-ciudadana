import { Component, OnInit } from '@angular/core';
import { SesionService } from '../sesion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Response {
  error?: string;
  message?: string;
}

@Component({
  selector: 'app-tab12',
  templateUrl: './tab12.page.html',
  styleUrls: ['./tab12.page.scss'],
})
export class Tab12Page implements OnInit {

  nombre_completo: string = '';
  telefono: string = '';
  showRegisterForm: boolean = false;
  showLoginForm: boolean = false;

  constructor(private router: Router, private sesion: SesionService, private fb: FormBuilder, private alertController: AlertController, private menuCtrl: MenuController, private navCtrl: NavController, private authService: ApiServiceService, private http: HttpClient) { }

  myForm: FormGroup = this.fb.group({
    nombre_completo: ['', [Validators.required, Validators.minLength(6)]],
    telefono: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
  });

  ngOnInit() {
  }

  redirectToTab1() {
    // Redireccionar a la página tab5
    this.router.navigateByUrl('/tabs/tab1');
    console.log('El usuario no aceptó las políticas de privacidad.');

  }

  async registrarCuenta() {
    // Validar que el nombre_completo solo contenga letras y espacios, y tenga al menos 5 caracteres
    const nombreCompletoRegex = /^[a-zA-Z\s]{5,}$/;
    if (!nombreCompletoRegex.test(this.nombre_completo)) {
      this.showAlert('El nombre completo debe contener al menos 5 letras y solo puede contener letras y espacios.');
      return;
    }

    // Validar que el telefono solo contenga números y tenga exactamente 10 dígitos
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(this.telefono)) {
      this.showAlert('El formato del teléfono no es válido. Debe contener exactamente 10 dígitos sin espacios.');
      return;
    }

    // Si todas las validaciones pasan, procede con el registro
    const data = {
      nombre_completo: this.nombre_completo,
      telefono: this.telefono,
    };

    // Enviar la solicitud al backend
    this.http.post<Response>('http://localhost/atencion_ciudadana/guardar_usuarios.php', data).subscribe(
      async (response: Response) => {
        // Manejar la respuesta del servidor (éxito o error)
        console.log('Respuesta del servidor:', response);

        if (response && response['message']) {
          // Usuario registrado con éxito
          this.showAlert('Cuenta creada con éxito.');

          // Limpia los campos del formulario
          this.nombre_completo = '';
          this.telefono = '';


          this.navCtrl.navigateRoot('/tabs/tab1');
        }
      },
      async (error) => {
        // Manejar el error de la solicitud
        console.error('Error en la solicitud:', error);

        if (error.status === 409) {
          // Código 409: Conflicto, el usuario ya está registrado
          this.showAlert('El usuario ya está registrado.');
        } else if (error.status === 0) {
          // Código 0: Problema de red
          this.showAlert('Error de red. Por favor, verifica tu conexión.');
        } else {
          // Otro tipo de error
          this.showAlert('Error en la solicitud: ' + error.statusText);
        }
      }
    );
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }


}
