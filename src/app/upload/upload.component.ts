import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private Auth: AuthService, 
    private router: Router) { }


  ngOnInit() {
  }

  uploadFile(event){
    event.preventDefault()
    const target = event.target
    let batchname = target.querySelector('#batchName').value
    let file = target.querySelector('#fileselect').files[0]

    console.log("Name"+batchname+"File"+file)
   
    
    
    this.Auth.uploadExcel(batchname,file,this.Auth.taId,this.Auth.role).subscribe(data => {
      if(data) {
        this.router.navigate(['home'])
        this.Auth.setLoggedIn(true)
      } else {
        window.alert(data.toString)
      }
    })
    

  }

}
