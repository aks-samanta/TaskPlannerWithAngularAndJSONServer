import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url: string = "https://taskplannerbackend-production.up.railway.app/api/users"



  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Create an HTTP headers object with the basic auth credentials
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + window.btoa(username + ':' + password)
      }),
      observe: 'response' as 'response'
    };

    return this.http.get(this.Url + "/signIn", httpOptions);
  }

  signUp(user: User): Observable<any> {
    const headers = new HttpHeaders ({
      'content-type': 'application/json'
    })
    return this.http.post(this.Url + "/register", user,  {headers} )
  }

}
