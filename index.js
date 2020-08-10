let accessToken;
var facebookProgressBarLabel = $(".facebookProgressBarLabel");
var facebookProgressBar= $("#facebookProgressBar");
$(document).ready(()=>{
	facebookProgressBar.hide();
	var dialog=$('#dialog-form').dialog({
		height:250,
		width:300,
		modal:true
	});
	var form=dialog.find("form").on("submit",function(event){
		//prevent default otherwise form submits
		event.preventDefault();
		accessToken=$("#authToken").val();
		if(!accessToken){
			alert("Access denied");
		}else{
			 dialog.dialog("close");
			 facebookProgressBar.show();
            getDataFromApi();
		}
	});
});
let getDataFromApi=()=>{

	$.ajax({
        type:'GET',
		url:'https://graph.facebook.com/me?fields=id,last_name,first_name,birthday,email,gender,picture.type(large)&access_token='+accessToken,
		async:'false',
		success : (data)=>{

			let updateData = function() {
				$('#displayPage').show();
				facebookProgressBar.hide();
				$('#firstname').append(data.first_name);
				$('#lastname').append(data.last_name);
				$('#profilepicture').html('<img src="'+data.picture.data.url+'" class="img-fluid profilePictureDecoration"/>');
				$('#birthday').append(data.birthday);
				$('#email').append(data.email);
				$('#gender').append(data.gender);
				console.log(data);   
		}
		setTimeout(updateData,500);
		},
		beforeSend : ()=>{
            $(function(){
                facebookProgressBar.progressbar({
                	value:false
                });
              //   function progress(){
            		// var val=facebookProgressBar.progressbar("value") || 0;
            		// facebookProgressBar.progressbar("value",val+40);
            		// if(val<99){
            		// 	setTimeout(progress,200);
            		// }
              //   }
                //setTimeout(progress,200);
            });
		}
	});

}
