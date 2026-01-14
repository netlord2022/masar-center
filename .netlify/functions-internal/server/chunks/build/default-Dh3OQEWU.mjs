import { computed, defineComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, renderSlot, inject, reactive, provide, ref, useTemplateRef, mergeProps, toValue, watch, useSSRContext } from 'vue';
import { c as useRoute, a as useI18n, d as useLocaleHead, _ as _export_sfc, u as useHead, b as useState } from './server.mjs';
import { _ as __nuxt_component_0 } from './NuxtLinkLocale-DmGAte1S.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-QJvglC0I.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0$2 } from './nuxt-link-BBhlMJ_Y.mjs';
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

const HeadComponentCtxSymbol = /* @__PURE__ */ Symbol("head-component");
const TagPositionProps = {
  /**
   * @deprecated Use tagPosition
   */
  body: { type: Boolean, default: void 0 },
  tagPosition: { type: String }
};
const normalizeProps = (_props) => {
  const props = Object.fromEntries(
    Object.entries(_props).filter(([_, value]) => value !== void 0)
  );
  if (typeof props.body !== "undefined") {
    props.tagPosition = props.body ? "bodyClose" : "head";
  }
  if (typeof props.renderPriority !== "undefined") {
    props.tagPriority = props.renderPriority;
  }
  return props;
};
function useHeadComponentCtx() {
  return inject(HeadComponentCtxSymbol, createHeadComponentCtx, true);
}
function createHeadComponentCtx() {
  const prev = inject(HeadComponentCtxSymbol, null);
  if (prev) {
    return prev;
  }
  const input = reactive({});
  const entry = useHead(input);
  const ctx = { input, entry };
  provide(HeadComponentCtxSymbol, ctx);
  return ctx;
}
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: { type: [String, Object, Array], default: void 0 },
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: { type: [String, Object, Array], default: void 0 },
  tabindex: String,
  title: String,
  translate: String,
  /**
   * @deprecated Use tagPriority
   */
  renderPriority: [String, Number],
  /**
   * Unhead prop to modify the priority of the tag.
   */
  tagPriority: { type: [String, Number] }
};
defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    title: String
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.noscript ||= [];
    const idx = input.noscript.push({}) - 1;
    return () => {
      const noscript = normalizeProps(props);
      const slotVnodes = slots.default?.();
      const textContent = [];
      if (slotVnodes) {
        for (const vnode of slotVnodes) {
          if (vnode.children) {
            textContent.push(vnode.children);
          }
        }
      }
      if (textContent.length > 0) {
        noscript.innerHTML = textContent.join("");
      }
      input.noscript[idx] = noscript;
      return null;
    };
  }
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    /** @deprecated **/
    methods: String,
    /** @deprecated **/
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.link ||= [];
    const idx = input.link.push({}) - 1;
    return () => {
      input.link[idx] = normalizeProps(props);
      return null;
    };
  }
});
defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.base = normalizeProps(props);
      return null;
    };
  }
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup(_, { slots }) {
    const { input } = useHeadComponentCtx();
    return () => {
      const defaultSlot = slots.default?.();
      input.title = defaultSlot?.[0]?.children ? String(defaultSlot?.[0]?.children) : void 0;
      return null;
    };
  }
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    property: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.meta ||= [];
    const idx = input.meta.push({}) - 1;
    return () => {
      const meta = { "http-equiv": props.httpEquiv, ...normalizeProps(props) };
      if ("httpEquiv" in meta) {
        delete meta.httpEquiv;
      }
      input.meta[idx] = meta;
      return null;
    };
  }
});
defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    /** @deprecated **/
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.style ||= [];
    const idx = input.style.push({}) - 1;
    return () => {
      const style = normalizeProps(props);
      const textContent = slots.default?.()?.[0]?.children;
      if (textContent) {
        input.style[idx] = style;
        style.textContent = textContent;
      }
      return null;
    };
  }
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => {
    createHeadComponentCtx();
    return () => ctx.slots.default?.();
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.htmlAttrs = { ..._props, ...ctx.attrs };
      return ctx.slots.default?.();
    };
  }
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.bodyAttrs = { ..._props, ...ctx.attrs };
      return ctx.slots.default?.();
    };
  }
});
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const isDark = computed({
      get() {
        return colorMode.value === "dark";
      },
      set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "transition-colors duration-150 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg h-6 w-6 text-center flex items-center justify-center" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        style: unref(isDark) !== true ? null : { display: "none" },
        src: "/moon-outline.svg",
        alt: "moon Icon",
        class: "h-4 w-4 text-black",
        width: "16",
        height: "16"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtImg, {
        style: unref(isDark) === true ? null : { display: "none" },
        src: "/sunny-outline.svg",
        alt: "sunny Icon",
        class: "h-4 w-4 text-white invert",
        width: "16",
        height: "16"
      }, null, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeToggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$4, { __name: "ThemeToggle" });
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function watchImmediate(source, cb, options) {
  return watch(source, cb, {
    ...options,
    immediate: true
  });
}
const defaultWindow = void 0;
function unrefElement(elRef) {
  var _$el;
  const plain = toValue(elRef);
  return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  return watchImmediate(() => {
    var _firstParamTargets$va, _firstParamTargets$va2;
    return [
      (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
    if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
    const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
    const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
    onCleanup(() => {
      cleanups.forEach((fn) => fn());
    });
  }, { flush: "post" });
}
function onClickOutside(target, handler, options = {}) {
  const { window: window$1 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
  if (!window$1) return controls ? {
    stop: noop,
    cancel: noop,
    trigger: noop
  } : noop;
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target$1) => {
      if (typeof target$1 === "string") return Array.from(window$1.document.querySelectorAll(target$1)).some((el) => el === event.target || event.composedPath().includes(el));
      else {
        const el = unrefElement(target$1);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  function hasMultipleRoots(target$1) {
    const vm = toValue(target$1);
    return vm && vm.$.subTree.shapeFlag === 16;
  }
  function checkMultipleRoots(target$1, event) {
    const vm = toValue(target$1);
    const children = vm.$.subTree && vm.$.subTree.children;
    if (children == null || !Array.isArray(children)) return false;
    return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
  }
  const listener = (event) => {
    const el = unrefElement(target);
    if (event.target == null) return;
    if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event)) return;
    if (!el || el === event.target || event.composedPath().includes(el)) return;
    if ("detail" in event && event.detail === 0) shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window$1, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, {
      passive: true,
      capture
    }),
    useEventListener(window$1, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window$1, "blur", (event) => {
      setTimeout(() => {
        var _window$document$acti;
        const el = unrefElement(target);
        if (((_window$document$acti = window$1.document.activeElement) === null || _window$document$acti === void 0 ? void 0 : _window$document$acti.tagName) === "IFRAME" && !(el === null || el === void 0 ? void 0 : el.contains(window$1.document.activeElement))) handler(event);
      }, 0);
    }, { passive: true })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  if (controls) return {
    stop,
    cancel: () => {
      shouldListen = false;
    },
    trigger: (event) => {
      shouldListen = true;
      listener(event);
      shouldListen = false;
    }
  };
  return stop;
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LangSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locales, locale } = useI18n();
    const open = ref(false);
    const flags = computed(() => {
      return [
        { code: "en", src: "/gb.svg" },
        { code: "ar", src: "/sy.svg" },
        { code: "de", src: "/de.svg" }
      ];
    });
    const imgSrc = computed(() => {
      const flag = flags.value.find((f) => f.code === locale.value);
      return flag ? flag.src : "";
    });
    const menu = useTemplateRef("menu");
    const close = () => {
      open.value = false;
    };
    onClickOutside(menu, () => close());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<!--[--><div class="relative md:inline-block text-left hidden"><button dir="ltr" aria-haspopup="menu" class="${ssrRenderClass([{ "ring-1": unref(open) }, "flex items-center p-1 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer active:ring-1"])}"${ssrRenderAttr("aria-expanded", unref(open))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: unref(imgSrc),
        alt: "current language",
        class: "h-5 w-5 rounded-sm",
        width: "20",
        height: "20"
      }, null, _parent));
      _push(`<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (unref(open)) {
        _push(`<div class="absolute right-0 rtl:left-0 rtl:right-auto z-50 mt-1 w-28 origin-top-right rounded-md bg-white shadow-lg shadow-black/20 ring-gray-300 ring-1 ring-opacity-5 block focus:outline-none p-2" role="list" tabindex="0"><!--[-->`);
        ssrRenderList(unref(locales), (item, key) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key,
            to: _ctx.$switchLocalePath(item.code),
            class: "text-primary block my-1 w-full h-full hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium",
            dir: "ltr"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: item.img,
                  alt: item.code,
                  class: "h-4 w-4 rounded-sm mt-0.5",
                  width: "16",
                  height: "16"
                }, null, _parent2, _scopeId));
                _push2(`<span class="ml-2"${_scopeId}>${ssrInterpolate(item.name)}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode(_component_NuxtImg, {
                      src: item.img,
                      alt: item.code,
                      class: "h-4 w-4 rounded-sm mt-0.5",
                      width: "16",
                      height: "16"
                    }, null, 8, ["src", "alt"]),
                    createVNode("span", { class: "ml-2" }, toDisplayString(item.name), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative md:hidden text-left flex"><!--[-->`);
      ssrRenderList(unref(locales), (item, key) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key,
          to: _ctx.$switchLocalePath(item.code),
          class: ["flex my-1 hover:bg-gray-100 mx-2 dark:p-1 dark:rounded dark:mx-1 h-5.5 dark:bg-white/80", { "border-b border-primary": item.code === unref(locale) }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: item.img,
                alt: item.code,
                class: "h-5 w-5",
                width: "20",
                height: "20"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center" }, [
                  createVNode(_component_NuxtImg, {
                    src: item.img,
                    alt: item.code,
                    class: "h-5 w-5",
                    width: "20",
                    height: "20"
                  }, null, 8, ["src", "alt"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LangSwitcher.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$3, { __name: "LangSwitcher" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const isOpen = ref(false);
    const linkClass = computed(
      () => "text-neutral hover:text-brand-light text-primary dark:text-white hover:scale-101  transition duration-150 ease-in-out"
    );
    const links = computed(() => [
      {
        name: t("home"),
        path: "/"
      },
      {
        name: t("services"),
        path: { path: "/", hash: "#services" }
      },
      {
        name: t("about"),
        path: "/about"
      }
    ]);
    const target = useTemplateRef("target");
    const ignoreEl = useTemplateRef("ignoreEl");
    const close = () => {
      isOpen.value = false;
    };
    onClickOutside(target, () => close(), { ignore: [ignoreEl] });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLinkLocale = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_ThemeToggle = __nuxt_component_2;
      const _component_LangSwitcher = __nuxt_component_3;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: "bg-white shadow-md sticky top-0 z-50 dark:bg-dark dark:text-white",
        role: "banner"
      }, _attrs))} data-v-1fd73f8f><div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-primary dark:border-secondary/20 md:border-none" data-v-1fd73f8f><button aria-label="Open menu" class="${ssrRenderClass([{ active: isOpen.value }, "flex md:hidden mr-10 focus:outline-none rtl:ml-10 rtl:mr-0 menu-toggle flex-col gap-1"])}" data-v-1fd73f8f><!--[-->`);
      ssrRenderList(3, (i) => {
        _push(`<span class="rounded-xs h-[3px] w-[25px] transition duration-300 ease-in-out bg-primary dark:bg-white" data-v-1fd73f8f></span>`);
      });
      _push(`<!--]--></button>`);
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/",
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="logo-reveal -mr-3 rtl:mr-0 rtl:-ml-3 md:-ml-3 rtl:md:ml-0 rtl:md:-mr-3" data-v-1fd73f8f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/masar-logo.png",
              alt: "Masar logo",
              width: "120",
              height: "40",
              class: "h-10 w-auto",
              loading: "eager",
              decoding: "async",
              densities: "1x 2x",
              quality: 100
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "logo-reveal -mr-3 rtl:mr-0 rtl:-ml-3 md:-ml-3 rtl:md:ml-0 rtl:md:-mr-3" }, [
                createVNode(_component_NuxtImg, {
                  src: "/masar-logo.png",
                  alt: "Masar logo",
                  width: "120",
                  height: "40",
                  class: "h-10 w-auto",
                  loading: "eager",
                  decoding: "async",
                  densities: "1x 2x",
                  quality: 100
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="space-x-6 hidden md:flex" role="navigation" data-v-1fd73f8f><!--[-->`);
      ssrRenderList(links.value, (link, index) => {
        _push(ssrRenderComponent(_component_NuxtLinkLocale, {
          key: index,
          to: link.path,
          class: linkClass.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="hidden md:flex items-center gap-2" data-v-1fd73f8f>`);
      _push(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
      _push(ssrRenderComponent(_component_LangSwitcher, null, null, _parent));
      _push(`</div></div>`);
      if (isOpen.value) {
        _push(`<nav class="md:hidden bg-white dark:bg-dark dark:text-white px-6 pb-4 pt-2 flex flex-col space-y-3 absolute left-0 right-0 w-full z-2 shadow-md dark:shadow-secondary/20" data-v-1fd73f8f><!--[-->`);
        ssrRenderList(links.value, (link, index) => {
          _push(ssrRenderComponent(_component_NuxtLinkLocale, {
            key: index,
            to: link.path,
            class: linkClass.value + " py-2",
            onClick: ($event) => isOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div class="flex items-center gap-2 my-4 pt-4" data-v-1fd73f8f>`);
        _push(ssrRenderComponent(_component_LangSwitcher, null, null, _parent));
        _push(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
        _push(`</div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-1fd73f8f"]]), { __name: "AppHeader" });
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ role: "contentinfo" }, _attrs))} data-v-0afa10b9><div class="bg-dark dark:bg-white" data-v-0afa10b9><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-white dark:text-black" data-v-0afa10b9> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Masar Center. All rights reserved. Images by Freepik. </div></div><div class="fixed z-20 bottom-8 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 rtl:sm:left-auto rtl:sm:right-8 flex flex-col items-center sm:flex-row gap-2 sm:gap-4" data-v-0afa10b9><div class="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2" data-v-0afa10b9><div class="flex group" data-v-0afa10b9><div dir="rtl" class="link-box-item" data-v-0afa10b9><a href="tel:+491771873142" class="flex items-center" data-v-0afa10b9>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/telephone.svg",
    alt: "telephone-icon",
    width: "24",
    loading: "lazy",
    height: "24"
  }, null, _parent));
  _push(`<div dir="rtl" class="text-sm font-medium px-3" data-v-0afa10b9> ‎+491771873142 </div></a></div></div><div class="flex group" data-v-0afa10b9><div class="link-box-item" data-v-0afa10b9><a href="https://wa.me/491771873142" class="flex items-center" target="_blank" data-v-0afa10b9>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/whatsapp.svg",
    alt: "whatsapp-icon",
    width: "24",
    height: "24",
    loading: "lazy"
  }, null, _parent));
  _push(`<span class="text-sm font-medium px-3" data-v-0afa10b9>‎+491771873142</span></a></div></div><div class="flex group" data-v-0afa10b9><div class="link-box-item" data-v-0afa10b9><a href="mailto:info@masar-center.de" class="flex items-center" data-v-0afa10b9>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/email.svg",
    alt: "email-icon",
    width: "24",
    height: "24",
    loading: "lazy"
  }, null, _parent));
  _push(`<span class="text-sm font-medium px-3 whitespace-nowrap" data-v-0afa10b9>info@masar-center.de</span></a></div></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0afa10b9"]]), { __name: "AppFooter" });
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const head = useLocaleHead();
    const title = computed(() => t(route.meta.title));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Link = Link;
      const _component_Meta = Meta;
      const _component_Body = Body;
      const _component_AppHeader = __nuxt_component_6;
      const _component_AppFooter = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Html, {
        lang: unref(head).htmlAttrs.lang,
        dir: unref(head).htmlAttrs.dir
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Masar - ${ssrInterpolate(unref(title))}`);
                      } else {
                        return [
                          createTextVNode("Masar - " + toDisplayString(unref(title)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(head).link, (link) => {
                    _push3(ssrRenderComponent(_component_Link, {
                      id: link.key,
                      rel: link.rel,
                      href: link.href,
                      hreflang: link.hreflang
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--><!--[-->`);
                  ssrRenderList(unref(head).meta, (meta) => {
                    _push3(ssrRenderComponent(_component_Meta, {
                      id: meta.key,
                      property: meta.property,
                      content: meta.content
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("Masar - " + toDisplayString(unref(title)), 1)
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(head).link, (link) => {
                      return openBlock(), createBlock(_component_Link, {
                        key: link.key,
                        id: link.key,
                        rel: link.rel,
                        href: link.href,
                        hreflang: link.hreflang
                      }, null, 8, ["id", "rel", "href", "hreflang"]);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(head).meta, (meta) => {
                      return openBlock(), createBlock(_component_Meta, {
                        key: meta.key,
                        id: meta.key,
                        property: meta.property,
                        content: meta.content
                      }, null, 8, ["id", "property", "content"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Body, { class: "bg-white dark:bg-dark" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppHeader, null, null, _parent3, _scopeId2));
                  _push3(`<svg viewBox="0 0 1440 181" fill="none" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none w-full top-[72px] text-primary dark:text-secondary shrink-0 absolute"${_scopeId2}><mask id="path-1-inside-1_414_5526" fill="white"${_scopeId2}><path d="M0 0H1440V181H0V0Z"${_scopeId2}></path></mask><path d="M0 0H1440V181H0V0Z" fill="url(#paint0_linear_414_5526)" fill-opacity="0.22"${_scopeId2}></path><path d="M0 2H1440V-2H0V2Z" fill="url(#paint1_linear_414_5526)" mask="url(#path-1-inside-1_414_5526)"${_scopeId2}></path><defs${_scopeId2}><linearGradient id="paint0_linear_414_5526" x1="720" y1="0" x2="720" y2="181" gradientUnits="userSpaceOnUse"${_scopeId2}><stop stop-color="currentColor"${_scopeId2}></stop><stop offset="1" stop-color="currentColor" stop-opacity="0"${_scopeId2}></stop></linearGradient><linearGradient id="paint1_linear_414_5526" x1="0" y1="90.5" x2="1440" y2="90.5" gradientUnits="userSpaceOnUse"${_scopeId2}><stop stop-color="currentColor" stop-opacity="0"${_scopeId2}></stop><stop offset="0.395" stop-color="currentColor"${_scopeId2}></stop><stop offset="1" stop-color="currentColor" stop-opacity="0"${_scopeId2}></stop></linearGradient></defs></svg>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(_component_AppFooter, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppHeader),
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 1440 181",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "pointer-events-none w-full top-[72px] text-primary dark:text-secondary shrink-0 absolute"
                    }, [
                      createVNode("mask", {
                        id: "path-1-inside-1_414_5526",
                        fill: "white"
                      }, [
                        createVNode("path", { d: "M0 0H1440V181H0V0Z" })
                      ]),
                      createVNode("path", {
                        d: "M0 0H1440V181H0V0Z",
                        fill: "url(#paint0_linear_414_5526)",
                        "fill-opacity": "0.22"
                      }),
                      createVNode("path", {
                        d: "M0 2H1440V-2H0V2Z",
                        fill: "url(#paint1_linear_414_5526)",
                        mask: "url(#path-1-inside-1_414_5526)"
                      }),
                      createVNode("defs", null, [
                        createVNode("linearGradient", {
                          id: "paint0_linear_414_5526",
                          x1: "720",
                          y1: "0",
                          x2: "720",
                          y2: "181",
                          gradientUnits: "userSpaceOnUse"
                        }, [
                          createVNode("stop", { "stop-color": "currentColor" }),
                          createVNode("stop", {
                            offset: "1",
                            "stop-color": "currentColor",
                            "stop-opacity": "0"
                          })
                        ]),
                        createVNode("linearGradient", {
                          id: "paint1_linear_414_5526",
                          x1: "0",
                          y1: "90.5",
                          x2: "1440",
                          y2: "90.5",
                          gradientUnits: "userSpaceOnUse"
                        }, [
                          createVNode("stop", {
                            "stop-color": "currentColor",
                            "stop-opacity": "0"
                          }),
                          createVNode("stop", {
                            offset: "0.395",
                            "stop-color": "currentColor"
                          }),
                          createVNode("stop", {
                            offset: "1",
                            "stop-color": "currentColor",
                            "stop-opacity": "0"
                          })
                        ])
                      ])
                    ])),
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(_component_AppFooter)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Head, null, {
                default: withCtx(() => [
                  createVNode(_component_Title, null, {
                    default: withCtx(() => [
                      createTextVNode("Masar - " + toDisplayString(unref(title)), 1)
                    ]),
                    _: 1
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(head).link, (link) => {
                    return openBlock(), createBlock(_component_Link, {
                      key: link.key,
                      id: link.key,
                      rel: link.rel,
                      href: link.href,
                      hreflang: link.hreflang
                    }, null, 8, ["id", "rel", "href", "hreflang"]);
                  }), 128)),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(head).meta, (meta) => {
                    return openBlock(), createBlock(_component_Meta, {
                      key: meta.key,
                      id: meta.key,
                      property: meta.property,
                      content: meta.content
                    }, null, 8, ["id", "property", "content"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_component_Body, { class: "bg-white dark:bg-dark" }, {
                default: withCtx(() => [
                  createVNode(_component_AppHeader),
                  (openBlock(), createBlock("svg", {
                    viewBox: "0 0 1440 181",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "pointer-events-none w-full top-[72px] text-primary dark:text-secondary shrink-0 absolute"
                  }, [
                    createVNode("mask", {
                      id: "path-1-inside-1_414_5526",
                      fill: "white"
                    }, [
                      createVNode("path", { d: "M0 0H1440V181H0V0Z" })
                    ]),
                    createVNode("path", {
                      d: "M0 0H1440V181H0V0Z",
                      fill: "url(#paint0_linear_414_5526)",
                      "fill-opacity": "0.22"
                    }),
                    createVNode("path", {
                      d: "M0 2H1440V-2H0V2Z",
                      fill: "url(#paint1_linear_414_5526)",
                      mask: "url(#path-1-inside-1_414_5526)"
                    }),
                    createVNode("defs", null, [
                      createVNode("linearGradient", {
                        id: "paint0_linear_414_5526",
                        x1: "720",
                        y1: "0",
                        x2: "720",
                        y2: "181",
                        gradientUnits: "userSpaceOnUse"
                      }, [
                        createVNode("stop", { "stop-color": "currentColor" }),
                        createVNode("stop", {
                          offset: "1",
                          "stop-color": "currentColor",
                          "stop-opacity": "0"
                        })
                      ]),
                      createVNode("linearGradient", {
                        id: "paint1_linear_414_5526",
                        x1: "0",
                        y1: "90.5",
                        x2: "1440",
                        y2: "90.5",
                        gradientUnits: "userSpaceOnUse"
                      }, [
                        createVNode("stop", {
                          "stop-color": "currentColor",
                          "stop-opacity": "0"
                        }),
                        createVNode("stop", {
                          offset: "0.395",
                          "stop-color": "currentColor"
                        }),
                        createVNode("stop", {
                          offset: "1",
                          "stop-color": "currentColor",
                          "stop-opacity": "0"
                        })
                      ])
                    ])
                  ])),
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(_component_AppFooter)
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-Dh3OQEWU.mjs.map
