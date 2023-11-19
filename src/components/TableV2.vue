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
import {h, onMounted, ref, unref} from 'vue';
import {response} from "./response.js";
import {ElButton} from "element-plus";

const SelectionCell = ({value, intermediate = false, onChange}) => {
  // ... (unchanged)
};
const generateColumns = (length = 10, prefix = 'column-', props, columnConfigs) =>
    Array.from({ length }).map((_, columnIndex) => {
      const columnConfig = columnConfigs[columnIndex] || {};
      const columnWidth = columnConfig.width || 150;

      return {
        ...(props || {}),
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: columnConfig.title || `Column ${columnIndex}`,
        width: columnWidth,
        cellRenderer: ({ rowData }) => {
          if (columnConfig.render) {
            // Call the provided render function for column logic
            return columnConfig.render(rowData);
          }

          // Check if the column is a button column
          if (columnConfig.isButtonColumn) {
            // Render buttons based on the specified buttons in the configuration
            const buttons = columnConfig.buttons.map((button, index) => {
              return h(ElButton, {
                type: button.type || 'success',
                size: button.size || 'mini',
                onClick: () => button.onClick(rowData),
                key: index,
              }, button.label);
            });

            return h('div', buttons);
          }

          // Default: render the text content
          return rowData[`${prefix}${columnIndex}`];
        },
      };
    });

// Add your button logic here
const handleCustomButton = (rowData) => {
  // Implement custom button logic
  console.log('Custom Button Clicked:', rowData);
};

const columns = generateColumns(7, 'column-', {}, {
  3: {
    width: 200,
    title: '自定义标题',
    render: (rowData) => {
      return rowData['passImage'];
    },
  },
  4: {
    width: 150,
    title: '自定义图片标题',
    render: (rowData) => {
      const imageUrl = rowData['passImage'];
      return h('div', { style: 'max-width: 100%; max-height: 100px; overflow: hidden;' }, ()=>[
        h('img', { src: imageUrl, alt: 'Image', style: 'width: 100%; height: auto;' })
      ]);
    },
  },
  // Configure the button column with custom buttons
  6: {
    isButtonColumn: true,
    buttons: [
      {
        label: '删除',
        type: 'danger',
        size: 'small',
        onClick: (rowData) => {
          // Implement delete logic
          console.log('Delete:', rowData);
        },
      },
      {
        label: '编辑',
        type: 'primary',
        size: 'small',
        onClick: (rowData) => {
          // Implement edit logic
          console.log('Edit:', rowData);
        },
      },
      // Add more buttons as needed
      {
        label: '自定义按钮',
        type: 'warning',
        size: 'small',
        onClick: handleCustomButton,
      },
    ],
  },
});




columns.unshift({
  key: 'selection',
  width: 50,
  cellRenderer: ({rowData}) => {
    const onChange = (value) => (rowData.checked = value);
    return SelectionCell({value: rowData.checked, onChange});
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

const data = ref([]);

const fetchData = async () => {
  try {
    // Fetch data from your backend API
    // const response = await fetch('your_backend_api_url');
    // const responseData = await response.json(); // Assuming the response is in JSON format
    data.value = response.data; // Update the data with the actual backend response

    console.log('data:', data.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

</script>
