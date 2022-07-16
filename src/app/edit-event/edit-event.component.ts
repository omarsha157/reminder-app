import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  heading:any
  content:any

  editForm = this.fb.group({
    eventHead:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 !@#$%^&*()_+-=:;",./\'"]*')]],
    eventBody:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 !@#$%^&*()_+-=:;",./\'"]*')]],
  })

  index = localStorage.getItem('tempIndex')
  uniqueid = localStorage.getItem('currId')

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    this.ds.editEvent(this.uniqueid,this.index)
      .subscribe((result:any) => {
        this.editForm.setValue({
          eventHead:[result.event.heading],
          eventBody:[result.event.content]
        })
      },
      result => {
        alert(result.error.message)
      })
  }

  ngOnInit(): void {
  }

  submitEdit() {
    let eventHead = this.editForm.value.eventHead
    let eventBody = this.editForm.value.eventBody

    this.ds.submitEdit(this.uniqueid,this.index,eventHead,eventBody)
      .subscribe((result:any) => {
        
      },
      result => {
        alert(result.message)
      })

    this.router.navigateByUrl('viewevents')
  }

}
