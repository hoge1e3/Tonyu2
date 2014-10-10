requirejs(["Auth","Util","fs/exportToJsdoit","requestFragment"],function (Auth,Util,exj,rf){
  $(function () {
   var dir=Util.getQueryString("dir", "/Tonyu/Projects/1_Animation/");
   var dirs=dir.split("/");
   dirs.pop();
   var name=dirs.pop();
   $("#prjNameSpan").text(name);
   $("#prjName").val(name);
   Auth.currentUser(function(res) {
      if (res) {
          $(".on-logged-out").hide();
          $(".on-logged-in").show();
          $.ajax({ type:"get", //redirectTo:"tonyuexe",
              url:"../../edit/get-project-info",
              data:{pathInfo:"/get-project-info", project:name},
              success:function (res) {
                  console.log("get-prj",res);
                  var data=JSON.parse(res);
                  if (data.license!="null") $("#license").val(data.license);
                  if (data.title!="null") $("#prjTitle").val(data.title);
                  else $("#prjTitle").val(data.name);
                  if (data.description!="null") $("#desc").val(data.description);
                  $("#allowFork").attr("checked",data.allowFork!="false");
                  $("#publishToList").attr("checked",data.publishToList!="false");
                  $(".submit-wait").hide();
                  var button=$("<button>").text("公開する").click(function (e) {
                      $(".submit-wait").show();
                      $(this).hide();
                      var data={pathInfo:"/upload-project"};
                      function setData() {
                          var t=$(this);
                          data[t.attr("name")]=t.val();
                      }
                      $("#theForm input").each(setData);
                      $("#theForm select").each(setData);
                      $("#theForm textarea").each(setData);
                      console.log("upload-project data",data);
                      $.ajax({type:"post", redirectTo:"tonyuexe",
                          url:"../../edit/upload-project",
                          data:data,
                          success:function (res) {
                              console.log("upload-prj",res);
                              res=JSON.parse(res);
                              $("#complete").show();
                              $("#url").attr("href",res.url);
                              $(".submit-wait").hide();
                          },error: function () {
                              alert("Error "+arguments)
                          }
                      });
                      e.preventDefault();
                      return false;
                  });
                  $("#theForm").append(button);
              },
              error: function () {
                  alert("Error "+arguments)
              }
          });
      } else {
          $(".on-logged-in").hide();
          $(".on-logged-out").show();
      }
      $(".wait-loggin").hide();
   });
  });
});