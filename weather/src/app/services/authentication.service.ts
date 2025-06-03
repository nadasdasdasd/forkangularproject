import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(p_employee_id: string, p_password: string): Observable<any> {
        return this.http.post<boolean>(`${environment.BASE_URL}/Employee/Login`, { p_employee_id, p_password })
        .pipe(switchMap(x => 

            
                // login successful if there's a jwt token in the response
                this.http.get<User>(`${environment.BASE_URL}/Employee/GetDetail/${p_employee_id}`).pipe(map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if(x && user)
                    {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                    }
                    else 
                    {
                        console.log("throw error");
                        // var error:string = "Employee ID or password is incorrect";
                        // return throwError({ error: { error } });
                        return "error";
                    }
                }))
        ));
    }

    register(p_employee_id: string, p_password: string, p_is_admin: boolean): Observable<any> {
        return this.http.post<void>(`${environment.BASE_URL}/Employee/Register`, { p_employee_id, p_password, p_is_admin })
        .pipe(switchMap(x =>
                // login successful if there's a jwt token in the response
                this.http.get<User>(`${environment.BASE_URL}/Employee/GetDetail/${p_employee_id}`).pipe(map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if(user)
                    {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                    }else 
                    {
                        var error:string = "Employee ID is incorrect";
                        return throwError({ error: { error } });
                    }
                }))

                
            ));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}