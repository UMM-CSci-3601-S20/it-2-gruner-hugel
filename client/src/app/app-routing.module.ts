import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewerPageComponent } from './viewer-page/viewer-page.component';
import { AddNoteComponent } from './add/add-note.component';
import { EditComponent } from './edit/edit.component';
import { UserDoorBoardComponent } from './user-doorboard/user-doorboard.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'notes/:id/view', component: ViewerPageComponent},
  {path: 'notes/edit/:userID/:id', component: EditComponent},
  {path: 'notes/user/:id', component: UserDoorBoardComponent},
  {path: 'notes/user/:id/new', component: AddNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
