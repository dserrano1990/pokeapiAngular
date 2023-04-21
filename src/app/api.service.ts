import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient, private router: Router) {

    }

    /** GET */
    public get(params: string, body?: any) {
        console.log(environment.apiUrl + params);
        
        return this.http.get(environment.apiUrl + params, {
            params: body
        });
    }
}