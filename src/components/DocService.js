import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, id) => {
    savePDF(html, { 
      paperSize: 'a5',
      fileName: `${id}.pdf`,
      margin: 3,
      scale: 0.745
    })
  }
}

const Doc = new DocService();
export default Doc;