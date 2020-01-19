import { Component, ChangeDetectorRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pbys-receipts';
  startNum: number;
  pageNum: number;
  pageTotal: number;
  processing: boolean;
  currPageNum: number;

  constructor(private changeRef: ChangeDetectorRef) {
    this.reset();
  }

  async captureScreen() {
    this.processing = true;
    const settings = {
      scale: 2
    };
    const pdf = new jspdf('p', 'mm', 'letter');
    const position = 0;
    const imgWidth = 215.9;

    while(this.pageNum < this.pageTotal) {
      this.currPageNum = (this.pageNum + 1);

      const data = document.getElementById('content');
      const canvas = await html2canvas(data, settings);
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', 2, position, imgWidth, imgHeight);

      if (this.currPageNum != this.pageTotal) {
        pdf.addPage();
      }
      this.pageNum += 1;
      this.changeRef.detectChanges();
    }

    pdf.save(`IPBYSP_receipts-${this.startNum}-${this.endNum}.pdf`);
    this.reset();
  }

  reset() {
    this.startNum = 200;
    this.pageNum = 0;
    this.pageTotal = 1;
    this.processing = false;
    this.currPageNum = 1;
  }

  get endNum(): number {
    return this.startNum + (this.pageTotal * 2) - 1;
  }

  get captureBtnText(): string {
    if (this.processing) {
      return `Processing page ${this.currPageNum} of ${this.pageTotal}`;
    }
    return 'Capture Screen';
  }

  get currReceiptNum(): number {
    return this.startNum + (this.pageNum * 2);
  }
}
