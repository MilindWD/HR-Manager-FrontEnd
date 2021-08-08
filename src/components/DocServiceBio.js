import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, name) => {
    savePDF(html, { 
      paperSize: 'a4',
      fileName: `${name}.pdf`,
      margin: 3,
      scale: 0.745
    })
  }
}

const Doc = new DocService();
export default Doc;