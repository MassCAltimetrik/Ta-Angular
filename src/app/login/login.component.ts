import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private Auth: AuthService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#userId').value
    const password = target.querySelector('#pwd').value

    this.Auth.getUserDetails(username, password).subscribe(data => {
      if (data.response_code == '000') {
        this.router.navigate(['upload'])
        this.Auth.setLoggedIn(true)
        this.Auth.setRole(data.role)
        this.Auth.setTaId(data.ta_id)
      } else {
        const dialogConfig = new MatDialogConfig();

        // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          title: "Error Message",
          message: data.response_description
        };
        dialogConfig.minWidth = 400;

        const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);

      }
    })
  }

  reset() {
    alert("reset");
  }
}
