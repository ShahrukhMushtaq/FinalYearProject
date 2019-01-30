import { Injectable } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary'
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'shahrukhmushtaq', uploadPreset: 'smciuh1g' })
  )
  constructor() { }

  getConnected(): CloudinaryUploader {
    this.uploader.clearQueue();
    return this.uploader;
  }
}
