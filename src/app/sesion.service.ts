import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './tab4/user.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  token:any ="";
  user:any;
  apiUrl= 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  login(user:User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/auth`, user);
  }
  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
  guarToken(token:string){
    localStorage.setItem('token',token);
  }
  guardarUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  isAuth():boolean{
    this.token =  localStorage.getItem('token')||null;
    this.user=JSON.parse(localStorage.getItem('user') || 'null')||null;
    if(this.token===null||this.user===null){
      return false
    }else{
        return true;
    }
  }
}
