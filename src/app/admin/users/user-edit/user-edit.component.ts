import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  @Input()      // bind to this value
  user: User;

  formUser: User;

  message: string;

  password: string;
  passwordAgain: string;

  nameIsValid = false;
  passwordIsValid = false;
  passwordAgainIsValid = false;

  resetEventSubscription: Subscription;

  constructor(private dataService: DataService, 
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    );
  }

  initializeForm() {
    this.formUser = Object.assign({}, this.user);   // deep copies
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();
    this.checkIfPasswordAgainIsValid();
  }

  ngOnDestroy() {
    this.resetEventSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.formUser.id == null) {
      // add user
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    }
  }

  checkIfNameIsValid() {
    this.nameIsValid = this.inputIsNotBlank(this.formUser.name);
  }

  checkIfPasswordIsValid() {
    this.passwordIsValid = this.inputIsNotBlank(this.password);
  }

  checkIfPasswordAgainIsValid() {
    this.passwordAgainIsValid = this.inputIsNotBlank(this.passwordAgain);
  }

  inputIsNotBlank(input: string) {
    return !!input?.trim()
  }

  passwordsMatch() {
    return this.password === this.passwordAgain;
  }
}
