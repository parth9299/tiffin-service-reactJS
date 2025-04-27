import Swal from "sweetalert2";
const SweetMessage = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export const ApiResponseMessage = async (message, status) => {
  SweetMessage.fire({
    icon: status,
    showCloseButton: true,
    title: message,
  });

  return SweetMessage;
};
export const commonConfirmBox = async (
  title,
  confirmButtonText,
  cancelButtonText,
  Html = undefined
) => {
  const result = await Swal.fire({
    title: title,
    icon: "info",
    html: Html,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: confirmButtonText ? confirmButtonText : "Yes",
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: cancelButtonText ? cancelButtonText : "No",
    cancelButtonAriaLabel: "Thumbs down",
  });
  return result.isConfirmed;
};
