import {nextTick, onBeforeUnmount, onMounted, ref, SetupContext, watch} from "vue";
import {getTransitionProps} from "ant-design-vue/lib/_util/transition";
import {debounce} from "@/utils/lodashChunk";

export default function useModal (props, {emit, attrs}: SetupContext) {
    const dragRef = ref<any>(null);
    const modalWrapRef = ref<any>(null);
    const modalBody = ref<any>(null);
    const modalFooter = ref<any>(null);
    const titleRef = ref<any>(null);
    const resizeLRef = ref<any>(null);
    const resizeTRef = ref<any>(null);
    const resizeRRef = ref<any>(null);
    const resizeBRef = ref<any>(null);
    const resizeLTRef = ref<any>(null);
    const resizeTRRef = ref<any>(null);
    const resizeBRRef = ref<any>(null);
    const resizeLBRef = ref<any>(null);
    const minRef = ref<any>(null);
    const maxRef = ref<any>(null);
    const revertRef = ref<any>(null);

    const mousePosition = {x: 0, y: 0}
    // 获取鼠标点击位置
    const getClickPosition = (e: MouseEvent) => Object.assign(mousePosition, {x: e.pageX, y: e.pageY})

    document.documentElement.addEventListener('click', getClickPosition, true)

    // 遮罩层动画
    const maskTransitionProps = getTransitionProps('fade');
    // 弹窗动画
    const dialogTransitionProps = getTransitionProps('zoom', {
        onAfterLeave: () => emit('update:visible', false),
    });

    // 最小可调整的宽高
    const dragMinHeight = 140
    const dragMinWidth = 400
    // 弹窗原始位置，用于放大后恢复到原来的位置大小
    let modalWidth,modalHeight,modalLeft,modalTop
    // 头部标题高度、底部高度
    let headerHeight, footerHeight = 0

    function drag(oDrag, handle) {
        let disX = 0;
        const dixY = 0;
        handle = handle || oDrag;
        handle.style.cursor = "move";
        handle.onmousedown = function (event) {
            disX = event.clientX - oDrag.offsetLeft;
            const disY = event.clientY - oDrag.offsetTop;

            const mousemove = (event) => {
                let iL = event.clientX - disX;
                let iT = event.clientY - disY;
                const maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                const maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

                iL <= 0 && (iL = 0);
                iT <= 0 && (iT = 0);
                iL >= maxL && (iL = maxL);
                iT >= maxT && (iT = maxT);

                oDrag.style.left = iL + "px";
                oDrag.style.top = iT + "px";

                return false
            }

            const mouseup = () => {
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseup)
            }

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
            return false
        };
        //最大化按钮
        maxRef.value.onclick = function () {
            const {left,top} = getComputedStyle(oDrag)
            const {width,height} = getComputedStyle(modalBody.value)
            console.log({width,height,left,top})
            // 最大化时，保存原来的位置大小
            modalWidth = width
            modalHeight = height
            modalLeft = left
            modalTop = top
            oDrag.style.top = oDrag.style.left = 0;
            oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
            oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
            modalBody.value.style.width = oDrag.style.width
            modalBody.value.style.height = parseFloat(oDrag.style.height) - headerHeight - footerHeight + 'px'
            this.style.display = "none";
            revertRef.value.style.display = "block";
        };
        //还原按钮
        revertRef.value.onclick = function () {
            modalBody.value.style.height = modalHeight
            modalBody.value.style.width = modalWidth
            oDrag.style.width = oDrag.style.height = 'unset'
            // oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
            // oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
            oDrag.style.left = modalLeft
            oDrag.style.top = modalTop
            this.style.display = "none";
            maxRef.value.style.display = "block";
        };

    }

    function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
        handle.onmousedown = function (event) {
            const disX = event.clientX - handle.offsetLeft;
            const disY = event.clientY - handle.offsetTop;
            const iParentTop = oParent.offsetTop;
            const iParentLeft = oParent.offsetLeft;
            const iParentWidth = oParent.offsetWidth;
            const iParentHeight = oParent.offsetHeight;

            const mousemove = (event) => {
                const iL = event.clientX - disX;
                const iT = event.clientY - disY ;
                const maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
                const maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
                let iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                let iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;

                isLeft && (oParent.style.left = iParentLeft + iL + "px");
                isTop && (oParent.style.top = iParentTop + iT + "px");

                iW < dragMinWidth && (iW = dragMinWidth);
                iW > maxW && (iW = maxW);
                lockX || (modalBody.value.style.width = iW + "px");

                iH < dragMinHeight && (iH = dragMinHeight);
                iH > maxH && (iH = maxH);
                lockY || (modalBody.value.style.height = iH - footerHeight - headerHeight + "px");

                if ((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
                if (isLeft || isTop) document.onmousemove = null;

                return false;
            }

            const mouseup = () => {
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseup)
            }

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
            return false;
        }
    }

    const initWin = () => {
        // 注册拖拽
        drag(dragRef.value, titleRef.value);
        //四角
        resize(dragRef.value, resizeLTRef.value, true, true, false, false);
        resize(dragRef.value, resizeTRRef.value, false, true, false, false);
        resize(dragRef.value, resizeBRRef.value, false, false, false, false);
        resize(dragRef.value, resizeLBRef.value, true, false, false, false);
        //四边
        resize(dragRef.value, resizeLRef.value, true, false, false, true);
        resize(dragRef.value, resizeTRef.value, false, true, true, false);
        resize(dragRef.value, resizeRRef.value, false, false, false, true);
        resize(dragRef.value, resizeBRef.value, false, false, true, false);

        dragRef.value.style.left = (document.documentElement.clientWidth - dragRef.value.offsetWidth) / 2 + "px";
        dragRef.value.style.top = props.centered ? (document.documentElement.clientHeight - dragRef.value.offsetHeight) / 2 + "px" : '100px';

        // 模态框的位置
        const {left, top} = dragRef.value.getBoundingClientRect()
        // 鼠标点击的位置
        const {x,y} = mousePosition
        // 设置弹出的位置
        modalWrapRef.value.style.transformOrigin = `${x - left}px ${y - top}px`
    }

    const debounced = debounce(initWin, 30)

    // 关闭弹窗
    const closeModal = () => {
        emit('update:visible', false)
    }

    onMounted(() => {
        watch(() => props.visible, value => {
            if (value) {
                nextTick(() => {
                    headerHeight = titleRef.value?.offsetHeight || 0
                    footerHeight = modalFooter.value?.offsetHeight || 0
                    initWin()
                })
                window.addEventListener('resize', debounced)
            }
        }, {immediate: true})
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', debounced)
        document.documentElement.removeEventListener('click', getClickPosition, true)
        debounced.cancel
        console.log('弹窗销毁了')
    })

    return {
        dragRef,
        modalWrapRef,
        modalBody,
        modalFooter,
        titleRef,
        resizeLRef,
        resizeTRef,
        resizeRRef,
        resizeBRef,
        resizeLTRef,
        resizeTRRef,
        resizeBRRef,
        resizeLBRef,
        minRef,
        maxRef,
        revertRef,
        maskTransitionProps,
        dialogTransitionProps,
        closeModal
    }
}
