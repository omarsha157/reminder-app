import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser = localStorage.getItem('currUser')
  uniqueid = localStorage.getItem('currId')

  reminderForm = this.fb.group({
    eventHead:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 !@#$%^&*()_+-=:;",./\'"]*')]],
    eventBody:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 !@#$%^&*()_+-=:;",./\'"]*')]],
  })

  constructor(private fb:FormBuilder, private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("accesstoken")){
      alert("please login")
      this.router.navigateByUrl('')
    }
  }

  viewEvent() {
    this.ds.viewEvent(this.uniqueid)
      .subscribe((result:any) => {
        this.router.navigateByUrl('viewevents')
      },
      result => {
        alert(result.error.message)
      })
  }

  addEvent() {
    let eventHead = this.reminderForm.value.eventHead
    let eventBody = this.reminderForm.value.eventBody


    if(this.reminderForm.valid) {
      this.ds.addEvent(this.uniqueid,eventHead,eventBody)
      .subscribe((result:any) => {
        alert(result.message)
      },
      result => {
        alert(result.error.message)
      })
      this.reminderForm.setValue({
        eventHead:[""],
        eventBody:[""]
      })
    } else {
      alert("invalid form")
    }
  }

  logout() {
    localStorage.removeItem("currUser")
    localStorage.removeItem("currId")
    localStorage.removeItem("accesstoken")
    this.router.navigateByUrl('')
  }



}
