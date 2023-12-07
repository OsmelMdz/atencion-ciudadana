import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionService } from '../sesion.service';

interface Response {
  error?: string;
  message?: string;
}
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  @ViewChild('passwordInput', { static: true }) passwordInput: any;
  password!: string;
  showPassword: boolean = false;
  nombre_completo: string ='';
  telefono: string ='';
  email: string ='';
  showRegisterForm: boolean = false;
  showLoginForm: boolean = false;

  constructor(private sesion: SesionService,private fb: FormBuilder,private alertController: AlertController,private menuCtrl: MenuController, private navCtrl: NavController, private authService: ApiServiceService, private http: HttpClient) { }

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login2() {
    //console.log(this.myForm.value);
      this.sesion.login(this.myForm.value).subscribe((data: any) => {
        this.sesion.guarToken(data.Token);
        this.sesion.guardarUser(data.Usuario);
        console.log('Bienvenido');
        this.myForm.reset();
        this.navCtrl.navigateForward('/products');
      });
  }

  toggleRegisterForm() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
  }

  toggleLoginForm() {
    this.showRegisterForm = false;
    this.showLoginForm = true;
  }
  async login() {
    // Verificar si los campos están vacíos
    if (!this.nombre_completo || !this.email) {
      await this.presentErrorAlert('Por favor, completa todos los campos.');
      return;
    }

    // Verificar el formato del campo nombre_completo
    const nombreCompletoRegex = /^[a-zA-Z\s]+$/;
    if (!nombreCompletoRegex.test(this.nombre_completo)) {
      await this.presentErrorAlert('El nombre completo solo puede contener letras y espacios.');
      return;
    }

    // Verificar el formato del campo email y la extensión del dominio
    const emailRegex = /^[^\s@]+@municipio\.com\.mx$/;
    if (!emailRegex.test(this.email)) {
      await this.presentErrorAlert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    const data = {
      nombre_completo: this.nombre_completo,
      email: this.email
    };

    // Enviar la solicitud al servidor
    this.http.post('http://localhost/atencion_ciudadana/login.php', data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    .subscribe(async (response: any) => {
      if (response.success) {
        console.log('Inicio de sesión exitoso');

        // Realizar la redirección a la página deseada
        this.navCtrl.navigateRoot('/tabs-admin/tab10');

        const alert = await this.alertController.create({
          message: 'Inicio de sesión exitoso.',
        });

        await alert.present();
      } else {
        console.error('Error en el inicio de sesión:', response.error);

        // Mostrar un mensaje de error al usuario
        await this.presentErrorAlert('Credenciales inválidas. Verifica tu nombre completo y correo electrónico.');
      }
    });
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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

    // Validar el formato del correo (extensión @municipio.com.mx)
    const emailRegex = /^[^\s@]+@municipio\.com\.mx$/;
    if (!emailRegex.test(this.email)) {
      this.showAlert('Por favor, introduce un correo electrónico válido con la extensión "@municipio.com.mx".');
      return;
    }

    // Si todas las validaciones pasan, procede con el registro
    const data = {
      nombre_completo: this.nombre_completo,
      telefono: this.telefono,
      email: this.email,
    };

    // Enviar la solicitud al backend
    this.http.post<Response>('http://localhost/atencion_ciudadana/guardar_registro.php', data).subscribe(
      async (response: Response) => {
        // Manejar la respuesta del servidor (éxito o error)
        console.log('Respuesta del servidor:', response);

        if (response && response['message']) {
          // Usuario registrado con éxito
          this.showAlert('Cuenta creada con éxito.');

          // Limpia los campos del formulario
          this.nombre_completo = '';
          this.telefono = '';
          this.email = '';
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
