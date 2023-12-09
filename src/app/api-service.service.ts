import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  isAdmin(uid: any) {
    throw new Error('Method not implemented.');
  }
  constructor(public http: HttpClient) { }
  login(username: string, password: string) {
    const url = 'http://localhost/atencion_ciudadana/login.php'; // Cambia la URL según tu configuración
    const data = {
      username: username,
      password: password
    };

    return this.http.post(url, data);
  }
  logout(){
    const url = 'http://localhost/atencion_ciudadana/logout.php'; // Crea un archivo logout.php para manejar el cierre de sesión en el backend
  }
}

