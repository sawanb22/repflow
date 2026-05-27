export const TOAST_DURATION_MS = 4000;
const MAX_TOASTS = 3;

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
};

type Listener = (toasts: Toast[]) => void;

function createToast(type: ToastType, message: string): Toast {
  return {
    id: crypto.randomUUID(),
    type,
    message,
    duration: TOAST_DURATION_MS,
  };
}

export function createToastStore() {
  let toasts: Toast[] = [];
  const listeners = new Set<Listener>();

  function emit() {
    for (const listener of listeners) {
      listener(toasts);
    }
  }

  function push(type: ToastType, message: string) {
    const toast = createToast(type, message);
    toasts = [...toasts, toast].slice(-MAX_TOASTS);
    emit();
    return toast.id;
  }

  return {
    getToasts() {
      return toasts;
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      listener(toasts);
      return () => {
        listeners.delete(listener);
      };
    },
    dismiss(id: string) {
      toasts = toasts.filter((toast) => toast.id !== id);
      emit();
    },
    success(message: string) {
      return push("success", message);
    },
    error(message: string) {
      return push("error", message);
    },
    info(message: string) {
      return push("info", message);
    },
  };
}

export const toastStore = createToastStore();

export const toast = {
  success(message: string) {
    return toastStore.success(message);
  },
  error(message: string) {
    return toastStore.error(message);
  },
  info(message: string) {
    return toastStore.info(message);
  },
  dismiss(id: string) {
    toastStore.dismiss(id);
  },
};
