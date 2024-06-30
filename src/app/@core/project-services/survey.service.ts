import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpEntityRepositoryService } from './http-entity-repository.service';
import { Survey } from '../models/Survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

 
  constructor(private httpClient: HttpClient, private http: HttpEntityRepositoryService) { }
  getAll(): Observable<Survey[]> {
    return this.http.getAll<Survey>("/Surveys")
  }

  getList(): Observable<any> {

    return this.httpClient.get(environment.getApiUrl + "/Surveys?PageIndex=0&PageSize=111");
  }

  getSurveyById(id: string): Observable<Survey> {

    return this.httpClient.get<Survey>(environment.getApiUrl + "/Surveys/" + id);
  }


  addSurvey(Survey: Survey): Observable<any> {

    var result = this.httpClient.post(environment.getApiUrl + "/Surveys", Survey);
    return result;
  }

  updateSurvey(Survey:Survey):Observable<any> {

    var result = this.httpClient.put(environment.getApiUrl + "/Surveys", Survey);
    return result;
  }

  deleteSurvey(Survey:Survey):Observable<any> {
    //Survey.status=false;
    var result = this.httpClient.delete(environment.getApiUrl + "/Surveys/"+Survey.id);
    return result;
  }
}
