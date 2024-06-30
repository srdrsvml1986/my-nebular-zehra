import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LookUp } from '../models/LookUp';
import { HttpEntityRepositoryService } from './http-entity-repository.service';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

 
  constructor(private httpClient: HttpClient, private http: HttpEntityRepositoryService) { }
  getAll(): Observable<Teacher[]> {
    return this.http.getAll<Teacher>("/Teachers")
  }

  getList(): Observable<any> {

    return this.httpClient.get(environment.getApiUrl + "/Teachers?PageIndex=0&PageSize=111");
  }

  getTeacherById(id: string): Observable<Teacher> {

    return this.httpClient.get<Teacher>(environment.getApiUrl + "/Teachers/" + id);
  }


  addTeacher(Teacher: Teacher): Observable<any> {

    var result = this.httpClient.post(environment.getApiUrl + "/Teachers", Teacher);
    return result;
  }

  updateTeacher(Teacher:Teacher):Observable<any> {

    var result = this.httpClient.put(environment.getApiUrl + "/Teachers", Teacher);
    return result;
  }

  deleteTeacher(Teacher:Teacher):Observable<any> {
    //Teacher.status=false;
    var result = this.httpClient.delete(environment.getApiUrl + "/Teachers/"+Teacher.id);
    return result;
  }
}
