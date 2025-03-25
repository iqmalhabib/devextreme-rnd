<template>
  <div>
    <h2>Datagrid</h2>
    <dx-data-grid 
      class="dx-card content-block" 
      :data-source="jsonUrl" 
      :show-borders="false"
      :column-auto-width="true"
      @exporting="onExporting"
    >
      <DxExport
        :enabled="true"
        :formats="['pdf']"
      />
      <dx-paging :page-size="10"/>
      <dx-filter-row :visible="true" />
      <dx-pager
        :allowed-page-sizes="pageSizes"
        :show-info="true"
        :show-page-size-selector="true"
        :display-mode="displayMode"
        info-text="Halaman {0} daripada {1} ({2} Kandungan)"
      />
      <DxSearchPanel :visible="true" />
      <!-- Updated columns based on the data from the API -->
      <DxColumn data-field="id" caption="Post ID" :fixed="true"><DxRequiredRule/></DxColumn>
      <DxColumn data-field="title" caption="Title" ><DxRequiredRule/></DxColumn>
      <DxColumn data-field="body" caption="Body" ><DxRequiredRule/></DxColumn>
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
      />
      <DxGrouping :auto-expand-all="expanded" />
      <DxToolbar>
        <DxItem name="groupPanel" />
        <DxItem location="after" template="button-template" />
        <DxItem name="addRowButton" show-text="always" />
        <DxItem name="exportButton" />
        <DxItem name="columnChooserButton" />
        <DxItem name="searchPanel" />
      </DxToolbar>
      <template #button-template>
        <DxButton
          :text="expanded ? 'Collapse All' : 'Expand All'"
          :width="136"
          @click="expanded = !expanded"
        />
      </template>
    </dx-data-grid>
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';

import { 
  DxButton, DxColumn, DxDataGrid, DxEditing, DxExport, DxFilterRow, DxGrouping, DxItem, 
  DxPager, DxPaging, DxRequiredRule, DxSearchPanel, DxToolbar 
} from 'devextreme-vue/data-grid';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxSearchPanel,
    DxRequiredRule,
    DxEditing,
    DxGrouping,
    DxToolbar,
    DxItem,
    DxButton,
    DxPaging,
    DxPager,
    DxExport
  },
  data() {
    return {
      jsonUrl: 'https://jsonplaceholder.typicode.com/posts',
      expanded: true,
      displayMode: 'compact',
      pageSizes: [5, 10, 25, 50]
    };
  },
  methods: {
    // The 'onExporting' method is now inside 'methods'
    onExporting(e) {
      const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5
        
      }).then(() => {
        doc.save('test.pdf');
      });
    }
  }
};
</script>

<style lang="scss">
.dx-datagrid-filter-row {
  background-color: transparent;
}
</style>
