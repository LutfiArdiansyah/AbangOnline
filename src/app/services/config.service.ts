import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  api_url: String = "http://localhost/Codeigniter/project_abang_online/";
  // api_url: String = "https://mufondev.muf.co.id/MUFDealer/index.php/services_abol/";
  key: String = "Ab@ngonl!n3";
  constructor() { }
}
