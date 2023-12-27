import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'mant-fromulario-carga',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './fromulario-carga.component.html',
  styleUrl: './fromulario-carga.component.css'
})
export class FromularioCargaComponent {

  file: File | undefined;

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  async convertToJSON() {
    if (!this.file) return;

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });

      
      
      // Aquí puedes manipular jsonData para obtener las 4 columnas requeridas

      console.log('JSON obtenido del archivo Excel:', jsonData);
      // Luego, puedes enviar este JSON a tu API
      // this.sendDataToAPI(jsonData);
    };

    reader.readAsBinaryString(this.file);
  }


   // sendDataToAPI(data: any) {
  //   // Aquí va la lógica para enviar los datos a tu API
  // }
}
