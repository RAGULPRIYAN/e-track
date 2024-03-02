import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';  
import{ Todo,IonService} from 'src/app/services/ion.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public todos: Observable<Todo[]> | any;  
  constructor(private ionService: IonService,private router:Router) { }

  ngOnInit() {
    this.todos=this.ionService.getTodos()
    console.log(this.todos,'todos')
  }

  goToEdit(id:any){
console.log(id,'id checks000')
// this.router.navigate(["/details/"])
this.router.navigate(["/details/"],{
  queryParams:{
    id: id
  }
});
  }

}
