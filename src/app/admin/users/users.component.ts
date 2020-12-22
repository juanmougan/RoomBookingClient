import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.dataService.users;
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        if(id) {
          this.selectedUser = this.users.find( r => {
            return r.id === +id;  // The '+' is a hack to convert String to Number
          } );
        }
      }
    );
  }

  setUser(id: number) {
    // The queryParams are provided as an object
    this.router.navigate(['admin', 'users'], { queryParams: { id } }); // Same as "id: id"
  }

}
