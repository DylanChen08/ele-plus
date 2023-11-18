<template>
  <div style="height: 400px">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
            :columns="columns"
            :data="data"
            :width="width"
            :height="height"
            fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>


<script setup>
// Import necessary Vue features
import { ref, unref } from 'vue';
import { ElCheckbox } from 'element-plus';

// Define the functional component
const SelectionCell = ({
                         value,
                         intermediate = false,
                         onChange,
                       }) => {
  // return (
  //     // Render the ElCheckbox component
  //     ElCheckbox({
  //       onChange,
  //       modelValue: value,
  //       indeterminate: intermediate,
  //     })
  // );
};

// Generate columns function
const generateColumns = (length = 10, prefix = 'column-', props) =>
    Array.from({ length }).map((_, columnIndex) => ({
      ...(props || {}),
      key: `${prefix}${columnIndex}`,
      dataKey: `${prefix}${columnIndex}`,
      title: `Column ${columnIndex}闪`,
      width: 150,
    }));

// Generate data function
const generateData = (
    columns,
    length = 200,
    prefix = 'row-'
) =>
    Array.from({ length }).map((_, rowIndex) => {
      return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            checked: false,
            parentId: null,
          }
      );
    });

// Define columns
const columns = generateColumns(10);
columns.unshift({
  key: 'selection',
  width: 50,
  cellRenderer: ({ rowData }) => {
    const onChange = (value) => (rowData.checked = value);
    return SelectionCell({ value: rowData.checked, onChange });
  },

  headerCellRenderer: () => {
    const _data = unref(data);
    const onChange = (value) =>
        (data.value = _data.map((row) => {
          row.checked = value;
          return row;
        }));
    const allSelected = _data.every((row) => row.checked);
    const containsChecked = _data.some((row) => row.checked);

    return SelectionCell({
      value: allSelected,
      intermediate: containsChecked && !allSelected,
      onChange,
    });
  },
});

// Define the data ref
const data = ref(generateData(columns, 200));

// Export the components and data


</script>
