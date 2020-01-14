import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  @Input() receiptNum: number;

  constructor() { }

  ngOnInit() {
  }

}
