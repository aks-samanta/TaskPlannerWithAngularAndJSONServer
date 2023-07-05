import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/Task';



@Injectable({
  providedIn: 'root'
})


export class TaskService {

  apiUrl: string = "https://taskplanner-aks-samanta.up.railway.app/api/tasks";

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'authorization': 'Bearer ' + sessionStorage.getItem("authToken"),
      'content-type': 'application/json'
    })
  }
  ngOnInit() {

  }

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const headers = this.getHttpHeaders();
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  deleteTask(task: Task): Observable<Task> {

    const url = `${this.apiUrl}/${task.id}`;
    const headers = this.getHttpHeaders();
    return this.http.delete<Task>(url, { headers });
  }

  updateReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}/reminder`;
    const headers = this.getHttpHeaders();

    return this.http.put<Task>(url, task, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const headers = this.getHttpHeaders();
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }


  toggleDone(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}/done`;
    const headers = this.getHttpHeaders();

    return this.http.put<Task>(url, task, { headers });
  }

  editTask(editedTask:Task):  Observable<Task>{
    const url = `${this.apiUrl}/update/${editedTask.id}`;
    console.log(editedTask);
    const headers = this.getHttpHeaders();

    return this.http.put<Task>(url, editedTask, { headers });

  }
}
