import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTable,MatTableDataSource,MatSort,MatPaginator} from '@angular/material';



interface User{
  name:string;
  dept:string;
}

interface Group{
  gname:string;
  id:number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit, OnChanges {
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'index'];
  constructor() { }

  @Input("groupVal") elements:PeriodicElement[];

  elDataSource=new MatTableDataSource<PeriodicElement>();
  
  @ViewChild("grTable") grMatTable:MatTable<PeriodicElement[]>;

  @ViewChild("matSortData") matSortItems:MatSort; 

  users:(User|Group)[]=[
    {gname:"CDB",id:0},
    {name:"Raaghavee",dept:"CDB"}, 
    {name:"Mani",dept:"CDB"},
    {gname:"Health care",id:1},
    {name:"Thiru",dept:"Health care"},
    {name:"Ambi",dept:"Health care"}
  ];



  ngOnInit() {
  }


  ngOnChanges(){
    this.elDataSource=new MatTableDataSource<PeriodicElement>(this.elements);
    this.elDataSource.sort=this.matSortItems;
  }

  moveItems(event:CdkDragDrop<any>){
    //let prevIndex=this.users.findIndex((d)=>d===event.item.data);
    moveItemInArray(this.users,event.previousIndex,event.currentIndex);
  }


  onDragDrop(event: CdkDragDrop<PeriodicElement[]>,index:number,tableData:PeriodicElement[],matTableData:MatTable<PeriodicElement[]>){
  const prevIndex = this.elDataSource.data.findIndex((d)=>d === event.item.data);
  moveItemInArray(this.elDataSource.data, prevIndex, event.currentIndex);
  this.elDataSource._updateChangeSubscription();
  matTableData.renderRows();
}

}