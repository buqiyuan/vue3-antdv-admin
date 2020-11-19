import {defineComponent,SetupContext, PropType} from 'vue'
import {Button} from 'ant-design-vue'
import {ButtonType} from 'ant-design-vue/lib/button/buttonTypes'
import './styles/index.less'

export default defineComponent({
    name: "a-button",
    props: {
        type: {
            type: String as PropType<ButtonType | "warning" | 'success'>,
            default: 'default'
        }
    },
    setup(props, {attrs, slots}: SetupContext) {
        // ant-design-vue 原有的按钮类型
        const buttonTypes = ["default", "primary", "ghost", "dashed", "danger", "link"]

        return () => (
            <Button
                {...attrs}
                type={buttonTypes.includes(props.type) ? props.type as ButtonType : 'default'}
                class={[`ant-btn-${props.type}`]}
            >
                {slots.default ? slots.default() : '默认按钮'}
            </Button>
        )
    }
})

