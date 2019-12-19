import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public isCollapsed = false;
  allocateTa = [];
  deallocateTa = [];
  constructor(private Auth: AuthService,
    private router: Router, public dialog: MatDialog,private modalService: NgbModal) { }

  ngOnInit() {
    //allocateTa = [];
      //console.log(this.allocateTa)
       this.Auth.getUnassingedTaData().subscribe(data => {
         console.log("Hererer "+data);
         this.allocateTa = data;
       })
       this.Auth.getassingedTaData().subscribe(data => {
        console.log("Hererer "+data);
        this.deallocateTa = data;
      })
       console.log(this.allocateTa)
  }


  public inputs = [];
  public deallocate = [];
  

change(event){
  //console.log("here"+obj+check);
  var target = event.target
    if(target.checked) this.inputs.push(target.id);
    else this.inputs = this.arrayRemove(this.inputs, target.id);

    this.displayCheckBoxes();
}

displayCheckBoxes(){
    this.inputs.forEach(function(element) {
        console.log("Allocate "+element);
    });

    this.deallocate.forEach(function(element) {
      console.log("DeAllocate "+element);
  });
}

arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
}

allocateTA(event){
  this.Auth.allocateTA(this.inputs,this.Auth.taId).subscribe(data => {
    this.router.navigate(['batch'])
  })
  
}

changeDeallocate(event){
  //console.log("here"+obj+check);
  var target = event.target
    if(target.checked) this.deallocate.push(target.id);
    else this.deallocate = this.arrayRemove(this.deallocate, target.id);

    this.displayCheckBoxes();
}


deAllocateTA(event){
  this.Auth.deAllocateTA(this.deallocate,this.Auth.taId).subscribe(data => {
    this.router.navigate(['batch'])
  })
  
}
}
