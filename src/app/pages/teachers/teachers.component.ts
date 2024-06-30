import { TeacherService } from './../../@core/project-services/teacher.service';
import { Teacher } from './../../@core/models/teacher';
import { AfterContentInit, Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ToastSettings } from 'src/app/@core/toastOptions';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent extends ToastSettings implements OnInit, AfterContentInit {

  teacher: Teacher;
  teachers: Teacher[];

  constructor(
    private dialogService: NbDialogService,
    private toast: NbToastrService, private teacherService: TeacherService) {
    super()
  }
  ngOnInit(): void {
    this.teacher = { name: "", description: "", photoURL: "" }
    this.getTeachers()
  }
  ngAfterContentInit(): void {

  }
  getTeachers() {
    this.teacherService.getList().subscribe(data => {
      console.log(data);

      if (data.count > 0) {
        this.teachers = data.items as Teacher[]
      }

    });
  }
  showUserDialog(dialog: TemplateRef<any>, teacher: Teacher, isAdd: boolean) {
    if (isAdd) {
     this.teacher = { name: "", description: "", photoURL: "" }
    }else{
      this.teacher=teacher
    }

    this.dialogService.open(
      dialog,
      {
        hasBackdrop: true,
        closeOnEsc: true,
        closeOnBackdropClick: false, autoFocus: true, dialogClass: 'permissionsDialogTemplateClass', hasScroll: true
      });
  }
  updateTeacher(ref: any) {
    this.teacherService.updateTeacher(this.teacher).subscribe(data => {
      this.toast.success("Veri güncellendi", 'success', this.config)
      ref.close()
      this.getTeachers()
    },
      error => {
        console.log(error);
        
        this.toast.danger(error, 'error', this.config)
      })
    
  }
  addTeacher(ref: any) {
    this.teacherService.addTeacher(this.teacher).subscribe(data => {
      this.toast.success("Veri Eklendi", 'success', this.config)
      ref.close()
      this.getTeachers()
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
    
  }
  deleteTeacher(ref: any) {
    this.teacherService.deleteTeacher(this.teacher).subscribe(data => {
      this.toast.success("Veri Silindi", 'success', this.config)
      ref.close()
      this.getTeachers()
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
    
  }
}
