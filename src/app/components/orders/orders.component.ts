import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@app/services/global.service';
import { Yeoman } from '@app/services/yeoman.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-orders',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orderStatus:any= ["En proceso","Declinado","Completado"];
  constructor(
    public global:GlobalService,
    public yeoman:Yeoman,
    public virtualRouter:virtualRouter
){}
}
