import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  public isCollapsed = false;
  items = ['Candidate', 'Second', 'Third'];
  batchArray = [];
  isAdmin: boolean
  constructor(private Auth: AuthService,
    private router: Router, public dialog: MatDialog,private modalService: NgbModal) { }

  ngOnInit() {
       this.Auth.getBatchList().subscribe(data => {
         this.batchArray = data;
       })
       console.log("data return:"+this.batchArray)
       this.isAdmin = false
      var role = this.Auth.role
      if(role == "ADMIN")
      this.isAdmin = true;

      }

  deleteBatch(event) {
    event.preventDefault()
    let id  = event.srcElement.attributes.id || event.currentTarget.id;
    let divName = 'batchDiv'+id;
    
    const div  = document.getElementById(divName);
    div.style.display = 'none';

    console.log("Here deleting batch"+id+divName+div)
     this.Auth.deleteBatch(id).subscribe((data)=>{
     console.log("success");
     div.style.display = 'none';
 });
  }

  createSession(event) {
  //  this.displayCheckBoxes();
    event.preventDefault()
    const target = event.target
    var name = "sessionName"+target.id
    const sessionname = ((document.getElementById(name) as HTMLInputElement).value);

    console.log("Session Name  "+sessionname+"candidates"+this.inputs)
    
    this.Auth.createSession(sessionname,this.inputs,this.Auth.taId).subscribe(data => {
      this.router.navigate(['session'])
    })
    
  }

  public inputs = [];

change(event){
  //console.log("here"+obj+check);
  var target = event.target
    if(target.checked) this.inputs.push(target.id);
    else this.inputs = this.arrayRemove(this.inputs, target.id);

    this.displayCheckBoxes();
}

displayCheckBoxes(){
    this.inputs.forEach(function(element) {
        console.log(element);
    });
}

arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
}

openFormModal(event) {
  event.preventDefault()
  const target = event.target
  console.log(target)

  const modalRef = this.modalService.open(FormModalComponent,target.id);
  modalRef.componentInstance.id = target.id;

  modalRef.result.then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}
 
assignTA(event){
  event.preventDefault()
  const target = event.target
  const sessionname = ((document.getElementById("sessionName") as HTMLInputElement).value);

}
  // Candidates1: Candidate[] = [
  //   { id: 11, name: 'Dr Nice' },
  //   { id: 12, name: 'Narco' },
  //   { id: 13, name: 'Bombasto' },
  //   { id: 14, name: 'Celeritas' },
  //   { id: 15, name: 'Magneta' },
  //   { id: 16, name: 'RubberMan' },
  //   { id: 17, name: 'Dynama' },
  //   { id: 18, name: 'Dr IQ' },
  //   { id: 19, name: 'Magma' },
  //   { id: 20, name: 'Tornado' }
  // ];

  // Candidates2: Candidate[] = [
  //   { id: 11, name: 'Dr Nice2' },
  //   { id: 12, name: 'Narco2' },
  //   { id: 13, name: 'Bombasto2' },
  //   { id: 14, name: 'Celeritas2' },
  //   { id: 15, name: 'Magneta2' },
  //   { id: 16, name: 'RubberMan2' },
  //   { id: 17, name: 'Dynama2' },
  //   { id: 18, name: 'Dr IQ2' },
  //   { id: 19, name: 'Magma2' },
  //   { id: 20, name: 'Tornado2' }
  // ];

  //  batch1= { name: "Batch1" ,id:1,Candidates: this.Candidates1}
  //  batch2= { name: "Batch2" ,id:2,Candidates: this.Candidates1}
  //  batchArray = [this.batch1,this.batch2];
 
 }

export class NgbdCollapseBasic {
  public isCollapsed = false;
}


export class Candidate {
  name:string;
  id:number;
}

export class Batch {
  name:string;
  public Candidates: Candidate[];
  public isCollapsed = false;
}
