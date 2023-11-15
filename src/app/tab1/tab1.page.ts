import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: any = [];
  isLargeScreen: boolean = true; // Inicialmente asumimos que la pantalla es grande

  constructor(private http: HttpClient) {
    this.getP();
  }

  getP() {
    const url = 'http://localhost/atencion_ciudadana/ver_publicaciones.php'; // Cambia la URL según tu configuración
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
