import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    uniqueid:['',[Validators.required,Validators.pattern('[a-zA-Z0-9!@#$%&*]*')]],
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9!@#$%&*]*')]],
  })

  constructor(private fb:FormBuilder, private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  register() {
    let uniqueid = this.registerForm.value.uniqueid
    let username = this.registerForm.value.username
    let password = this.registerForm.value.password

    if(this.registerForm.valid) {
      this.ds.register(uniqueid,username,password)
      .subscribe((result:any) => {
        if(result) {
          alert(result.message)
          this.router.navigateByUrl('')
        }
        
      },
      result => {
        alert(result.error.message)
      })
    } else {
      alert("invalid form")
    }
  }

}
