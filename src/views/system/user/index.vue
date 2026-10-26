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
import { Checkbox } from "@/components/ui/checkbox";
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
import { nativeControlClass } from "@/lib/classes";
import { flattenDepts } from "@/lib/tree";

const { t } = useI18n();
const { can } = usePermission();
const pageSize = 10;
const page = ref(1);
const total = ref(0);
const loading = ref(false);
const rows = ref<API.UserEntity[]>([]);
const roles = ref<API.RoleEntity[]>([]);
const depts = ref<{ id: number; label: string }[]>([]);
const dialogOpen = ref(false);
const saving = ref(false);
const deleteId = ref<number | null>(null);

const query = reactive({ username: "", nickname: "", status: "" as "" | "0" | "1" });
const form = reactive({
  id: 0,
  username: "",
  password: "",
  nickname: "",
  email: "",
  phone: "",
  remark: "",
  status: 1 as 0 | 1,
  roleIds: [] as number[],
  deptId: 0,
});

function resetForm() {
  form.id = 0;
  form.username = "";
  form.password = "";
  form.nickname = "";
  form.email = "";
  form.phone = "";
  form.remark = "";
  form.status = 1;
  form.roleIds = [];
  form.deptId = 0;
}

async function load() {
  loading.value = true;
  try {
    const params: API.UserListParams = {
      page: page.value,
      pageSize,
      username: query.username || undefined,
      nickname: query.nickname || undefined,
    };
    if (query.status === "0" || query.status === "1") params.status = Number(query.status) as 0 | 1;
    const data = await Api.systemUser.userList(params);
    rows.value = data.items ?? [];
    total.value = data.meta?.totalItems ?? 0;
  } finally {
    loading.value = false;
  }
}

async function ensureOptions() {
  if (roles.value.length === 0) {
    const data = await Api.systemRole.roleList({ page: 1, pageSize: 200 });
    roles.value = data.items ?? [];
  }
  if (depts.value.length === 0) {
    const data = await Api.systemDept.deptList({});
    depts.value = flattenDepts(data);
  }
}

async function openCreate() {
  resetForm();
  await ensureOptions();
  dialogOpen.value = true;
}

async function openEdit(row: API.UserEntity) {
  resetForm();
  await ensureOptions();
  form.id = row.id;
  form.username = row.username;
  form.nickname = row.nickname;
  form.email = row.email;
  form.phone = row.phone;
  form.remark = row.remark;
  form.status = row.status === 0 ? 0 : 1;
  form.roleIds = row.roles?.map((role) => role.id) ?? [];
  form.deptId = row.dept?.id ?? 0;
  dialogOpen.value = true;
}

function toggleRole(id: number, checked: boolean) {
  form.roleIds = checked ? [...form.roleIds, id] : form.roleIds.filter((roleId) => roleId !== id);
}

async function save() {
  if (!form.username || !form.nickname || !form.email || (!form.id && !form.password))
    return toast.error(t("common.required"));
  if (form.roleIds.length === 0) return toast.error(t("user.roleRequired"));

  saving.value = true;
  try {
    const shared = {
      username: form.username,
      nickname: form.nickname,
      email: form.email,
      phone: form.phone || undefined,
      remark: form.remark || undefined,
      status: form.status,
      roleIds: form.roleIds,
      deptId: form.deptId || undefined,
    };
    if (form.id) {
      await Api.systemUser.userUpdate(
        { id: form.id },
        {
          ...shared,
          ...(form.password ? { password: form.password } : {}),
        },
        { successMsg: t("common.saved") },
      );
    } else {
      await Api.systemUser.userCreate(
        {
          ...shared,
          password: form.password,
          roleIds: form.roleIds,
          status: form.status,
        },
        { successMsg: t("common.saved") },
      );
    }
    dialogOpen.value = false;
    await load();
  } finally {
    saving.value = false;
  }
}

