/**
 * 使用表格列拖拽
 * @param columns
 */
export default (columnsProp) => {
    // self: 用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
    let self,tableX,table,headerCell

    // 移除事件
    const setEventNull = () => headerCell.onmouseup = headerCell.onmousedown = headerCell.onmousemove = null

    columnsProp.forEach(item => item.customHeaderCell = (columns) => ({
        onmouseenter: () => {
            headerCell = columns.title[0].el.closest('th')
            table ??= headerCell.closest('.ant-table-wrapper')
            tableX ??= table.clientWidth
            // console.log(headerCell, 'columns')
            headerCell.onmousemove = function(event) {
                if (event.offsetX > this.offsetWidth - 10) {
                    this.style.cursor = 'col-resize';
                } else {
                    this.style.cursor = 'default';
                }
                if (self == undefined) {
                    self = this;
                }
                if (self.mouseDown != null && self.mouseDown == true) {
                    self.style.cursor = 'default';
                    if (self.oldWidth + (event.x - self.oldX) > 0) {
                        self.width = self.oldWidth + (event.x - self.oldX);
                    }
                    self.style.width = self.width;
                    table.style.width = tableX + (event.x - self.oldX) + 'px';
                    self.style.cursor = 'col-resize';
                }
            }
            headerCell.onmousedown = function(event) {
                self = this;
                if (event.offsetX > self.offsetWidth - 10) {
                    self.mouseDown = true;
                    self.oldX = event.x;
                    self.oldWidth = self.offsetWidth;
                }
            }
            headerCell.onmouseup = setEventNull
            table.onmouseup = function() {
                setEventNull()
                if (self == undefined) {
                    self = this;
                }
                self.mouseDown = false;
                self.style.cursor = 'default';
                tableX = table.clientWidth;
            }
        },
        onmouseup: () => setEventNull
    }))
}
