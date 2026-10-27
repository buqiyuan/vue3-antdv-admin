/**
 * Run a modal OK handler.
 * Resolves `true` when the dialog should close. A rejection (form validation
 * or a failed request) resolves `false` so the dialog stays open and the
 * rejection does not become a Vue "Unhandled error during execution of
 * component event handler" warning. Request errors are already shown by the
 * axios interceptor; validation errors stay on the form.
 */
export async function confirmModalOk(
  onOk?: (event: MouseEvent) => unknown,
  event?: MouseEvent,
): Promise<boolean> {
  try {
    await onOk?.(event as MouseEvent);
    return true;
  } catch {
    return false;
  }
}
