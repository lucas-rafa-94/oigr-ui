import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenService {

    constructor(private http: HttpClient) {}

    private url = 'https://idcs-064695a16a4a4578a2489971e2fd2fc2.identity.oraclecloud.com/oauth2/v1/token';

    getToken(): Observable<any> {
        // const body = `grant_type=client_credentials&scope=http://localhost:8098:443/external`;
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic N0U0RTY0RTQyMkMxNEM2Rjk5NjdCM0M4RTFGNTJDQTJfQVBQSUQ6ZjIwZWZmOGEtMjljMC00YmUzLWJiN2EtMjA4NTc2MjEyYTdi'
        //     })
        // };
        return null;
    }
}
