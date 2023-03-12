import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from '../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private serversUrl = 'http://127.0.0.1:8000/api/servers/';  // URL to web api
//   private serversUrl = 'http://localhost:8000/api/servers/';  // URL to web api

  constructor(private http: HttpClient) { }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.serversUrl);
  }

  // Implement other CRUD operations as needed

}