// import { HttpInterceptor } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { HttpHeaders,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
// import { AuthenticationService } from './authentication.service';
// import {Observable} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService implements HttpInterceptor{

//   constructor(private authenticationService: AuthenticationService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.authenticationService.isUserLoggedIn()) {
//         const authReq = req.clone({
//             headers: new HttpHeaders({
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('token'),
//             }),
//         });
//         return next.handle(authReq);
//     } else {
//         return next.handle(req);
//     }
// }
// }
