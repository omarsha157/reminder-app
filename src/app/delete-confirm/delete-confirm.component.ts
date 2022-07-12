import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  uniqueid = localStorage.getItem('currId')

  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  delete() {
    this.ds.deleteAcc(this.uniqueid)
      .subscribe((result:any) => {
        alert(result.message)
        localStorage.removeItem("currUser")
        localStorage.removeItem("currAcno")
        localStorage.removeItem("accesstoken")
        this.router.navigateByUrl('')
      },
      result => {
        alert(result.message)
      })
  }

}
