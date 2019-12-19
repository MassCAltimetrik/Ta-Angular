import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private Auth: AuthService, 
    private router: Router, public dialog: MatDialog) { }
    optionsSelect: Array<any>;
    ngOnInit() {
      this.optionsSelect = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ];
      }
    

    registerUser(event){
    event.preventDefault()
    const target = event.target
    let email = target.querySelector('#email').value
    let firstName = target.querySelector('#firstName').value
    let lastname =  target.querySelector('#lastName').value
    let mobileNumber =  target.querySelector('#mobileNumber').value
    let security_question =  target.querySelector('#securityQ').value
    let security_answer = target.querySelector('#securityQAns').value
    let password =  target.querySelector('#password').value
    let role = target.querySelector('#role').value

    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 400;

    this.Auth.registerUser(firstName,lastname,mobileNumber,email,security_question,security_answer,password,role).subscribe(data => {

      if(data.response_code == '000') {
        this.router.navigate(['login'])
        dialogConfig.data = {
          title: "Success Message",
          message: "Got Register Sucessfully"
        };
        const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);
      } else {
        dialogConfig.data = {
          title: "Error Message",
          message: data.response_description
        };
        const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);
      }
    })
    
  }
}