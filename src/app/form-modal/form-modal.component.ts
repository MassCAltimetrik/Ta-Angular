import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  taArray = [];

  ngOnInit() {
    this.Auth.getassingedTaData().subscribe(data => {
      console.log("Hererer "+data);
      this.taArray = data;
    })
  }

  @Input() public id;
  myForm: FormGroup;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,private Auth: AuthService
  ) {
  }


  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  assignTA(event){
    event.preventDefault()
    const target = event.target
    let tanames = document.getElementsByName("ta") 

    console.log("BatchId: "+this.id)
    let taId = document.getElementById("taId") 

    let batchId = (<HTMLInputElement>document.getElementById("modalSession")).value 

    var selectedTaId;
    for(var i = 0; i < tanames.length; i++){
        if((tanames[i] as HTMLInputElement).checked){
          selectedTaId = (tanames[i] as HTMLInputElement).value;
        }
    }
  
    console.log(selectedTaId);
    this.Auth.assignBatch(this.id,selectedTaId,this.Auth.taId,"Batch").subscribe(data => {
    })

    this.activeModal.close('Modal Closed');
    let divName = 'batchDiv'+this.id;
    
    const div  = document.getElementById(divName);
    div.style.display = 'none';
  }
}
