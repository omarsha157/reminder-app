import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    uniqueid:['',[Validators.required,Validators.pattern('[a-zA-Z0-9!@#$%&*]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9!@#$%&*]*')]]
  })

  constructor(private fb:FormBuilder,private router:Router, private ds:DataService) { }

  ngOnInit(): void {
  }

  login() {
    let uniqueid = this.loginForm.value.uniqueid
    let password = this.loginForm.value.password

    if(this.loginForm.valid) {
      this.ds.login(uniqueid,password)
        .subscribe((result:any) => {
          if(result) {
            localStorage.setItem('currUser',result.currentUser)
            localStorage.setItem('currId',result.currentId)
            localStorage.setItem('accesstoken',result.token)

            this.router.navigateByUrl('dashboard')
          }
        },
        result => {
          alert(result.error.message)
        })
    } else {
      alert('invalid form')
    }
  }
  
}
