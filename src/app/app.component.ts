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
  startNum = 200;
  pageTotal = 1;
  currReceiptNum = this.startNum;

  constructor(private changeRef: ChangeDetectorRef) {}

  async captureScreen() {
    const settings = {
      scale: 2
    };
    const pdf = new jspdf('p', 'mm', 'letter');
    const position = 0;
    const imgWidth = 215.9;

    for (let pageNum = 0; pageNum < this.pageTotal; pageNum++) {
      const data = document.getElementById('content');
      const canvas = await html2canvas(data, settings);
      const imgHeight = canvas.height * imgWidth / canvas.width;
      // const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', 2, position, imgWidth, imgHeight);
      pdf.addPage()
      this.currReceiptNum += 2;
      this.changeRef.detectChanges();
    }

    pdf.save(`IPBYSP_receipts-${this.startNum}-${this.endNum}.pdf`);
  }

  get endNum(): number {
    return this.startNum + (this.pageTotal * 2);
  }
}
