import { nextTick } from 'vue';
import { isFunction } from '@/utils/is';

interface CalculateParams {
  /** 表格实例 */
  tableRef: any;
  /** 数据源 */
  dataSource: any[];
  /** 表格列的配置描述 */
  columns: any[];
  /** 合计显示文本 */
  sumText: string;
  /** 合计行计算方法 */
  summaryFunc?: (params: { dataSource: any[]; columns: any[] }) => string[];
}

/**
 * 表格尾部合计行
 */
export const useCalculate = () => {
  let tr: HTMLTableRowElement;

  const setCalculateRow = async (params: CalculateParams) => {
    await nextTick();
    const { tableRef, dataSource = [], columns = [], sumText, summaryFunc } = params;
    if (!dataSource.length) return;
    const tbody = tableRef.value.$el.querySelector('.ant-table-tbody') as HTMLTableSectionElement;
    if (!tr) {
      tr = tbody.lastElementChild?.cloneNode(true) as HTMLTableRowElement;
      tr.style.backgroundColor = '#f8f8f9';
      tr.style.position = 'sticky';
      tr.style.zIndex = '999';
      tr.style.bottom = '0';
      tr.setAttribute('data-row-key', String(Math.random()));
    }
    // 渲染单元格
    const renderCol = (colEls?: HTMLTableCellElement[]) => {
      // 如果有传进自定义合计行渲染方法
      if (isFunction(summaryFunc)) {
        const result = summaryFunc({ dataSource, columns });
        [...tr.children].forEach((item: HTMLTableCellElement, index) => {
          item.textContent = result[index];
          item.style.backgroundColor = 'inherit';
        });
      } else {
        // 没有自定义合计行方法就默认渲染囖
        const lastData = Object.keys(dataSource[0]).reduce((prev, key) => {
          const count = dataSource.map((n) => n[key]).reduce((p, c) => c + p, 0);
          prev[key] = isNaN(Number(count)) ? 'N/A' : count;
          return prev;
        }, {});
        const columnKeys = columns.map((item) => item.dataIndex ?? item.key);
        [...tr.children].forEach((item: HTMLTableCellElement, index) => {
          if (index == 0) {
            item.textContent = sumText;
          } else {
            item.textContent = lastData[columnKeys[index]];
          }
          item.style.backgroundColor = 'inherit';
        });
      }
      if (colEls?.length) {
        [...tr.children].forEach((item: HTMLTableCellElement, index) => {
          Object.keys(colEls[index].style || []).forEach((key) => {
            const styleKey = colEls[index].style[key];
            item.style[styleKey] = colEls[index].style[styleKey];
            item.className = colEls[index].className;
          });
        });
      }
    };

    renderCol();

    if (!tbody.contains(tr)) {
      tbody.appendChild(tr);
      setTimeout(() => {
        const colEls =
          tableRef.value.$el.querySelector('.ant-table-tbody')?.firstElementChild?.children;
        colEls && renderCol([...colEls] as HTMLTableCellElement[]);
      }, 100);
    }
  };

  return { setCalculateRow };
};
