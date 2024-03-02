import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonService, Todo } from 'src/app/services/ion.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  todo: Todo = {  
    name: '',  
    notes: ''  
  };  
  
  constructor( private activeRoute:ActivatedRoute, private todoService: IonService,  
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    this.ionViewWillEnter()
  }

  ionViewWillEnter() {  
    const id:any = this.activeRoute.snapshot.queryParams["id"];;  
    console.log(id,'id checks')
    if (id) {  
      console.log(id,'inside if checks')
      this.todoService.getTodo(id).subscribe(todo => {  
        this.todo = todo!;  
        console.log( this.todo,' this.todo')
      });  
    }  
  }  

  addTodo() {  
    this.todoService.addTodo(this.todo).then(() => {  
      this.router.navigateByUrl('/list');  
      this.showToast('todo added');  
    }, err => {  
      this.showToast('There was a some problem in adding your todo :(');  
    });  
  }  
  
  deleteTodo() {  
    // this.todoService.deleteTodo(this.todo.id).then(() => {  
    //   this.router.navigateByUrl('/');  
    //   this.showToast('todo deleted');  
    // }, err => {  
    //   this.showToast('There was a some problem in deleting your todo :(');  
    // });  
  }  
  
  updateTodo() {  
    this.todoService.updateTodo(this.todo).then(() => {  
      this.showToast('todo updated');  
    }, err => {  
      this.showToast('There was a some problem in updating your todo :(');  
    });  
  }  
  
  showToast(msg: string) {  
    this.toastCtrl.create({  
      message: msg,  
      duration: 2000  
    }).then(toast => toast.present());  
  }  

}
