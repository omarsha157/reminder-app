import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-viewevents',
  templateUrl: './viewevents.component.html',
  styleUrls: ['./viewevents.component.css']
})
export class VieweventsComponent implements OnInit {

  events:any
  uniqueid = localStorage.getItem('currId')
  currentUser = localStorage.getItem('currUser')

  constructor(private ds:DataService,private router:Router) {
    this.ds.viewEvent(this.uniqueid)
      .subscribe((result:any) => {
        this.events = result.event
      },
      result => {
        alert(result.error.message)
        this.router.navigateByUrl('/dashboard')
      })

    if(localStorage.getItem('tempIndex')) {
      localStorage.removeItem('tempIndex')
    }
  }

  ngOnInit(): void {
  }

  editEvent(index:any) {
    localStorage.setItem('tempIndex', index)

    this.router.navigateByUrl('editevent')
  }

  deleteEvent(index:any) {
    
    this.ds.deleteEvent(this.uniqueid, index)
      .subscribe((result:any) => {
        alert(result.message)
        window.location.reload()
      },
      result => {
        alert(result.error.message)
      })
  }

  logout() {
    localStorage.removeItem("currUser")
    localStorage.removeItem("currId")
    localStorage.removeItem("accesstoken")
    this.router.navigateByUrl('')
  }

}
