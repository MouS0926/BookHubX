import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isChatOpen = false;
  clientMsg = '';


  chatMessages: any[] = [];
  books: any[] = []; 


  constructor(private chatService: ChatService) {}
  openChatBox() {
    this.isChatOpen = !this.isChatOpen;
  }

  send() {
    console.log('Here');
    // Add your logic for sending messages here

    if (this.clientMsg.trim() === '') {
      return;
    }
    

    this.chatMessages.push(`User: ${this.clientMsg}`);
    
    this.chatService.sendMessage(this.clientMsg).subscribe(
      (response) => {
        // Handle the response from the backend, e.g., update chatMessages array
        console.log(this.chatMessages);
        this.books = response;

        this.chatMessages.push(...this.books.map(book => `Bot: ${book.title}`));
        // this.chatMessages.push(...response);
       
        
        this.clientMsg = ''; // Clear the input field
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }


  }


