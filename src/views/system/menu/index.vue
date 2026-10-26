<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Plus } from "@lucide/vue";
import Api from "@/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog.vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePermission } from "@/composables/usePermission";
import { nativeControlClass } from "@/lib/classes";
import { filterMenuTree } from "@/lib/tree";
import MenuRows from "./MenuRows.vue";

const { t } = useI18n();
const { can } = usePermission();
const loading = ref(false);
const keyword = ref("");
const rows = ref<API.MenuItemInfo[]>([]);
const dialogOpen = ref(false);
const saving = ref(false);
const deleteId = ref<number | null>(null);

const form = reactive({
  id: 0,
  type: 1 as 0 | 1 | 2,
  parentId: -1,
  name: "",
  path: "",
  component: "",
  permission: "",
  icon: "",
  orderNo: 0,
  show: 1 as 0 | 1,
  status: 1 as 0 | 1,
  keepAlive: 0 as 0 | 1,
  isExt: false,
  extOpenMode: 1 as 1 | 2,
});

const visibleRows = computed(() => filterMenuTree(rows.value, keyword.value));
const parentOptions = computed(() => [
  { id: -1, label: t("menu.root") },
  ...flattenMenus(rows.value),
]);

function flattenMenus(nodes: API.MenuItemInfo[], depth = 0): { id: number; label: string }[] {
  return nodes.flatMap((node) => {
    const current = {
      id: node.id,
      label: `${depth > 0 ? `${"· ".repeat(depth)}` : ""}${node.name}`,
    };
    return [current, ...flattenMenus(node.children ?? [], depth + 1)];
  });
}

function resetForm() {
  form.id = 0;
  form.type = 1;
  form.parentId = -1;
  form.name = "";
  form.path = "";
  form.component = "";
  form.permission = "";
  form.icon = "";
  form.orderNo = 0;
  form.show = 1;
  form.status = 1;
  form.keepAlive = 0;
  form.isExt = false;
  form.extOpenMode = 1;
}

