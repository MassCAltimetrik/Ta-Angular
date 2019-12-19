import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean

  constructor(private Auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isAdmin = false
    var role = this.Auth.role
    console.log(role)
    if(role == "ADMIN")
    this.isAdmin = true;

    console.log(this.isAdmin)

  }

}
