import { Component } from '@angular/core';
import { FileListComponent } from "./features/file-management/file-list/file-list.component";
import { UserListComponent } from "./features/user-management/user-list/user-list.component";

@Component({
  selector: 'app-root',
  imports: [ FileListComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pictune-admin';
}
