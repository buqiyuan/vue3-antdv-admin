import { type PropType, defineComponent, ref, computed, watchEffect } from 'vue';
import { Image, type ImageProps } from 'ant-design-vue';
import { imageProps } from 'ant-design-vue/lib/image';
import { type ImagePreviewType } from 'ant-design-vue/lib/vc-image/src/Image';
import { omit } from 'lodash-es';

interface PreviewType extends ImagePreviewType {
  src?: string; // V4.10.0
}

export default defineComponent({
  props: {
    ...imageProps,
    preview: {
      type: Object as PropType<PreviewType | boolean>,
    },
  },
  setup(props) {
    const previewRef = ref<PreviewType>({
      visible: false,
      onVisibleChange: (visible: boolean) => {
        previewRef.value.visible = visible;
      },
    });

    watchEffect(() => {
      if (typeof props.preview == 'object' && props.preview.src) {
        previewRef.value.src = props.preview.src;
      }
    });

    const showPreviewImage = () => {
      if (typeof props.preview == 'object' && props.preview.src) {
        previewRef.value.src = props.preview.src;
        previewRef.value.visible = true;
      }
    };

    const previewIsObj = computed(() => {
      return typeof props.preview == 'object' && Reflect.has(props.preview, 'src');
    });

    const preview = computed(() => {
      if (typeof props.preview == 'object' && Reflect.has(props.preview, 'src')) {
        console.log('props.preview a', props.preview);
        return omit(props.preview, 'src') as ImageProps['preview'];
      }
      return props.preview as ImageProps['preview'];
    });

    return () => (
      <div class="relative">
        <Image {...props} preview={previewIsObj.value ? false : preview.value} />
        {previewIsObj.value && (
          <div
            class="absolute inset-0 z-10 overflow-hidden cursor-zoom-in opacity-0"
            onClick={showPreviewImage}
          >
            {Array.isArray(previewRef.value.src) ? (
              <Image.PreviewGroup preview={omit(previewRef.value, 'src') as ImageProps['preview']}>
                {previewRef.value.src.map((n) => (
                  <Image key={n} src={n} />
                ))}
              </Image.PreviewGroup>
            ) : (
              <Image
                {...props}
                preview={omit(previewRef.value, 'src') as ImageProps['preview']}
                src={previewRef.value.src}
              />
            )}
          </div>
        )}
      </div>
    );
  },
});
