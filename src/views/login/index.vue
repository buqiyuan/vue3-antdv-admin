<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Languages, Moon, Sun } from "@lucide/vue";
import Api from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/composables/useTheme";
import { setLocale, type AppLocale } from "@/locales";
import { useUserStore } from "@/stores/user";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const user = useUserStore();
const mode = useTheme();

const loading = ref(false);
const captcha = ref("");
const captchaError = ref("");
const form = reactive({
  username: "admin",
  password: "a123456",
  verifyCode: "",
  captchaId: "",
});

function captchaSrc(img: string) {
  if (!img) return "";
  if (img.startsWith("data:") || img.startsWith("http")) return img;
  if (img.trim().startsWith("<svg")) return `data:image/svg+xml;utf8,${encodeURIComponent(img)}`;
  return img;
}

async function updateCaptcha() {
  captchaError.value = "";
  try {
    const data = await Api.captcha.captchaCaptchaByImg(
      { width: 120, height: 40 },
      { showErrorMsg: false },
    );
    captcha.value = captchaSrc(data.img);
    form.captchaId = data.id;
  } catch {
    captcha.value = "";
    form.captchaId = "";
    captchaError.value = t("login.captchaFailed");
  }
}

async function submit() {
  if (!form.username.trim()) return toast.error(t("login.usernameRequired"));
  if (!form.password.trim()) return toast.error(t("login.passwordRequired"));
  if (!form.verifyCode.trim()) return toast.error(t("login.captchaRequired"));

  loading.value = true;
  try {
    await user.login({ ...form });
    toast.success(t("login.success"));
    const redirect =
      typeof route.query.redirect === "string" &&
      route.query.redirect.startsWith("/") &&
      !route.query.redirect.startsWith("//")
        ? route.query.redirect
        : "/";
    await router.replace(redirect);
  } catch {
    form.verifyCode = "";
    await updateCaptcha();
  } finally {
    loading.value = false;
  }
}

function toggleTheme() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}

function changeLocale(next: AppLocale) {
  setLocale(next);
}

onMounted(() => {
  void updateCaptcha();
});
</script>

<template>
  <div data-testid="login-page" class="relative grid min-h-screen lg:grid-cols-2">
    <section
      class="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex"
    >
      <div class="flex items-center gap-3">
        <img src="@/assets/icons/logo.svg" alt="" class="size-10 rounded-lg bg-white p-1" />
        <span class="text-lg font-semibold">{{ t("app.name") }}</span>
      </div>
      <div class="max-w-md space-y-3">
        <h1 class="text-4xl font-semibold tracking-tight">shadcn-vue</h1>
        <p class="text-primary-foreground/80">Vite+ · Tailwind · Nest Admin</p>
      </div>
      <p class="text-sm text-primary-foreground/70">{{ t("login.demoHint") }}</p>
    </section>

    <section class="flex items-center justify-center p-6">
      <div class="absolute top-4 right-4 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          :aria-label="t('layout.language')"
          @click="changeLocale(locale === 'zh-CN' ? 'en' : 'zh-CN')"
        >
          <Languages />
        </Button>
        <Button variant="ghost" size="icon" :aria-label="t('layout.theme')" @click="toggleTheme">
          <Moon v-if="mode === 'light'" />
          <Sun v-else />
        </Button>
      </div>

      <Card class="w-full max-w-md border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle class="text-2xl">{{ t("login.title") }}</CardTitle>
          <CardDescription>{{ t("login.subtitle") }}</CardDescription>
        </CardHeader>
        <CardContent>
          <form data-testid="login-form" class="grid gap-4" @submit.prevent="submit">
            <div class="grid gap-1.5">
              <Label for="username">{{ t("login.username") }}</Label>
              <Input
                id="username"
                v-model="form.username"
                data-testid="login-username"
                autocomplete="username"
              />
            </div>
            <div class="grid gap-1.5">
              <Label for="password">{{ t("login.password") }}</Label>
              <Input
                id="password"
                v-model="form.password"
                data-testid="login-password"
                type="password"
                autocomplete="current-password"
              />
            </div>
            <div class="grid gap-1.5">
              <Label for="captcha">{{ t("login.captcha") }}</Label>
              <div class="flex gap-2">
                <Input
                  id="captcha"
                  v-model="form.verifyCode"
                  data-testid="login-captcha"
                  autocomplete="off"
                  :placeholder="t('login.captcha')"
                />
                <button
                  type="button"
                  class="h-8 w-28 shrink-0 overflow-hidden rounded-lg border bg-muted"
                  @click="updateCaptcha"
                >
                  <img v-if="captcha" :src="captcha" alt="" class="h-full w-full object-cover" />
                  <span v-else class="px-2 text-xs text-muted-foreground">{{
                    captchaError || " "
                  }}</span>
                </button>
              </div>
              <p v-if="captchaError" class="text-xs text-muted-foreground">{{ captchaError }}</p>
            </div>
            <Button data-testid="login-submit" type="submit" class="w-full" :disabled="loading">
              {{ loading ? t("login.submitting") : t("login.submit") }}
            </Button>
            <p class="text-center text-xs text-muted-foreground lg:hidden">
              {{ t("login.demoHint") }}
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
