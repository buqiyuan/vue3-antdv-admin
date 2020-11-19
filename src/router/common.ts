import dashboard from "@/router/modules/dashboard";
import demos from "@/router/modules/demos";
import redirect from "@/router/modules/redirect";

export default [
    ...dashboard,
    ...demos,
    ...redirect,
]
