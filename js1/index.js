////准备

var students = [];
var $tbody = document.querySelector("tbody"),
    $add = document.querySelector(".add"),
    $all = document.querySelector(".all"),
    $remove = document.querySelector(".remove");
var $checks;







/////初始化数据加载
if(localStorage.students){
	students = JSON.parse(localStorage.students);
	render();
	refresh();
}else{
	$.ajax("/php1/huoqustudents.php",function(data){
		console.log(data);
		students = JSON.parse(data);
		localStorage.students = JSON.stringify(students);
		render();
	})
}

/////数据渲染
function render(){
	$tbody.innerHTML = '';
	students.forEach(function(v){
	var el = document.createElement("tr");
	el.setAttribute("data-id",v.id)
	el.innerHTML = '<td>'+v.xuehao+'</td><td>'+v.name+'</td><td>'+v.sex+'</td><td>'+v.age+'</td><td>'+v.jiguan+'</td><td><input type="checkbox" class="check"></td>';
    $tbody.appendChild(el);
    $checks = $tbody.querySelectorAll(".check");
    $all.checked = false;
    
})
	
}

/////数据同步

function refresh (){
$.ajax("/php1/huoqustudents.PHP",function(data){
      var temp = JSON.parse(data);
      if(students.length !== temp.length){
            students = temp;
            localStorage.students = JSON.stringify(students);
            render();
      }
    })
}
    
  

/////数据添加

var arr = [];
forEach = arr.forEach;
$add.addEventListener("click",function(e){
	var el = document.createElement("tr");
	el.classList.add("adding");
	if(students.length){
			var num = Number(students[students.length-1].xuehao)+1;

		}else{
			num = 1001;
		}
	el.innerHTML = '<td><input type="text" name="xuehao" value="'+num+'"/></td><td><input type="text" name="xuehao" value=""/></td><td><input type="text" name="xuehao" value=""/></td><td><input type="text" name="xuehao" value=""/></td><td><input type="text" name="xuehao" value=""/></td><span class="submit">✔</span>';
    $tbody.appendChild(el);
    var $submit = $tbody.querySelector(".submit"),
        $tr = $tbody.querySelector(".adding");
        $tds = $tr.querySelectorAll("td");

    $submit.addEventListener("click",function(){
    	this.innerHTML = '<input type="checkbox" >';
    	forEach.call($tds,function(v){
    		v.innerHTML = v.firstElementChild.value;
			
    	})
    	var xuehao = $tds[0].innerHTML;
    	var name = $tds[1].innerHTML;
    	var sex = $tds[2].innerHTML;
    	var age = $tds[3].innerHTML;
    	var jiguan = $tds[4].innerHTML;
    	if(xuehao !== '' && name !== ''){
		var url = '/php1/addstudents.php?xuehao='+xuehao+'&name='+name+'&sex='+sex+'&age='+age+'&jiguan='+jiguan
    	$.ajax(url,function(data){
    		var _d = {id:data,xuehao:xuehao,name:name,sex:sex,age:age,jiguan:jiguan};
    		students.push(_d);
    		localStorage.students = JSON.stringify(students);
    		render();
    	})
    	}else{
    		this.innerHTML = 'exit';
    		$tbody.removeChild(el);
    	}
    })
})

/////数据删除
// 全选按钮
$all.addEventListener("click",function(){
	forEach.call($checks,function(v){
        v.checked = $all.checked;
	})
})

// 全部选中时  全选按钮自动选中
$tbody.addEventListener("click",function(e){
    var el =e.target;  
    if(el.classList.contains("check")){
    	 var num  = 0;
       forEach.call($checks,function(v){	   
	   if(v.checked){
		 num += 1;
		 if(num === students.length){
			$all.checked = true;
		}else{
			$all.checked = false;
		}	 
	}
		})
    }
})

///选中的数据删除
$remove.addEventListener("click",function(e){
	forEach.call($checks,function(v){
		if(v.checked){
			$tbody.removeChild(v.parentElement.parentElement);
			var ID = v.parentElement.parentElement.getAttribute("data-id");
			var url = '/php1/shanchustudents.php?id='+ID
			$.ajax(url,function(data){
				if(data === 'success'){
				students = students.filter(function(v){
				return v.id !== ID; 
				})
				localStorage.students = JSON.stringify(students);
				render();
				}
			})	

		}
	})

})



/////数据修改

// 编辑状态切换

$tbody.addEventListener("dblclick",function(e){
	var el = e.target;
    var $trs = document.querySelectorAll(".editing");
    if($trs.length >= 1){
    	toggle($trs[0]);
    	toggle(el.parentElement);
    }else{
    	toggle(el.parentElement);
    }
	
})



function toggle(el){
	var ID = el.getAttribute("data-id");
	var $tds1 = el.querySelectorAll("td");
	 if(el.classList.contains("editing")){
		el.classList.remove("editing");
		forEach.call($tds1,function(v){
			if(v.firstElementChild.classList.contains("check")==false){
			    var  temp = v.firstElementChild.value;
			    v.innerHTML = temp;
			}
		})
		var xuehao = $tds1[0].innerHTML;
    	var name = $tds1[1].innerHTML;
    	var sex = $tds1[2].innerHTML;
    	var age = $tds1[3].innerHTML;
    	var jiguan = $tds1[4].innerHTML;
    	var url = '/php1/updatestudents.php?id='+ID+'&xuehao='+xuehao+'&name='+name+'&sex='+sex+'&age='+age+'&jiguan='+jiguan
    	console.log(url)
    	$.ajax(url,function(data){
    		if(data === "success"){
    			 students.filter(function(v){
    				if(v.id === ID){
    					v.xuehao = xuehao;
    			        v.name = name;
    			        v.sex = sex;
    			        v.age = age;
    			        v.jiguan = jiguan;
    				}
    			})
    			console.log(students)
    			localStorage.students = JSON.stringify(students);
    			render();
    		}
    	})
	
	}else{
		forEach.call($tds1,function(v){
			var temp = v.innerHTML;
			if(!v.firstElementChild){
			v.innerHTML = '<input type="text" name="xuehao" value=""/>';
			v.firstElementChild.value = temp;
			}
		})
		el.classList.add("editing");
	}
  

}
