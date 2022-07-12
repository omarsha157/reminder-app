import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  login(uniqueid: any, password: any) {

    const data = {
      uniqueid,
      password
    }
    return this.http.post('https://reminder-app-server.vercel.app/login', data)
    // return this.http.post('http://localhost:3000/login', data)
  }

  register(uniqueid:any,username:any,password:any) {
    const data = {
      uniqueid,
      username,
      password
    }
    return this.http.post('https://reminder-app-server.vercel.app/register', data)
    // return this.http.post('http://localhost:3000/register', data)
  }

  addEvent(uniqueid:any,eventHead:any,eventBody:any) { 
    const data = {
      uniqueid,
      eventHead,
      eventBody
    }
    return this.http.post('https://reminder-app-server.vercel.app/add', data, this.getOptions())
    // return this.http.post('http://localhost:3000/add', data, this.getOptions())
  }

  viewEvent(uniqueid:any) {
    const data = {
      uniqueid
    }
    return this.http.post('https://reminder-app-server.vercel.app/view', data, this.getOptions())
    // return this.http.post('http://localhost:3000/view', data, this.getOptions())
  }

  editEvent(uniqueid:any, index:any) {
    const data = {
      uniqueid,
      index
    }
    return this.http.post('https://reminder-app-server.vercel.app/editEvent', data, this.getOptions())
    // return this.http.post('http://localhost:3000/editEvent', data, this.getOptions())
  }

  deleteEvent(uniqueid:any,index:any) {
    const data = {
      uniqueid,
      index
    }
    return this.http.post('https://reminder-app-server.vercel.app/deleteEvent', data, this.getOptions())
    // return this.http.post('http://localhost:3000/deleteEvent', data, this.getOptions())
  }

  submitEdit(uniqueid:any,index:any,eventHead:any,eventBody:any) {
    const data = {
      uniqueid,index,eventHead,eventBody
    }
    return this.http.post('https://reminder-app-server.vercel.app/submitEdit',data, this.getOptions())
    // return this.http.post('http://localhost:3000/submitEdit',data, this.getOptions())
  }

  deleteAcc(uniqueid:any) {
    return this.http.delete('https://reminder-app-server.vercel.app/deleteAcc/' +uniqueid, this.getOptions())
    // return this.http.delete('http://localhost:3000/deleteAcc/' +acno, this.getOptions())
  }

  getOptions() {
    const token = localStorage.getItem('accesstoken') 

    let headers = new HttpHeaders()
    if(token) {
      headers = headers.append('access-token', token)
      options.headers = headers
    }

    return options
  }

}
