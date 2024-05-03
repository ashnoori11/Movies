import Swal from "sweetalert2"

export default function customConfirm(
    onConfirm: any,
    title: string = "Are you sure?",
    confirmationButtonText: string = "Delete",
    confirmButtonColor: string = "#3085d6",
    showCancelButton: boolean = true,
    cancelButtonColor: string = "#d33"

) {

    Swal.fire({
        title: title,
        text: confirmationButtonText,
        icon: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmationButtonText
    }).then(result => {

        if (result.isConfirmed) {
            onConfirm();
        }
    });
}