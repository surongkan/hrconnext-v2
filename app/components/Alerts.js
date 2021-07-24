  
  import swal from 'sweetalert';

  export function confirmDelete () {
    swal({
        title: "ยืนยันการลบข้อมูล",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("ลบข้อมูลเรียบร้อย", {
            icon: "success",
          });
        } else {
          swal("ยกเลิกการลบข้อมูล");
        }
      });
  }

  export function savedSuccess () {
    swal({
        title: "การบันทึกข้อมูล",
        text: "เพิ่มข้อมูลเรียบร้อย",
        icon: "success",
        buttons: false,
        dangerMode: false,
        timer: 3000
      })
  }