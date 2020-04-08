import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  sendGET(url: string, headers?: any) {
    return this.http.get(url, {
      headers: new HttpHeaders(headers),
      observe: "response"
    });
  }

  sendPOST(url: string, body?: any, headers?: any) {
    return this.http.post(url, body, {
      headers: new HttpHeaders(headers),
      observe: "response"
    });
  }

  sendPOST(url: string, body?: any, headers?: any) {
    return this.http.post(url, body, {
      headers: new HttpHeaders(headers),
      observe: "response"
    });
  }
}
