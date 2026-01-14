import { _ as __nuxt_component_0 } from './NuxtLinkLocale-DmGAte1S.mjs';
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useI18n, u as useHead } from './server.mjs';
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
import './nuxt-link-BBhlMJ_Y.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({
      meta: [{ property: "og:title", content: t("metaAbout") }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLinkLocale = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "p-10 text-center" }, _attrs))}><h2 class="text-3xl font-semibold mb-4">${ssrInterpolate(_ctx.$t("about"))}</h2>`);
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/",
        class: "underline text-blue-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← ${ssrInterpolate(_ctx.$t("hero"))}`);
          } else {
            return [
              createTextVNode("← " + toDisplayString(_ctx.$t("hero")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-DvySQdIr.mjs.map
