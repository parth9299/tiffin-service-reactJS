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
  