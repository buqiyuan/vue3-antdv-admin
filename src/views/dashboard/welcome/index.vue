<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const { t } = useI18n();
</script>

<template>
  <div class="mx-auto grid max-w-5xl gap-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">{{ t("dashboard.title") }}</h1>
      <p class="mt-2 max-w-3xl text-sm text-muted-foreground">{{ t("dashboard.lead") }}</p>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>{{ t("user.title") }}</CardTitle>
          <CardDescription>system:user:*</CardDescription>
        </CardHeader>
        <CardContent>
          <Button as-child>
            <RouterLink to="/system/user">{{ t("dashboard.openUser") }}</RouterLink>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{{ t("role.title") }}</CardTitle>
          <CardDescription>system:role:*</CardDescription>
        </CardHeader>
        <CardContent>
          <Button as-child variant="secondary">
            <RouterLink to="/system/role">{{ t("dashboard.openRole") }}</RouterLink>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{{ t("menu.title") }}</CardTitle>
          <CardDescription>system:menu:*</CardDescription>
        </CardHeader>
        <CardContent>
          <Button as-child variant="outline">
            <RouterLink to="/system/menu">{{ t("dashboard.openMenu") }}</RouterLink>
          </Button>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>{{ t("dashboard.gapTitle") }}</CardTitle>
        <CardDescription>{{ t("dashboard.gapBody") }}</CardDescription>
      </CardHeader>
    </Card>
  </div>
</template>
