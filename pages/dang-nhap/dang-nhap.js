$(function () {
  $("#header").load("../../header.html");
  $("#footer").load("../../footer.html");
});

function handleClick() {
  if (sessionStorage.getItem("token")) {
    window.location.href = "../cart/cart.html";
  } else {
    alert("Vui lòng đăng nhập");
    window.location.href = "../dang-nhap/dang-nhap.html";
  }
}

var frm = $("#dang-nhap");

frm.submit(function (e) {
  e.preventDefault();
  console.log(frm.serialize());
  var body = {};
  var dataArray = frm.serializeArray();
  for (var i = 0; i < dataArray.length; i++) {
    body[dataArray[i].name] = dataArray[i].value;
  }

  $.ajax({
    type: "POST",
    url: "https://banhmioi-nvpaf9d6.b4a.run/login",
    data: JSON.stringify(body),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log("Submission was successful.");
      sessionStorage.setItem("token", data.jwt);
      console.log(sessionStorage.token);
      window.location.href = "../san-pham/san-pham.html";
      alert("Đăng nhập thành công!");
    },
    error: function (data) {
      console.log("Tên hoặc mật khẩu không chính xác");
      console.log(data);
      alert("Tên hoặc mật khẩu không chính xác");
    },
  });
});
