import { Component, OnInit } from '@angular/core';
import { DiscussionService } from 'src/app/services/discussion.service';

@Component({
  selector: 'app-mydiscussion',
  templateUrl: './mydiscussion.component.html',
  styleUrls: ['./mydiscussion.component.css']
})
export class MydiscussionComponent implements OnInit {

  mydiscussions: any[] = [];
  editingDiscussion: any = null;
  editedTitle: string = '';
  editedContent: string = '';

  constructor(private discussionService:DiscussionService){}

 

  ngOnInit(): void {
    this.loadDiscussions()
  }

  loadDiscussions(): void {
    this.discussionService.getMydiscussions().subscribe(
      (data) => {
        this.mydiscussions = data;
        console.log(data);
        
      },
      (error) => {
        console.error('Error fetching discussions:', error);
      }
    );
  }

  editDiscussion(discussion: any): void {
    this.editingDiscussion = discussion;
    this.editedTitle = discussion.title;
    this.editedContent = discussion.content;
  }

  cancelEdit(): void {
    this.editingDiscussion = null;
  }


  saveEdit(): void {
    if (this.editingDiscussion) {
      const { _id: discussionId, ...updatedData } = this.editingDiscussion;
      this.discussionService.updateDiscussion(discussionId, updatedData).subscribe(
        (data) => {
          console.log(data);
          // Reload discussions or update the specific discussion in the array
          this.editingDiscussion.title = this.editedTitle;
          this.editingDiscussion.content = this.editedContent;
          this.editingDiscussion = null;
        },
        (error) => {
          console.error('Error updating discussion:', error);
        }
      );
    }
  }


  deleteDiscussion(discussionId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this discussion?');
    if (confirmDelete) {
      this.discussionService.deleteDiscussion(discussionId).subscribe(
        () => {
          alert('Discussion deleted successfully!');
          this.loadDiscussions();
        },
        (error) => {
          console.error('Error deleting discussion:', error);
        }
      );
    }
  }

}
