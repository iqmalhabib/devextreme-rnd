<template>
  <div id="app-container">
    <DxButton
      @click="exportToExcel"
      text="Export to Excel"
    />
    <DxButton
      @click="exportToPdf"
      text="Export to PDF"
    />
    <DxDataGrid
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :data-source="dataSource"
      :hover-state-enabled="true"
      :show-borders="true"
      @selection-changed="selectCustomer"
      id="dataGrid"
      ref="dataGrid"
    >
      <DxHeaderFilter :visible="true" />
      <DxExport :enabled="true" :formats="['pdf', 'xlsx']" />
      <DxSearchPanel :visible="true" />
      <DxFilterRow :visible="true" />
      <DxColumnChooser :enabled="true" mode="dragAndDrop"/>
      <DxSelection mode="single" />
      <template v-for="(column, index) in columns" :key="index">
        <DxColumn
          :allow-header-filtering="true"
          :data-field="column.field"
          :caption="column.caption"
          :visible="column.visible !== undefined ? column.visible : true"
          :sort-order="column.sortOrder || null"
        >
          <template v-if="column.field === 'City'">
            <DxLookup
              :data-source="lookupDataSource"
              value-expr="id" 
              display-expr="name"
            />
          </template>
        </DxColumn>
      </template>
      <DxSummary>
        <DxTotalItem
          v-for="(summaryColumn, index) in summaryColumns"
          :key="index"
          :column="summaryColumn.field"
          :summary-type="summaryColumn.summaryType"
        />
      </DxSummary>
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :fixed="true"
      />
      <DxPager
        :allowed-page-sizes="[10, 25, 50, 100]"
        :show-page-size-selector="true"
        :visible="true"
        :show-info="true"
        info-text="Halaman {0} daripada {1} ({2} Kandungan)"
      />
      <DxPaging :page-size="10" />
    </DxDataGrid>
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import {
  DxColumn,
  DxColumnChooser,
  DxDataGrid,
  DxEditing,
  DxExport,
  DxFilterRow,
  DxHeaderFilter,
  DxLookup,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSelection,
  DxSummary,
  DxTotalItem,
} from 'devextreme-vue/data-grid';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/common/export/excel';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridPdf } from 'devextreme/pdf_exporter';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxFilterRow,
    DxSearchPanel,
    DxEditing,
    DxSelection,
    DxSummary,
    DxTotalItem,
    DxPager,
    DxPaging,
    DxExport,
    DxLookup,
    DxHeaderFilter
  },
  props: {
    jsonUrl: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    summaryColumns: {
      type: Array,
      default: () => [],
    },
    lookupDataSource: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dataSource: [],
      selectedCustomer: undefined,
    };
  },
  watch: {
    jsonUrl: "fetchData",
  },
  methods: {
    async fetchData() {
      const response = await fetch(this.jsonUrl);
      const data = await response.json();
      this.dataSource = data;
    },
    selectCustomer(e) {
      e.component.byKey(e.currentSelectedRowKeys[0]).done((customer) => {
        if (customer) {
          this.selectedCustomer = customer;
        }
      });
    },
    exportToExcel() {
      const grid = this.$refs.dataGrid.instance;  // Access grid instance
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('DataGrid');
  
      exportDataGrid({
        component: grid,
        worksheet: worksheet,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        });
      });
    },
    exportToPdf() {
      const grid = this.$refs.dataGrid.instance;  // Access grid instance
      const doc = new jsPDF();
  
      exportDataGridPdf({
        jsPDFDocument: doc,
        component: grid,
        indent: 5,
      }).then(() => {
        doc.save('DataGrid.pdf');
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
#dataGrid {
  height: 500px;
}
</style>
