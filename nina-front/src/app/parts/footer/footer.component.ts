import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../../animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [fadeAnimation] // register the animation
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
