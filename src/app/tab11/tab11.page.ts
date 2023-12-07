import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab11',
  templateUrl: './tab11.page.html',
  styleUrls: ['./tab11.page.scss'],
})
export class Tab11Page {
  data: any = [];

  constructor(private http: HttpClient,private router: Router,) {
    this.getU();
   }

   getU(){
    const url = 'http://localhost/atencion_ciudadana/ver_usuarios.php'; // Cambia la URL según tu configuración
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

  redirectToTabsAdmin() {
    // Redireccionar a la página tab9 con el mismo ID para forzar la actualización
    this.router.navigate(['/tabs-admin/tab4']);
  }

}
