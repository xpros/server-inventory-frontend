// servers.component.ts
import { Component, OnInit } from '@angular/core';
import { Server } from '../models/server.model';
import { ServerService } from '../services/server.service';
import { ColumnApi ,GridApi, GridOptions, SortDirection } from 'ag-grid-community';
import { CsvExportParams } from 'ag-grid-community';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  servers: Server[] = [];
  gridOptions: GridOptions = {};
  columnDefs = [
    { field: 'id', hide: true },
    { headerName: 'Location', field: 'location' },
    { headerName: 'Serial Number', field: 'serial_number' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'IP Address', field: 'ip_address', editable: true },
    { headerName: 'Environment', field: 'environment' },
    { headerName: 'Type', field: 'type' },
    { headerName: 'State', field: 'state' },
    // { headerName: 'Status', field: 'status' },
    { headerName: 'Manufacturer', field: 'manufacturer' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'OS', field: 'distribution' },
    { headerName: 'OS Version', field: 'distribution_version' },
    { headerName: 'Kernel', field: 'kernel' },
    // { headerName: 'CPU', field: 'cpu' },
    // { headerName: 'RAM', field: 'ram' },
    // { headerName: 'Storage', field: 'storage' },
    { headerName: 'Uptime', field: 'uptime'},
    { headerName: 'Admin IP', field: 'admin_ip'},
    { headerName: 'Updated', field: 'timestamp'},
    { headerName: 'Created', field: 'created_at'}
    // { headerName: 'Purchase Date', field: 'purchase_date' },
    // { headerName: 'Warranty Expiration', field: 'warranty_expiration' },
  ];

  defaultColDef = {
    menubar: ['columnsMenuTab'],
    editable: false,
    filter: true,
    flex: 1,
    floatingFilter: true,
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
        this.gridApi.showLoadingOverlay();
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
    this.gridApi?.exportDataAsCsv(params);
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi?.paginationSetPageSize(Number(value));
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi?.setDomLayout("autoHeight");
    this.gridApi?.showLoadingOverlay();
  }
}
