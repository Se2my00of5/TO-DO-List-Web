showTasks();

function dict(text,flag=0){
	return {"text":text,"status":flag};
}

//добавление нового дела
document.getElementById('add-btn').addEventListener('click', function() {
    let inputText = document.getElementById('input-text');
    if (inputText.value.trim() !== '') {
		let getArrayToDo = localStorage.getItem("ArrayToDo"); 
		
		if(getArrayToDo == null){ 
		  arrayToDo = [];
		}
		else{
		  arrayToDo = JSON.parse(getArrayToDo);  
		}

		arrayToDo.push(dict(inputText.value.trim()));

		localStorage.setItem("ArrayToDo", JSON.stringify(arrayToDo)); 

		inputText.value = '';
		showTasks(); 
    }
});

//удаление дела
function deleteTask(index){
	let getArrayToDo = localStorage.getItem("ArrayToDo");

	arrayToDo = JSON.parse(getArrayToDo);

	arrayToDo.splice(index, 1); 

	localStorage.setItem("ArrayToDo", JSON.stringify(arrayToDo));

	showTasks(); 
}


//редактирование дела
function editTask(index){
	let getArrayToDo = localStorage.getItem("ArrayToDo");
	arrayToDo = JSON.parse(getArrayToDo);

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
			localStorage.setItem("ArrayToDo", JSON.stringify(arrayToDo));

			showTasks(); 
		}
	});
}

function acceptOrCancelTask(index){
	let getArrayToDo = localStorage.getItem("ArrayToDo");
	arrayToDo = JSON.parse(getArrayToDo);

	arrayToDo[index].status = Math.abs(arrayToDo[index].status-1);

	
	localStorage.setItem("ArrayToDo", JSON.stringify(arrayToDo));
	
	showTasks();
}

//отображение списка дел
function showTasks(){
	let getArrayToDo = localStorage.getItem("ArrayToDo");
	let listToDo = document.getElementById('list-todo');

	if(getArrayToDo == null){
	  arrayToDo = [];
	}
	else{
	  arrayToDo = JSON.parse(getArrayToDo); 
	}
	
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