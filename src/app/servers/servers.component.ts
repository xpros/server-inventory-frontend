// servers.component.ts
import { Component, OnInit } from '@angular/core';
import { Server } from '../models/server.model';
import { ServerService } from '../services/server.service';
import { ColumnApi ,GridApi, SortDirection } from 'ag-grid-community';
import { CsvExportParams } from 'ag-grid-community';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  servers: Server[] = [];
  columnDefs = [
    { field: 'id', hide: true },
    { headerName: 'Serial Number', field: 'serial_number' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'IP Address', field: 'ip_address', editable: true },
    { headerName: 'Model', field: 'model' },
    { headerName: 'OS', field: 'os' },
    { headerName: 'CPU', field: 'cpu' },
    { headerName: 'RAM', field: 'ram' },
    { headerName: 'Storage', field: 'storage' },
    { headerName: 'Purchase Date', field: 'purchase_date' },
    { headerName: 'Warranty Expiration', field: 'warranty_expiration' },
  ];

  defaultColDef = {
    editable: false,
    filter: true,
    flex: 1,
    floatingFilter: false,
    minWidth: 100,
    sortable: true,
  };
  sortingOrder: SortDirection[] = ['asc', 'desc', null];

  rowData: Server[] = [];

  private gridApi: GridApi | undefined;
  private gridColumnApi: ColumnApi | undefined;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getServers().subscribe((servers: Server[]) => {
      this.rowData = servers;
      if (this.gridApi) {
        this.gridApi.setRowData(this.rowData);
      }
    });
  }

  exportToCsv() {
    const params: CsvExportParams = {
      suppressQuotes: false,
      fileName: 'server_inventory.csv',
      columnSeparator: ','
    };
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv(params);
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
}