async function remove() {
  if (deleteId.value == null) return;
  await Api.systemUser.userDelete({ id: deleteId.value }, { successMsg: t("common.deleted") });
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
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">{{ t("user.title") }}</h1>
      </div>
      <Button v-if="can('system:user:create')" @click="openCreate">
        <Plus /> {{ t("common.create") }}
      </Button>
    </div>

    <form class="grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-4" @submit.prevent="search">
      <Input v-model="query.username" :placeholder="t('user.username')" />
      <Input v-model="query.nickname" :placeholder="t('user.nickname')" />
      <select v-model="query.status" :class="nativeControlClass">
        <option value="">{{ t("common.all") }}</option>
        <option value="1">{{ t("common.enabled") }}</option>
        <option value="0">{{ t("common.disabled") }}</option>
      </select>
      <div class="flex gap-2">
        <Button type="submit">{{ t("common.search") }}</Button>
        <Button
          type="button"
          variant="outline"
          @click="
            query.username = '';
            query.nickname = '';
            query.status = '';
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
            <TableHead>{{ t("user.username") }}</TableHead>
            <TableHead>{{ t("user.nickname") }}</TableHead>
            <TableHead>{{ t("user.dept") }}</TableHead>
            <TableHead>{{ t("user.roles") }}</TableHead>
            <TableHead>{{ t("user.email") }}</TableHead>
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
          <TableRow v-else-if="rows.length === 0">
            <TableCell colspan="7" class="h-24 text-center text-muted-foreground">{{
              t("common.empty")
            }}</TableCell>
          </TableRow>
          <TableRow v-for="row in rows" v-else :key="row.id">
            <TableCell class="font-medium">{{ row.username }}</TableCell>
            <TableCell>{{ row.nickname }}</TableCell>
            <TableCell>{{ row.dept?.name }}</TableCell>
            <TableCell>{{ row.roles?.map((role) => role.name).join(", ") }}</TableCell>
            <TableCell>{{ row.email }}</TableCell>
            <TableCell>
              <Badge :variant="row.status === 1 ? 'secondary' : 'outline'">
                {{ row.status === 1 ? t("common.enabled") : t("common.disabled") }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <Button
                v-if="can('system:user:update')"
                variant="ghost"
                size="icon"
                :aria-label="t('common.edit')"
                @click="openEdit(row)"
              >
                <Pencil />
              </Button>
              <Button
                v-if="can('system:user:delete')"
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
          <DialogTitle>{{ form.id ? t("user.edit") : t("user.create") }}</DialogTitle>
        </DialogHeader>
        <form class="grid gap-3" @submit.prevent="save">
          <div class="grid gap-1.5">
            <Label>{{ t("user.username") }}</Label>
            <Input v-model="form.username" />
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("user.password") }}</Label>
            <Input
              v-model="form.password"
              type="password"
              :placeholder="form.id ? t('user.passwordHint') : ''"
            />
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <Label>{{ t("user.nickname") }}</Label>
              <Input v-model="form.nickname" />
            </div>
            <div class="grid gap-1.5">
              <Label>{{ t("user.email") }}</Label>
              <Input v-model="form.email" type="email" />
            </div>
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("user.phone") }}</Label>
            <Input v-model="form.phone" />
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("user.dept") }}</Label>
            <select v-model.number="form.deptId" :class="nativeControlClass">
              <option :value="0">{{ t("common.all") }}</option>
              <option v-for="dept in depts" :key="dept.id" :value="dept.id">
                {{ dept.label }}
              </option>
            </select>
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("user.roles") }}</Label>
            <ScrollArea class="h-32 rounded-lg border p-2">
              <label
                v-for="role in roles"
                :key="role.id"
                class="flex items-center gap-2 py-1 text-sm"
              >
                <Checkbox
                  :checked="form.roleIds.includes(role.id)"
                  @update:checked="toggleRole(role.id, $event === true)"
                />
                {{ role.name }}
              </label>
            </ScrollArea>
          </div>
          <div class="grid gap-1.5">
            <Label>{{ t("user.remark") }}</Label>
            <Textarea v-model="form.remark" />
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
