import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth: Auth) { }

  async signUp(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return user;
  }

  async login(email: string, password: string) {
    const user = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    console.log(user);
    return user;
  }


  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

  //registro user noombre y telefono con rol user
  async registerUser(nombre: string, telefono: string) {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      nombre,
      telefono
    );
    console.log(user);
    return user;
  }


  async signOut() {
    console.log('la sesión se ha cerrado exitosamente');

    return signOut(this.auth);
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

}
