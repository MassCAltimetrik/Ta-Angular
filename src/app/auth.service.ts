import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'

interface loginResponse{
  response_code: string,
  role: string,
  ta_id: string,
  ta_name: string
  response_description: string
}


interface Response{
  response_code: string,
  response_description: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false
  private _role;
  private _taId;
  private _taName;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  get role(){
    return this._role;
  }

  get taId(){
    return this._taId;
  }

  get taName(){
    return this._taName;
  }

  setRole(value:string){
    this._role = value
  }

  
  setTaId(value: any){
    this._taId = value
  }
  
  setTaName(value : string){
    this._taName = value
  }

  getUserDetails(email_id:string, password:string) {
    // post these details to API server return user info if correct
    return this.http.post<loginResponse>('http://localhost:8444/profile/loginAccount', {
      email_id,
      password
    })
  }

  uploadExcel(batchName:string,file,id,role) {
    // post these details to API server return user info if correct

    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    formData.append("role", role);
    formData.append("batchName", batchName);


    return this.http.post('http://localhost:8444/uploadExcel', formData,
    {
       responseType: 'text' 
    })
  }

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  registerUser(firstname,lastname,mobileNumber,email,security_question,security_answer,password,role) {
    return this.http.post<Response>('http://localhost:8444/profile/createAccount', {
      "email_id":email,
      "password":password,
      "first_name":firstname,
      "last_name":lastname,
      "mobile_number":mobileNumber,
      "security_question":security_question,
      "security_answer":security_answer,
      "role":role

    }, this.options)
  }

  getBatchList() {
    return this.http.get<[]>('http://localhost:8444/batch/getBatchData/'+this.taId)
  }

  getSessionList() {
    return this.http.get<[]>('http://localhost:8444/batch/getSessionData/'+this.taId)
  }

  deleteBatch(batchid:number) {
    console.log("here in service")
    return this.http.delete('http://localhost:8444/batch/deleteBatch/'+batchid)
  }

  createSession(sessionname: string, inputs: any[], taId: number) {
    return this.http.post<Response>('http://localhost:8444/batch/createSesion', {
      "taId":taId,
      "candidates":inputs,
      "sessionName":sessionname
    }, this.options)
  }

  deleteSession(sessionid:number) {
    return this.http.delete('http://localhost:8444/batch/deleteSession/'+sessionid)
  }

  getassingedTaData() {
    return this.http.get<[]>('http://localhost:8444/profile/assignedTAData/'+this.taId)
  }

  getUnassingedTaData() {
    return this.http.get<[]>('http://localhost:8444/profile/unassignedTAData')
  }

  allocateTA(inputs: any[], taId: any) {
    return this.http.post<Response>('http://localhost:8444/batch/allocateTA', {
      "taId":taId,
      "candidates":inputs,
    }, this.options)
  }

  deAllocateTA(inputs: any[], taId: any) {
    return this.http.post<Response>('http://localhost:8444/batch/deallocateTA', {
      "taId":taId,
      "candidates":inputs,
    }, this.options)
  }

  assignBatch(id: number, selectedTaId: number, taId: number,type:string) {
    return this.http.post<Response>('http://localhost:8444/batch/assignBatchSessionTA', {
      "adminId":taId,
      "Id":id,
      "selectedTaId":selectedTaId,
      "type": type
    }, this.options)
  }

}
