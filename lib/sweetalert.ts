/**
 * SweetAlert utility - use everywhere instead of native alert()
 */
import Swal from "sweetalert2";

const darkTheme = {
  background: "#0A0A0A",
  color: "#fff",
  confirmButtonColor: "#E63946",
  cancelButtonColor: "#5c5f66",
};

export const showSuccess = (title: string, text?: string) =>
  Swal.fire({
    icon: "success",
    title,
    text: text ?? "",
    ...darkTheme,
  });

export const showError = (title: string, text?: string) =>
  Swal.fire({
    icon: "error",
    title,
    text: text ?? "",
    ...darkTheme,
  });

export const showInfo = (title: string, text?: string) =>
  Swal.fire({
    icon: "info",
    title,
    text: text ?? "",
    ...darkTheme,
  });

export const showWarning = (title: string, text?: string) =>
  Swal.fire({
    icon: "warning",
    title,
    text: text ?? "",
    ...darkTheme,
  });

export const showConfirm = (
  title: string,
  text: string,
  confirmText = "Yes"
): Promise<{ isConfirmed: boolean }> =>
  Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    ...darkTheme,
  });

export default Swal;
