import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Chating App';
  users: any;
  baseUrl ="https://localhost:5001/Users";
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers():any{
    this.http.get(this.baseUrl).subscribe(data=>{
      this.users=data;
    },
    err=>{
      console.log(err);
    }
    )
  }
}
