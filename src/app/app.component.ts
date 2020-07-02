import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {

  
  title = 'angular-pdf';
  pdfSrc: any;
  urlSafe: SafeResourceUrl;
  @ViewChild( 'htmlData', { static: false } ) htmlData: ElementRef;
  USERS = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      phone: '1-463-123-4447',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne@kory.org',
      phone: '493-170-9623 x156'
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio@annie.ca',
      phone: '(254)954-1289'
    },
    {
      id: 6,
      name: 'Mrs. Dentu',
      email: 'karley@jasper.info',
      phone: '1-477-935-8478 x6430'
    }
  ];
  constructor(public sanitizer: DomSanitizer) { }
  ngAfterViewInit() {
    this.openPDF();
  }
  public openPDF(): void {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.fromHTML(DATA.innerHTML, 15, 15);
    // doc.output('dataurlnewwindow');
    console.log(doc.output('datauristring'));
    this.pdfSrc = doc.output('datauristring');
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    // const iframe = '<iframe width="100%" height="100%" src="' + str + '"></iframe>';
    // window.open(str, '_self');
    // const x = window.open();
    // x.document.open();
    // x.document.write(iframe, '_self"blank');
    // x.document.close();
    // doc.output('dataurlnewwindow');
  }
  public downloadPDF(): void {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');

    const handleElement = {
      '#editor' : function(element, renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 15, 15, {
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }
}
