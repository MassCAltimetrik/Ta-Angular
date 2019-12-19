import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  batchArray = [];
  isAdmin:boolean

  constructor(private Auth: AuthService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    //batchArray = [];
      //console.log(this.batchArray)
       this.Auth.getSessionList().subscribe(data => {
         console.log("Hererer "+data);
         this.batchArray = data;
       })
       console.log(this.batchArray)
       this.isAdmin = false
       var role = this.Auth.role
       if(role == "ADMIN")
       this.isAdmin = true;
  }

  deleteSession(event) {
    event.preventDefault()
    let id  = event.srcElement.attributes.id || event.currentTarget.id;
    let divName = 'sessionDiv'+id;
    
    const div  = document.getElementById(divName);
    div.style.display = 'none';

    console.log("Here deleting batch"+id+divName+div)
     this.Auth.deleteSession(id).subscribe((data)=>{
     console.log("success");
     div.style.display = 'none';
 });
  }


}
