import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pbys-receipts';

  captureScreen() {
    const data = document.getElementById('content');
    const settings = {
      scale: 2
    };
    html2canvas(data, settings).then(canvas => {
      const imgWidth = 215.9;
      const pageHeight = 279.4;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'letter');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 2, position, imgWidth, imgHeight);
      pdf.save('rawr.pdf');
    });
  }
}
