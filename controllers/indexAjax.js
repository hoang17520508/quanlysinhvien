// console.log(axios);
var svService=new SinhVienService();
var layDanhSachSinhVienApi =function (){
    var promise =svService.layDanhSachSinhVien();
    
  
    promise.then(function(result)
    {
        console.log('ket qua',result.data);
        renderTable(result.data);
      

    });
    promise.catch(function(error)
    {
        console.log(error);
    });
    
}

var renderTable= function(mangSinhVien){
    var noidungTable='';
    for(var i=0;i<mangSinhVien.length;i++){
        var sv = new SinhVien();
        sv.maSinhVien= mangSinhVien[i].maSinhVien;
        sv.tenSinhVien= mangSinhVien[i].tenSinhVien;
        sv.diemToan= mangSinhVien[i].diemToan;
        sv.diemLy= mangSinhVien[i].diemLy;
        sv.diemHoa=mangSinhVien[i].diemHoa;
        sv.diemRenLuyen=mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien=mangSinhVien[i].loaiSinhVien;
        sv.email=mangSinhVien[i].email;
        noidungTable+=`
        <tr>
        <td>${sv.maSinhVien}</td>
        <td>${sv.tenSinhVien}</td>
        <td>${sv.email}</td>
        <td>${sv.tinhDiemTrungBinh()}</td>
        <td>${sv.xepLoai()}</td>
        <td>
        <button class='btn btn-danger' onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
        <button class='btn btn-primary ' onclick="suaSinhVien('${sv.maSinhVien}')">Sửa</button>

        </td>
        
        </tr> 
    `;

       
    }
    document.querySelector('#tableSinhVien').innerHTML=noidungTable;
}
layDanhSachSinhVienApi();

// chưc năng thêm sinh viên lưu trữ vao server thong qua api backend

document.querySelector('#btnXacNhan').onclick= function(){
    var sv= new SinhVien();
    sv.maSinhVien= document.querySelector('#maSinhVien').value;
    sv.tenSinhVien= document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien= document.querySelector('#loaiSinhVien').value;
    sv.diemHoa= document.querySelector('#diemHoa').value;
    sv.diemLy= document.querySelector('#diemLy').value;
    sv.diemToan= document.querySelector('#diemToan').value;
    sv.diemRenLuyen=document.querySelector('#diemRenLuyen').value;
    sv.email=document.querySelector('#email').value;
    console.log('Sinh Viên',sv);
    

    //dung axios dua du lieu ve server thong qua api backend cung cap
    var promise =axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method:'POST',// giao thuc backend cung cap
        data:sv// du lieu gui di(luu y:du lieu gui di phai format du lieu backend yeu cau)

    });

    // ham thuc thi khi goi ajax thanh cong
    promise.then(function(result){
        console.log(result.data);
        layDanhSachSinhVienApi();
    });
    //ham thuc thi khi loi xxay ra
    promise.catch(function(error){
        console.log(error.response.data);

    });
    


}

// chuc nang xoa sinh vien server  dua vao api
var xoaSinhVien= function(maSinhVien){
    var promise =axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien='+maSinhVien,
        method:'DELETE',

    });

    //ham xu ly thanh cong
    promise.then(function(result){
        console.log(result.data);
        layDanhSachSinhVienApi();
    });
    // ham xu ly that bai
    promise.catch(function(error){
        console.log(error.response.data);
    });

}
var suaSinhVien =function (maSinhVien){
    var promise =axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVien,
        method:'GET'
    });
    promise.then(function(result){
        console.log(result.data);
        document.querySelector('#maSinhVien').value=result.data.maSinhVien;
        document.querySelector('#tenSinhVien').value=result.data.tenSinhVien;
        document.querySelector('#email').value=result.data.email;
       
        document.querySelector('#diemToan').value=result.data.diemToan;
        document.querySelector('#diemLy').value=result.data.diemLy;
        document.querySelector('#diemHoa').value=result.data.diemHoa;
        document.querySelector('#diemRenLuyen').value=result.data.diemRenLuyen;
        
    });
    promise.catch(function(error){
        console.log(error.response.data);
    })
}

//cchuc  nang luu thoing tin sinh vien dua vao api
document.querySelector('#btnLuuThongTin').onclick= function(){
    // lay du lieu nguoi dung nhap dua vao doi tuong theo format du lieu backend yeu cau
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
  
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    
    var promise =axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sv.maSinhVien,
        method:'PUT',
        data:sv
    });
    promise.then(function(result){
        console.log(result.data);
        layDanhSachSinhVienApi();
        
      
        
    });
    promise.catch(function(error){
        console.log(error.response.data);
    })
}