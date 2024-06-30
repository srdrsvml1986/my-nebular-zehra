import { AfterContentInit, Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Survey } from 'src/app/@core/models/Survey';
import { SurveyService } from 'src/app/@core/project-services/survey.service';
import { ToastSettings } from 'src/app/@core/toastOptions';
import { Model } from "survey-core";
import '../../@core/utils/custom-locale'
// const SURVEY_ID = 1;

const surveyJson = {
  pages: [{
      elements: [{
          name: "yas",
          title: "Kurumumuzdan aldığınız hizmetten memnun kaldınız mı?",
          type: "radiogroup",
          choices: [
              { value: 5, text: "Tamamen yeterli" },
              { value: 4, text: "Genellikle yeterli" },
              { value: 3, text: "Doğal" },
              { value: 2, text: "Yeterli değil" },
              { value: 1, text: "hiç yeterli değil" }
          ],
          isRequired: true
      }]
  }, {
      elements: [{
          name: "what-would-make-you-more-satisfied",
          title: "En sevdiğiniz masal karakteri kimdir?",
          type: "comment",
      }],
  }, {
      elements: [{
          name: "how-can-we-improve",
          title: "Mutlu olduğunuzda ne yaparsınız?",
          type: "comment"
      }],
  }, {
      elements: [{
          name: "disappointing-experience",
          title: "Hangi oyunları arkadaşlarınızla oynamayı seversiniz?",
          type: "comment"
      }],
  }]
};
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent extends ToastSettings implements OnInit, AfterContentInit {

  survey: Survey;
  surveys: Survey[];
  titlee = 'My First Survey';
  surveyModel: Model;
  alertResults (sender) {
    const results = JSON.stringify(sender.data);
    //alert(results);
    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }

  constructor(
    private dialogService: NbDialogService,
    private toast: NbToastrService, private surveyservice: SurveyService) {
    super()
  }
  ngOnInit(): void {
    // this.survey = { question: "", AnswerOne: "", AnswerTwo: "",AnswerThree:"",
    //   AnswerOneCount:0,AnswerTwoCount:0,AnswerThreeCount:0
    //  }
    // this.getSurveys()
    const survey = new Model(surveyJson);
    survey.onComplete.add(this.alertResults);
    this.surveyModel = survey;
    survey.locale = "customlocale";

  }
  ngAfterContentInit(): void {

  }
  getSurveys() {
    this.surveyservice.getList().subscribe(data => {
      console.log(data);

      if (data.count > 0) {
        this.surveys = data.items as Survey[]
      }

    });
  }
  showUserDialog(dialog: TemplateRef<any>, survey: Survey, isAdd: boolean) {
    if (isAdd) {
      this.survey = { question: "", AnswerOne: "", AnswerTwo: "",AnswerThree:"",
        AnswerOneCount:0,AnswerTwoCount:0,AnswerThreeCount:0
       }
    }else{
      this.survey=survey
    }

    this.dialogService.open(
      dialog,
      {
        hasBackdrop: true,
        closeOnEsc: true,
        closeOnBackdropClick: false, autoFocus: true, dialogClass: 'permissionsDialogTemplateClass', hasScroll: true
      });
  }
  updateSurvey(ref: any) {
    this.surveyservice.updateSurvey(this.survey).subscribe(data => {
      this.toast.success("Veri güncellendi", 'success', this.config)
      ref.close()
      this.getSurveys()
    },
      error => {
        console.log(error);
        
        this.toast.danger(error, 'error', this.config)
      })
    
  }
  addSurvey(ref: any) {
    this.surveyservice.addSurvey(this.survey).subscribe(data => {
      this.toast.success("Veri Eklendi", 'success', this.config)
      ref.close()
      this.getSurveys()
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
    
  }
  deleteSurvey(ref: any) {
    this.surveyservice.deleteSurvey(this.survey).subscribe(data => {
      this.toast.success("Veri Silindi", 'success', this.config)
      ref.close()
      this.getSurveys()
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
    
  }
}
