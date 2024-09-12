
function dict(text,flag=0){
	return {"text":text,"status":flag};
}

var arrayToDo = [];

//добавление нового дела
document.getElementById('add-btn').addEventListener('click', function() {
    let inputText = document.getElementById('input-text');
    if (inputText.value.trim() !== '') {
		arrayToDo.push(dict(inputText.value.trim()));

		inputText.value = '';
		showTasks(); 
    }
});

//удаление дела
function deleteTask(index){
	arrayToDo.splice(index, 1); 

	showTasks(); 
}


//редактирование дела
function editTask(index){

	let text = arrayToDo[index].text;
	let liTag = document.getElementById("edit"+index).closest("li");
	
	let editInput = document.createElement('textarea');
	editInput.className = 'edit-input';
	editInput.value = text;

	let saveButton = document.createElement('span');
	saveButton.innerHTML = `<i class="fas fa-save"></i>`;
	saveButton.className = 'save';


	let liTagNew = document.createElement('li');
	liTagNew.appendChild(editInput);
	liTagNew.appendChild(saveButton);

	liTag.replaceWith(liTagNew);

	// сохранение дела
	saveButton.addEventListener('click', function() {
		if (editInput.value.trim() !== '') {
			if(editInput.value.trim()!=text){
				arrayToDo.splice(index, 1, dict(editInput.value.trim())); 
			}
			
			showTasks(); 
		}
	});
}

function acceptOrCancelTask(index){
	arrayToDo[index].status = Math.abs(arrayToDo[index].status-1);
	
	showTasks();
}

//отображение списка дел
function showTasks(){
	let listToDo = document.getElementById('list-todo');
	
	let newLiTag = "";
	arrayToDo.forEach((element, index) => {
		if(element.status==0){//не выполнено
			newLiTag +=	`<li>${element.text}
						<span class="trash" onclick="deleteTask(${index})">
							<i class="fas fa-trash"></i>
						</span>
						<span class="edit" id="edit${index}" onclick="editTask(${index})" >
							<i class="fas fa-edit"></i>
						</span>
						<span class="accept" onclick="acceptOrCancelTask(${index})">
							<i class="fas fa-check"></i>
						</span>
                	</li>`;
		}
		else{//выполнено
			newLiTag +=	`<li style="background: rgb(85, 231, 141);">${element.text}
						<span class="trash" onclick="deleteTask(${index})">
							<i class="fas fa-trash"></i>
						</span>
						<span class="edit" id="edit${index}" onclick="editTask(${index})" >
							<i class="fas fa-edit"></i>
						</span>
						<span class="cancel" onclick="acceptOrCancelTask(${index})">
							<i class="fas fa-window-close"></i>
						</span>
                	</li>`;
		}
	  	
	});

	listToDo.innerHTML = newLiTag;
}



document.getElementById('save').addEventListener('click', function() {
    let jsonStr = JSON.stringify(arrayToDo, null, 2);

    let url = "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr);

    let download = document.createElement('a');
    download.href = url;
    download.download = "todolist.json";

    download.click();
});


document.getElementById('load').addEventListener('click', function() {
	document.getElementById('file-input').click(); 
});

document.getElementById('file-input').addEventListener('change', function() {
	const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            arrayToDo = JSON.parse(e.target.result);
            showTasks();
        };
        reader.readAsText(file);
    }
});
