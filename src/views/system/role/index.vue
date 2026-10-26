<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Pencil, Plus, Trash2 } from "@lucide/vue";
import Api from "@/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog.vue";
import PaginationBar from "@/components/admin/PaginationBar.vue";
import { Badge } from "@/components/ui/badge";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { usePermission } from "@/composables/usePermission";
import { ancestorMenuIds, collectMenuIds } from "@/lib/tree";
import MenuChecks from "./MenuChecks.vue";

const { t } = useI18n();
const { can } = usePermission();
const pageSize = 10;
const page = ref(1);
const total = ref(0);
const loading = ref(false);
const rows = ref<API.RoleEntity[]>([]);
const menuTree = ref<API.MenuItemInfo[]>([]);
const dialogOpen = ref(false);
const saving = ref(false);
const deleteId = ref<number | null>(null);
const query = reactive({ name: "", value: "" });
const form = reactive({
  id: 0,
  name: "",
  value: "",
  remark: "",
  status: 1 as 0 | 1,
  menuIds: [] as number[],
});

function resetForm() {
  form.id = 0;
  form.name = "";
  form.value = "";
  form.remark = "";
  form.status = 1;
  form.menuIds = [];
}

async function load() {
  loading.value = true;
  try {
    const data = await Api.systemRole.roleList({
      page: page.value,
      pageSize,
      name: query.name || undefined,
      value: query.value || undefined,
    });
    rows.value = data.items ?? [];
    total.value = data.meta?.totalItems ?? 0;
  } finally {
    loading.value = false;
  }
}

async function ensureMenus() {
  if (menuTree.value.length === 0) menuTree.value = await Api.systemMenu.menuList({});
}

async function openCreate() {
  resetForm();
  await ensureMenus();
  dialogOpen.value = true;
}

async function openEdit(row: API.RoleEntity) {
  resetForm();
  await ensureMenus();
  const info = await Api.systemRole.roleInfo({ id: row.id });
  form.id = info.id;
  form.name = info.name;
  form.value = info.value;
  form.remark = info.remark;
  form.status = info.status === 0 ? 0 : 1;
  form.menuIds = info.menuIds ?? [];
  dialogOpen.value = true;
}

function toggleMenu(node: API.MenuItemInfo, checked: boolean) {
  const ids = new Set(form.menuIds);
  for (const id of collectMenuIds(node)) {
    if (checked) ids.add(id);
    else ids.delete(id);
  }
  if (checked) {
    for (const id of ancestorMenuIds(menuTree.value, node.id) ?? []) ids.add(id);
  }
  form.menuIds = [...ids];
}

async function save() {
  if (!form.name || !form.value) return toast.error(t("common.required"));
  saving.value = true;
  try {
    const body = {
      name: form.name,
      value: form.value,
      remark: form.remark || undefined,
      status: form.status,
      menuIds: form.menuIds,
    };
    if (form.id)
      await Api.systemRole.roleUpdate({ id: form.id }, body, { successMsg: t("common.saved") });
    else await Api.systemRole.roleCreate(body, { successMsg: t("common.saved") });
    dialogOpen.value = false;
    await load();
  } finally {
    saving.value = false;
  }
}

async function remove() {
  if (deleteId.value == null) return;
  await Api.systemRole.roleDelete({ id: deleteId.value }, { successMsg: t("common.deleted") });
  deleteId.value = null;
  await load();
}

function search() {
  page.value = 1;
  void load();
}

onMounted(() => {
  void load();
});
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold tracking-tight">{{ t("role.title") }}</h1>
      <Button v-if="can('system:role:create')" @click="openCreate">
        <Plus /> {{ t("common.create") }}
      </Button>
    </div>
    <form class="grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-3" @submit.prevent="search">
      <Input v-model="query.name" :placeholder="t('role.name')" />
      <Input v-model="query.value" :placeholder="t('role.value')" />
      <div class="flex gap-2">
        <Button type="submit">{{ t("common.search") }}</Button>
        <Button
          type="button"
          variant="outline"
          @click="
            query.name = '';
            query.value = '';
            search();
          "
        >
          {{ t("common.reset") }}
        </Button>
      </div>
    </form>
    <div class="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ t("role.name") }}</TableHead>
            <TableHead>{{ t("role.value") }}</TableHead>
            <TableHead>{{ t("role.remark") }}</TableHead>
            <TableHead>{{ t("common.enabled") }}</TableHead>
            <TableHead class="text-right">{{ t("common.actions") }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="loading">
            <TableCell colspan="5" class="h-24 text-center text-muted-foreground">{{
              t("common.loading")
            }}</TableCell>
          </TableRow>
          <TableRow v-else-if="rows.length === 0">
            <TableCell colspan="5" class="h-24 text-center text-muted-foreground">{{
              t("common.empty")
            }}</TableCell>
          </TableRow>
          <TableRow v-for="row in rows" v-else :key="row.id">
            <TableCell class="font-medium">{{ row.name }}</TableCell>
            <TableCell>{{ row.value }}</TableCell>
            <TableCell>{{ row.remark }}</TableCell>
            <TableCell>
              <Badge :variant="row.status === 1 ? 'secondary' : 'outline'">
                {{ row.status === 1 ? t("common.enabled") : t("common.disabled") }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <Button
                v-if="can('system:role:update')"
                variant="ghost"
                size="icon"
                :aria-label="t('common.edit')"
                @click="openEdit(row)"
              >
                <Pencil />
              </Button>
              <Button
                v-if="can('system:role:delete')"
                variant="ghost"
                size="icon"
                :aria-label="t('common.delete')"
                @click="deleteId = row.id"
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <PaginationBar
      :page="page"
      :page-size="pageSize"
      :total="total"
      @update:page="
        page = $event;
        load();
      "
    />

    <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
      <DialogContent class="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ form.id ? t("role.edit") : t("role.create") }}</DialogTitle>
        </DialogHeader>
        <form class="grid gap-3" @submit.prevent="save">
          <div class="grid gap-1.5">
            <Label>{{ t("role.name") }}</Label>
            <Input v-model="form.name" />
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("role.value") }}</Label>
            <Input v-model="form.value" />
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("role.remark") }}</Label>
            <Textarea v-model="form.remark" />
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("role.menus") }}</Label>
            <ScrollArea class="h-56 rounded-lg border p-2">
              <MenuChecks :nodes="menuTree" :selected="form.menuIds" @toggle="toggleMenu" />
            </ScrollArea>
          </div>
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