async function load() {
  loading.value = true;
  try {
    rows.value = await Api.systemMenu.menuList({});
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  resetForm();
  dialogOpen.value = true;
}

function openEdit(row: API.MenuItemInfo) {
  resetForm();
  form.id = row.id;
  form.type = (row.type === 0 || row.type === 2 ? row.type : 1) as 0 | 1 | 2;
  form.parentId = row.parentId || -1;
  form.name = row.name;
  form.path = row.path;
  form.component = row.component;
  form.permission = row.permission;
  form.icon = row.icon;
  form.orderNo = row.orderNo;
  form.show = row.show === 0 ? 0 : 1;
  form.status = row.status === 0 ? 0 : 1;
  form.keepAlive = row.keepAlive === 1 ? 1 : 0;
  form.isExt = row.isExt;
  form.extOpenMode = row.extOpenMode === 2 ? 2 : 1;
  dialogOpen.value = true;
}

async function save() {
  if (!form.name || (form.type !== 2 && !form.path)) return toast.error(t("common.required"));
  saving.value = true;
  try {
    const body: API.MenuDto = {
      type: form.type,
      parentId: form.parentId,
      name: form.name,
      orderNo: Number(form.orderNo) || 0,
      path: form.path,
      isExt: form.isExt,
      extOpenMode: form.extOpenMode,
      show: form.show,
      keepAlive: form.keepAlive,
      status: form.status,
      icon: form.icon || undefined,
      permission: form.permission,
      component: form.component || undefined,
    };
    if (form.id)
      await Api.systemMenu.menuUpdate({ id: form.id }, body, { successMsg: t("common.saved") });
    else await Api.systemMenu.menuCreate(body, { successMsg: t("common.saved") });
    dialogOpen.value = false;
    await load();
  } finally {
    saving.value = false;
  }
}

async function remove() {
  if (deleteId.value == null) return;
  await Api.systemMenu.menuDelete({ id: deleteId.value }, { successMsg: t("common.deleted") });
  deleteId.value = null;
  await load();
}

onMounted(() => {
  void load();
});
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold tracking-tight">{{ t("menu.title") }}</h1>
      <Button v-if="can('system:menu:create')" @click="openCreate">
        <Plus /> {{ t("common.create") }}
      </Button>
    </div>
    <Input v-model="keyword" :placeholder="t('menu.keyword')" />
    <div class="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ t("menu.name") }}</TableHead>
            <TableHead>{{ t("menu.type") }}</TableHead>
            <TableHead>{{ t("menu.path") }}</TableHead>
            <TableHead>{{ t("menu.permission") }}</TableHead>
            <TableHead>{{ t("menu.order") }}</TableHead>
            <TableHead>{{ t("common.enabled") }}</TableHead>
            <TableHead class="text-right">{{ t("common.actions") }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="loading">
            <TableCell colspan="7" class="h-24 text-center text-muted-foreground">{{
              t("common.loading")
            }}</TableCell>
          </TableRow>
          <TableRow v-else-if="visibleRows.length === 0">
            <TableCell colspan="7" class="h-24 text-center text-muted-foreground">{{
              t("common.empty")
            }}</TableCell>
          </TableRow>
          <MenuRows v-else :rows="visibleRows" @edit="openEdit" @remove="deleteId = $event" />
        </TableBody>
      </Table>
    </div>

    <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
      <DialogContent class="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ form.id ? t("menu.edit") : t("menu.create") }}</DialogTitle>
        </DialogHeader>
        <form class="grid gap-3" @submit.prevent="save">
          <div class="grid gap-1.5">
            <Label>{{ t("menu.type") }}</Label>
            <select v-model.number="form.type" :class="nativeControlClass">
              <option :value="0">{{ t("menu.directory") }}</option>
              <option :value="1">{{ t("menu.page") }}</option>
              <option :value="2">{{ t("menu.button") }}</option>
            </select>
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("menu.parent") }}</Label>
            <select v-model.number="form.parentId" :class="nativeControlClass">
              <option v-for="option in parentOptions" :key="option.id" :value="option.id">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("menu.name") }}</Label>
            <Input v-model="form.name" />
          </div>
          <div v-if="form.type !== 2" class="grid gap-1.5">
            <Label>{{ t("menu.path") }}</Label>
            <Input v-model="form.path" />
          </div>
          <div v-if="form.type === 1" class="grid gap-1.5">
            <Label>{{ t("menu.component") }}</Label>
            <Input v-model="form.component" placeholder="system/user/index" />
          </div>
          <div v-if="form.type !== 0" class="grid gap-1.5">
            <Label>{{ t("menu.permission") }}</Label>
            <Input v-model="form.permission" placeholder="system:user:list" />
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <Label>{{ t("menu.icon") }}</Label>
              <Input v-model="form.icon" />
            </div>
            <div class="grid gap-1.5">
              <Label>{{ t("menu.order") }}</Label>
              <Input v-model.number="form.orderNo" type="number" />
            </div>
          </div>
          <label v-if="form.type === 1" class="flex items-center justify-between text-sm">
            {{ t("menu.external") }}
            <Switch :checked="form.isExt" @update:checked="form.isExt = $event === true" />
          </label>
          <div v-if="form.isExt" class="grid gap-1.5">
            <Label>{{ t("menu.external") }}</Label>
            <select v-model.number="form.extOpenMode" :class="nativeControlClass">
              <option :value="1">_blank</option>
              <option :value="2">iframe</option>
            </select>
          </div>
          <label class="flex items-center justify-between text-sm">
            {{ t("menu.visible") }}
            <Switch
              :checked="form.show === 1"
              @update:checked="form.show = $event === true ? 1 : 0"
            />
          </label>
          <label class="flex items-center justify-between text-sm">
            {{ t("menu.cache") }}
            <Switch
              :checked="form.keepAlive === 1"
              @update:checked="form.keepAlive = $event === true ? 1 : 0"
            />
          </label>
          <label class="flex items-center justify-between text-sm">
            {{ t("common.enabled") }}
            <Switch
              :checked="form.status === 1"
              @update:checked="form.status = $event === true ? 1 : 0"
            />
          </label>
          <DialogFooter>
            <Button type="button" variant="outline" @click="dialogOpen = false">{{
              t("common.cancel")
            }}</Button>
            <Button type="submit" :disabled="saving">{{ t("common.save") }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <ConfirmDialog
      :open="deleteId != null"
      :title="t('common.confirmDelete')"
      :description="t('common.deleteHint')"
      :confirm-text="t('common.delete')"
      :cancel-text="t('common.cancel')"
      @update:open="deleteId = $event ? deleteId : null"
      @confirm="remove"
    />
  </section>
</template>
