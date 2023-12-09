import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { getStorage, ref, uploadBytes, listAll  } from "firebase/storage";
import { Observable } from 'rxjs';
import { getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page{
  title: string = '';
  description: string = '';
  image!: File;

  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.imageUrls$ = this.cargarImg();
  }
  handleImageUpload(event: any) {
    this.image = event.target.files[0];
  }

  submitForm() {
    if (!this.title || !this.description || !this.image) {
      // Handle form validation or show error message
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('image', this.image);

    this.http.post<any>('http://localhost/atencion_ciudadana/publicaciones.php', formData).subscribe(
      (response: any) => {
        // Handle success, redirect or show success message
        console.log('Publicación creada exitosamente:', response);
        // Restablecer los valores de los campos de entrada
        this.title = '';
        this.description = '';
      },
      (error) => {
        console.error('Error al crear la publicación:', error);
      }
    );
  }

  redirectToTab10() {
    // Redireccionar a la página tab9 con el mismo ID para forzar la actualización
    this.router.navigate(['/tabs-admin/tab10']);
  }

  subirImg(){
    const storage = getStorage();

// Create a reference to 'mountains.jpg'
    const imagenRef = ref(storage, 'imagen2.jpg');

// Create a reference to 'images/mountains.jpg'
    const imagenImagesRef = ref(storage, 'images/imagen.jpg');

    uploadBytes(imagenImagesRef, this.image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }
  imageUrls$: Observable<string[]> | undefined;

  cargarImg(): Observable<string[]> {
    const storage = getStorage();
    const listRef = ref(storage, 'images');

    return new Observable<string[]>((observer) => {
      listAll(listRef)
        .then((res) => {
          const downloadPromises: Promise<string>[] = [];

          res.items.forEach((itemRef) => {
            const downloadPromise = getDownloadURL(itemRef);
            downloadPromises.push(downloadPromise);
          });

          Promise.all(downloadPromises)
            .then((urls) => {
              observer.next(urls);
              observer.complete();
            })
            .catch((error) => {
              observer.error(error);
            });
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


}
