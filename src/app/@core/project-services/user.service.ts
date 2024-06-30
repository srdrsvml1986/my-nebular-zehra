import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/Auth.service';
import { environment } from 'src/environments/environment';
import { LookUp } from '../models/LookUp';
import { PasswordDto } from '../models/passwordDto';
import { User } from '../models/user';
import { HttpEntityRepositoryService } from './http-entity-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private http: HttpEntityRepositoryService) { }
  getAll(): Observable<User[]> {
    return this.http.getAll<User>("/Users")
  }
  changeUserPassword(user: User): Observable<any> {
    return this.http.update<any>("/Auth/changeuserpassword", { userId: user.id, password: user.password })
  }

  getUserList(): Observable<any> {
    return this.httpClient.get(environment.getApiUrl + "/users?PageIndex=0&PageSize=111");
  }

  getUserById(id: string): Observable<User> {

    return this.httpClient.get<User>(environment.getApiUrl + "/users/" + id);
  }


  addUser(user: User): Observable<any> {

    var result = this.httpClient.post(environment.getApiUrl + "/users", user);
    return result;
  }

  updateUser(user:any):Observable<any> {

    var result = this.httpClient.put(environment.getApiUrl + "/users", user);
    return result;
  }

  deleteUser(user:User):Observable<any> {
    console.log(user);
    
    var result = this.httpClient.delete(environment.getApiUrl + "/users", { body: {'id':user.id}});
    return result;
  }

  saveUserPassword(command:PasswordDto):Observable<any>{
    var result = this.httpClient.put(environment.getApiUrl + "/Auth/changeuserpassword/"+command.userId, command, { responseType: 'text' });
    return result;
  }

}
