import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { StatusUploadFile } from 'src/app/models/status-upload-file.model';

@Component({
  selector: 'app-upload-weather',
  templateUrl: './upload-weather.component.html',
  styleUrls: ['./upload-weather.component.css']
})

export class UploadWeatherComponent implements OnInit {
  uploadProgress = 0;
  selectedFiles: File[] = [];
  uploading = false;
  errorMsg = '';
  baseApiUrl: string = 'https://localhost:7272';
  submissionResults: StatusUploadFile[] = [];
  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit() {}

  // Choosing files to upload
  chooseFile(files: any) {
    this.selectedFiles = [];
    this.errorMsg = '';
    this.uploadProgress = 0;
    if (files.length === 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  // Uploading files to server
  upload() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.errorMsg = 'Пожалуйста, выберете файлы';
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach((f) => formData.append('files', f, f.name));

    const req = new HttpRequest(
      'POST',
      this.baseApiUrl + '/UploadMultipleFiles',
      formData,
      {
        reportProgress: true,
      }
    );
    this.uploading = true;
    this.httpClient
      .request<StatusUploadFile[]>(req)
      .pipe(
        finalize(() => {
          this.uploading = false;
          this.selectedFiles = [];
        })
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.loaded && event.total) {
              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            }
          } else if (event instanceof HttpResponse) {
            this.submissionResults = event.body as StatusUploadFile[];
          }
        },
        (error) => {
          throw error; 
        }
    );

    /* this.httpClient.post(this.baseApiUrl + '/UploadMultipleFiles', formData, {reportProgress: true, observe: 'events'})
    .subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded && event.total) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          }
        } else if (event instanceof HttpResponse) {
          this.submissionResults = event.body as StatusUploadFile[];
        }
      },
      (error) => {
        throw error;
      } 
    ); */
  }

  fileSize(bytes: number): string {
    if (Math.abs(bytes) < 1024) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= 1024;
      u++;
    } while (Math.abs(bytes) >= 1024 && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }
}