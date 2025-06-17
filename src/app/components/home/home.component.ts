import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { virtualRouter } from './../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './../../services/script.service';

import { ScriptStore } from './../../services/script.store';
@Component({
  selector: 'app-home',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements  OnInit {
  showContent: boolean = false;
  textColor: string = 'initial';
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService
    ) {

    }
    changeColor() {
      this.textColor = 'initial'; // Cambia el color al pasar el mouse por encima
  }
  
  resetColor() {
      this.textColor = 'initial'; // Restablece el color cuando el mouse se va
  }
   /*  preview(client:any){
      this.global.productSelected=client;
      this.global.productPreview=true;
    } */
    ngOnInit(): void {
      setTimeout(() => {
        this.showContent = true;
      }, 2000); // 5000 milliseconds = 5 seconds
  
      // this.animatePercentage();
      // this.epicFunction();
    }
}
