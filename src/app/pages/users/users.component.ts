import { registerLocaleData } from '@angular/common';
import { AfterContentInit, Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { User } from 'src/app/@core/models/user';
import { UserService } from 'src/app/@core/project-services/user.service';
import { ToastSettings } from 'src/app/@core/toastOptions';

import localeTR from "@angular/common/locales/tr";
registerLocaleData(localeTR, "tr");

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends ToastSettings implements OnInit, AfterContentInit {
  password: string
  user: User
  users: User[]
  names: string[] = [];

  loading = true;
  constructor(
    private userService: UserService, private dialogService: NbDialogService,
    private toast: NbToastrService) {
    super()
  }
  ngAfterContentInit(): void {
    this.getUserList()
    this.loading = false;
  }

  ngOnInit(): void { 

  }

  getUserList() {
    this.userService.getUserList().subscribe(data => {
      console.log(data);
      
      this.users = data.items as User[]
      this.configDataTable();
    });
  }

  showUserDialog(dialog: TemplateRef<any>, user: User) {
    this.user = user

    this.dialogService.open(
      dialog,
      {
        hasBackdrop: true,
        closeOnEsc: true,
        closeOnBackdropClick: false, autoFocus: true, dialogClass: 'permissionsDialogTemplateClass', hasScroll: true
      });
  }

  changePasswordSubmit(ref: any) {
    this.userService.changeUserPassword(this.user).subscribe(data => {
      this.toast.success(data, 'success', this.config)
      setTimeout(() => {
        ref.close()
      }, 2000);
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
  }

  addUser() {
    this.userService.addUser(this.user).subscribe(data => {
      this.toast.success(data, 'success', this.config)
      this.getUserList()
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
  }

  // getUserById(id: number) {
  //   // this.clearFormGroup(this.userAddForm);
  //   // this.userService.getUserById(id).subscribe(data => {
  //   //   this.user = data;
  //   //   this.userAddForm.patchValue(data);

  //   // })
  // }

  updateUser(ref: any) {
    this.userService.updateUser(this.user).subscribe(data => {
      this.toast.success("Kayıt güncellendi", 'Başarılı', this.config)
      this.getUserList()
      ref.close()
    },
      error => {       
        this.toast.danger(error.error, 'error', this.config)
      })
  }

  deleteUser(ref: any) {
    this.userService.deleteUser(this.user).subscribe(data => {
      this.toast.success("Silindi", 'Başarılı', this.config)
      this.getUserList()
      setTimeout(() => {
        ref.close()
      }, 2000);
    },
      error => {
        this.toast.danger(error.error, 'error', this.config)
      })
  }

  configDataTable(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    // 	this.dataSource.paginator.firstPage();
    // }
  }
}