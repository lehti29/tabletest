import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { moveItemInArray, CdkDragDrop, CdkDropList, CdkDragStart } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

export interface Column {
  key: string;
  isVisible: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[];
  inputValue: string;
  previousIndex: number;

  allColumnsInfo: Column[] = [
    { key: 'position', isVisible: true },
    { key: 'name', isVisible: true },
    { key: 'weight', isVisible: false },
    { key: 'symbol', isVisible: true },
    { key: 'mass', isVisible: true }
  ];

  data = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', mass: 12 },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', mass: 3 },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', mass: 45 },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', mass: 678 },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', mass: 90 },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', mass: 64 },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', mass: 5 },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', mass: 8 },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', mass: 33 },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', mass: 89 }
  ];
  dataSource = new MatTableDataSource(this.data);
  constructor() {}

  ngOnInit(): void {
    this.updateDisplayedColumns();
  }

  toggleColumn(event: MatCheckboxChange) {
    this.allColumnsInfo.forEach(column => {
      if (column.key === event.source.value) {
        column.isVisible = !column.isVisible;
        return;
      }
    });
    this.updateDisplayedColumns();
  }

  onClickSubmit(formData: any) {
    this.allColumnsInfo.push({ key: formData.columnName, isVisible: true });
    this.data.map(d => {
      d[formData.columnName] = Math.floor(Math.random() * 100);
    });
    this.updateDisplayedColumns();
    this.inputValue = '';
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.allColumnsInfo
      .filter(c => c.isVisible)
      .map(c => c.key);
    console.log(this.displayedColumns);
  }

  drop(event: CdkDragDrop<string[]>) {
    const prevIndex = this.allColumnsInfo.indexOf(this.allColumnsInfo.find(c => c.key === this.displayedColumns[event.previousIndex]));
    const newIndex = this.allColumnsInfo.indexOf(this.allColumnsInfo.find(c => c.key === this.displayedColumns[event.currentIndex]));
    moveItemInArray(this.allColumnsInfo, prevIndex, newIndex);
    this.updateDisplayedColumns();
  }
}
