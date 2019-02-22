import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNames = ['Anna', 'Max'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,
          [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        'email': new FormControl(null,
          [Validators.required, Validators.email],
          [this.forbiddenEmailsValidator]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // can listen on controls on the whole form or individual controls

    // on every keystroke
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log('value change ', value);
    // });

    //on every status change
    this.signupForm.statusChanges.subscribe((status) => {
      console.log('status change ', status);
    });
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null));
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
