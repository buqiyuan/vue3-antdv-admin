import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { defineComponent } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { describe, expect, it, vi } from "vite-plus/test";
import { setLocale } from "@/locales";
import { i18n } from "@/locales";
import LoginView from "./index.vue";

vi.mock("@/api", () => ({
  default: {
    captcha: {
      captchaCaptchaByImg: vi.fn(async () => ({
        img: '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
        id: "cap-1",
      })),
    },
    auth: { authLogin: vi.fn() },
    account: {
      accountProfile: vi.fn(),
      accountMenu: vi.fn(),
      accountPermissions: vi.fn(),
      accountLogout: vi.fn(),
    },
  },
}));

describe("login page", () => {
  it("renders the sign-in form before the API responds", async () => {
    setLocale("zh-CN");
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/login", name: "Login", component: LoginView },
        { path: "/", component: defineComponent({ template: "<div />" }) },
      ],
    });
    await router.push("/login");
    await router.isReady();

    const wrapper = mount(LoginView, {
      global: { plugins: [createPinia(), router, i18n] },
    });
    await flushPromises();

    expect(wrapper.find('[data-testid="login-page"]').exists()).toBe(true);
    expect((wrapper.get('[data-testid="login-username"]').element as HTMLInputElement).value).toBe(
      "admin",
    );
    expect(wrapper.get('[data-testid="login-submit"]').text()).toContain("登录");
  });
});
