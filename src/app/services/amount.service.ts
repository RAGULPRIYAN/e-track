import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore,DocumentReference,QueryDocumentSnapshot} from '@angular/fire/compat/firestore'; 
import {from, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';  
export interface Amount {  
  id?:string;
  setAmount: string; 
  timestamp :Date
} 

export interface Expense {  
  id?:string;
  expenseAmount: string; 
  expenseName:string;
  fixAmountId:string; 
  timestamp :Date
} 
@Injectable({
  providedIn: 'root'
})

export class AmountService {
  private amount: Observable<Amount[]> | any; 
  private expense:  Observable<Expense[]> | any; 
  private todoCollection: AngularFirestoreCollection<Amount> ; 
  private expenseCollection: AngularFirestoreCollection<Expense> ;   

  constructor(private db: AngularFirestore) {
    this.todoCollection = this.db.collection<Amount>('amount');
    this.expenseCollection = this.db.collection<Expense>('expense');
    this.amount = this.todoCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    ); 
    this.expense = this.expenseCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
        
          const id = a.payload.doc.id;  
          // const date = a.payload.doc
          return { id, ...data };  
        });  
      })    
    );  
   }
  
 

  createSetAmount(data:any){
    return this.todoCollection.add(data);  
  }

  getSetAmount(){
    return this.amount;
  }

  getSetAmountId(id: string) {  
    return this.todoCollection.doc<Amount>(id).valueChanges().pipe(  
      take(1),  
      map(todo => {  
        if (todo) {
          todo.id = id;  
          return todo;
        } else {
          // Handle the case where todo is undefined (e.g., return a default value or throw an error)
          return null; // Or any other appropriate handling
        }  
      })  
    );  
  }

  createExpense(data:any){
  
    return this.expenseCollection.add(data)
  }

  getExpense(){
    return this.expense;
  }

  getExpenseId(id: string) {  
    return this.expenseCollection.doc<Expense>(id).valueChanges().pipe(  
      take(1),  
      map(todo => {  
        if (todo) {
          todo.id = id;  
          return todo;
        } else {
          // Handle the case where todo is undefined (e.g., return a default value or throw an error)
          return null; // Or any other appropriate handling
        }  
      })  
    );  
  }
  getExpenseByFixAmountId(fixAmountId: string): Observable<Expense[]> {
    return from(this.expenseCollection.ref.where('fixAmountId', '==', fixAmountId).get()).pipe(
      map(querySnapshot => {
        const expenses: Expense[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<Expense>) => {
          const expenseData = doc.data() as Expense;
          expenseData.id = doc.id;
          expenses.push(expenseData);
        });
        return expenses;
      }),
      catchError(error => {
        console.error('Error getting expenses by fixAmountId:', error);
        throw error; // Handle error appropriately in your application
      })
    );
  }
  updateExpense(todo: Expense): Promise<void> {  
    
    return this.expenseCollection.doc(todo.id).update({ expenseAmount: todo.expenseAmount, expenseName: todo.expenseName,fixAmountId:todo.fixAmountId,timestamp:new Date() });  
  }  
    
 

}
