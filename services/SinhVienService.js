//lop doi tuong chua cac phuong thuc giao tiep vs backend(api)
var SinhVienService=function(){
  this.layDanhSachSinhVien=function(){
    var promise= axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',//BE cung cap
        method:'GET' //backend cung cap
    });
    
    return promise;
  }
}