import { _ as __nuxt_component_0 } from './NuxtImg-QJvglC0I.mjs';
import { computed, mergeProps, unref, defineComponent, ref, useTemplateRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { a as useI18n } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FaqBox",
  __ssrInlineRender: true,
  props: {
    title: {},
    text: {}
  },
  setup(__props) {
    const more = ref(false);
    const content = useTemplateRef("content");
    const height = computed(() => {
      const el = content.value?.offsetHeight || 0;
      return el;
    });
    const heightClass = computed(() => {
      const opened = height.value + 8;
      if (more.value) {
        return `height: ${opened}px;`;
      } else {
        return "height: 0px;";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col border rounded-tl-xl rounded-br-xl border-primary/20 dark:border-gray-200 p-4 md:p-6 z-10" }, _attrs))}><button class="flex justify-between cursor-pointer items-center"><div class="w-auto"><h3 class="text-primary dark:text-white font-bold">${ssrInterpolate(__props.title)}</h3></div><div class="${ssrRenderClass([unref(more) ? "rotate-135" : "  rotate-0", "w-auto z-10 cursor-pointer text-secondary transition-all duration-300 ease-linear"])}"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="relative block flex-none w-4 h-4" viewBox="0 0 16 16"><path d="M16 7H9V0H7V7H0V9H7V16H9V9H16V7Z" fill="currentColor"></path></svg></div></button><div class="w-full transition-all duration-300 overflow-hidden ease-linear" style="${ssrRenderStyle(unref(heightClass))}"><div class="${ssrRenderClass([!__props.text || __props.text == "" ? "" : "pt-6", "w-full"])}"><div class="text-sm md:text-base text-primary dark:text-white">${ssrInterpolate(__props.text)}</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FaqBox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "FaqBox" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { tm, t } = useI18n();
    const faqItems = computed(() => {
      const raw = tm("faq.items");
      if (!Array.isArray(raw)) return [];
      return raw.map((_, index) => ({
        question: t(`faq.items.${index}.question`),
        answer: t(`faq.items.${index}.answer`)
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_FaqBox = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "w-full max-w-full",
        role: "main"
      }, _attrs))}><section class="w-full max-w-full" dir="ltr"><div class="w-full max-w-7xl flex justify-between mx-auto items-center py-16 px-6 flex-col md:flex-row">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/hero.webp",
        alt: "Home Hero Image",
        class: "w-full h-auto object-fit max-w-full md:max-w-1/2 md:max-2/3",
        loading: "eager",
        fetchpriority: "high",
        width: "712",
        height: "712",
        preload: "",
        sizes: "\r\n    (max-width: 640px) 100vw,\r\n    (max-width: 1024px) 80vw,\r\n    712px\r\n  ",
        placeholder: ""
      }, null, _parent));
      _push(`<div class="text-primary dark:text-white md:pl-6 text-left rtl:text-right mt-6 md:mt-0"><h1 class="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 dark:text-white rtl:md:leading-20">${ssrInterpolate(_ctx.$t("heroTitle"))}</h1><p class="text-md md:text-xl lg:text-2xl mb-8 dark:text-white">${ssrInterpolate(_ctx.$t("heroSubtitle"))}</p></div></div><div id="services" class="text-primary dark:text-white max-w-7xl mx-auto px-6"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dignissimos facere, maxime labore delectus omnis quae. Excepturi similique modi ipsam quaerat, officia harum numquam, asperiores, consectetur consequatur corporis autem itaque. Doloremque maiores, hic expedita atque nostrum autem! Error possimus unde cupiditate aut qui incidunt repudiandae deleniti ducimus, velit nostrum adipisci architecto hic totam labore voluptate excepturi quod, in vero commodi nam, cum veritatis? Unde possimus quaerat esse labore voluptatum quidem cumque ex dolorem debitis deserunt. Ex perferendis dignissimos sit dolorum deleniti rerum doloribus corporis fugiat in neque maxime molestiae minus assumenda dolor voluptatum, suscipit voluptate omnis beatae cum quasi impedit, consequuntur eum est pariatur? Magni tenetur eaque necessitatibus voluptatibus, voluptate, beatae distinctio nisi, ut quas in ullam! Modi facilis doloremque quas praesentium rem consequatur consequuntur velit quo? Mollitia modi doloremque officia quae voluptate impedit illo quo distinctio, adipisci placeat incidunt aliquam fugit, beatae cupiditate laudantium provident praesentium non quis nulla minima dolores itaque excepturi omnis repellendus. Perferendis autem esse ratione, eaque inventore doloremque sed dicta distinctio, nisi, rerum delectus! Nisi, fuga soluta dolore distinctio voluptatem beatae doloribus ullam accusantium aut architecto voluptates inventore eius voluptatibus, eligendi alias excepturi temporibus porro illo amet fugit. Vero consectetur nihil accusamus velit expedita quaerat similique maxime architecto? Natus reprehenderit aliquam, facilis cupiditate ipsum ad quod dolorem culpa porro qui temporibus rerum delectus reiciendis provident dolor perspiciatis, dignissimos possimus animi. Ea laboriosam nemo nostrum a reprehenderit repudiandae. Aperiam harum ipsum velit dolor cumque veniam quasi voluptatem numquam rerum molestias, quis minima impedit, ullam blanditiis quos perspiciatis illum obcaecati sed sapiente fugit, dolores quaerat pariatur ipsam! Laudantium deserunt quos adipisci earum officia? Voluptatem placeat officia tempore excepturi consequatur, sequi explicabo rem dolorum, expedita, aperiam voluptate. Minima atque molestias perspiciatis inventore. Ipsam quam nam fugiat, quidem voluptas a hic assumenda reiciendis neque labore pariatur, accusantium impedit molestiae! </div><div class="max-w-xl mx-auto mt-20 mb-40 space-y-6 px-6"><h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-primary dark:text-white">${ssrInterpolate(_ctx.$t("faqTitle"))}</h2><!--[-->`);
      ssrRenderList(unref(faqItems), (item, index) => {
        _push(ssrRenderComponent(_component_FaqBox, {
          key: index,
          title: item.question,
          text: item.answer
        }, null, _parent));
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C2OG3-4I.mjs.map
