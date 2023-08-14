import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page{
  data: any = [];

  constructor(private http: HttpClient,private router: Router) {
    this.getP();
  }

  getP(){
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

  deleteContact(id: number) {
    const url = `http://localhost/atencion_ciudadana/eliminar_publicaciones.php?id=${id}`; // Cambia la URL según tu configuración

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.delete(url, { headers }).subscribe(
      (response: any) => {
        console.log('Contacto eliminado exitosamente:', response);
        this.getP(); // Volver a cargar la lista de contactos después de la eliminación
      },
      (error) => {
        console.error('Error al eliminar el contacto:', error);
      }
    );
  }

  redirectToTab5() {
    // Redireccionar a la página tab5
    this.router.navigateByUrl('/tabs-admin/tab5');
  }

}