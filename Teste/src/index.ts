



//class com todos os valores pedidos
class Task{
    id: number;
    title: string;
    date: string;
    order: number;

    constructor(id: number, title: string, date:string, order:number){
        this.id = id;
        this.title = title;
        this.date = date;
        this.order = order;
    }
}

//estancia o array
let taskArray:Task[];

let Id = 0;

//Quando a Janela for carregada, obter informações da Local
window.onload = function (){
    RetrieveLocal();
}

function AddTask(){

    if(!taskArray){
        //Pegar taskList da Local
        const storedTaskList = localStorage.getItem('taskList');
        //Atribuir ao Array o valor adquirido na Local
        taskArray = storedTaskList ? JSON.parse(storedTaskList) : [];
    }

    //Get the id where it stopped
    const storedIdStart = localStorage.getItem('idStart');
    //Convert the Id to Int
    Id= storedIdStart ? parseInt(storedIdStart,10) : 0;

    if((<HTMLInputElement>document.getElementById("inputTitle")).value == ""){
        alert('Ponha algo no Nome da Tarefa');
    }
    else{
        //Cria uma linha nova
        var app = document.getElementById("myList");
        const ln = document.createElement("tr");
        app?.appendChild(ln);

        //Busca o id e poe la
        const colId = document.createElement("th");
        colId.textContent = localStorage.getItem('actualId');
        ln?.appendChild(colId);

        //Busca e adiciona a lista o nome da task
        const colTitle = document.createElement("th");
        const colTask = (<HTMLInputElement>document.getElementById("inputTitle")).value;
        colTitle.textContent = colTask; 
        ln?.appendChild(colTitle);
        
        //Busca a data e poe na tabela
        const colDate = document.createElement("th");
        let date = new Date();
        colDate.textContent = date.toLocaleDateString();
        ln?.appendChild(colDate);    

        //Cria um index no array
        if(!taskArray)
            taskArray = []

        Id++;

        //Save IDStart
        localStorage.setItem('idStart' , Id.toString());

        //Salvar ID Atual
        let actualId = Id ;
        localStorage.setItem('actualId',JSON.stringify(actualId));

        //Pega nos valores
        let newTask = new Task(Id, colTask, date.toLocaleDateString(), 0);
        //manda para a class
        taskArray.push(newTask);

        console.log(taskArray);


        //Guardar Localmente
        SaveLocal();

        //Dar Refresh na página
        window.location.reload();
    }
}

function SaveLocal(){
    
    //Verificar se a taskList é nula ou indefinida
    if(!taskArray){
        console.error('tasklist é nula/indefinida');
        return;
    }

    //Guardar ID onde iremos começar da próxima vez
    let actualId = parseInt(localStorage.getItem('actualId') || '0', 10) + 1;

    //Definir na Local
    localStorage.setItem('actualId' , actualId.toString());

    //Guardar o Array das Tasks na Local
    localStorage.setItem('taskList',JSON.stringify(taskArray));
}


function RetrieveLocal(): void{

    //Retirar da LocalStorage
    const storedTaskList = localStorage.getItem('taskList');

    //Converter de volta para um array
    const taskListed = storedTaskList ? JSON.parse(storedTaskList) : [];
    
    //Mostrar Array na Consola
    console.log(taskListed);

    let tableTasks = document.getElementById("myList");

    //Dar um loop com o ciclo FOR para Criar as colunas e as Rows
    for(let task of taskListed){
        let tr = document.createElement("tr");
        tableTasks?.appendChild(tr);

        //////////////////////////////////////////////////////
        //Mostra Id
        let collumId = document.createElement("th");
        collumId.textContent = task.id.toString();
        tr.appendChild(collumId);

        //////////////////////////////////////////////////////
        //Mostra Nome
        let collumTask = document.createElement("th");
        collumTask.textContent =  task.title;
        tr.appendChild(collumTask);

        //////////////////////////////////////////////////////
        //Mostra data
        let collumDate = document.createElement("th");
        collumDate.textContent =  task.date;
        tr.appendChild(collumDate);

        //////////////////////////////////////////////////////
        //Mostra Butão de editar
        let collumEdit = document.createElement("th");
        let buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Editar";
        
        //Busca o novo valor
        const colTask = (<HTMLInputElement>document.getElementById("inputTitle")).value;

        //Quando o Botão de editar for clicked, iniciar function EditTask
        buttonEdit.onclick = function(){
            Edit(task.id,colTask);
        }
        collumEdit.appendChild(buttonEdit);
        tr.appendChild(collumEdit);
    
        //////////////////////////////////////////////////////
        //Mostra Butão de remover
        let collumRemove = document.createElement("th");
        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Remover"
        buttonRemove.onclick = function(){
            Remove(task.id);
            tableTasks?.removeChild(tr);
        }
        collumRemove.appendChild(buttonRemove);
        tr.appendChild(collumRemove);

    }

}

function Remove(id : number) {
    if(!taskArray){
        const storedTaskList = localStorage.getItem('taskList');
        taskArray = storedTaskList ? JSON.parse(storedTaskList) : [];
        //Reload Page
        window.location.reload();
    }

    taskArray = taskArray.filter(task => task.id !== id);
    SaveLocal();
}

function Edit(id: number, newTaskName: string) {

    //Pegar Valor inserido pelo utilizador
    const newTaskNameInput = document.querySelector('#inputTitle') as HTMLInputElement;   // Pode ser substituido
    newTaskName = newTaskNameInput.value;

    //Se não houver task list dar pull do localstorage
    if (!taskArray) {
        const storedTaskList = localStorage.getItem('taskList');
        taskArray = storedTaskList ? JSON.parse(storedTaskList) : [];
    }
    
    //Encontrar ID para editar a Task
    const taskToUpdate = taskArray.find(task => task.id === id);
    
    if (taskToUpdate) {
        taskToUpdate.title = newTaskName;
        SaveLocal();
        
        // Atualizar a Row com o novo nomeda TaskName
        const tableRow = document.querySelector(`#tasks tr[data-id="${id}"]`);
        const taskNameColumn = tableRow?.querySelector('td:nth-child(2)');
        if (taskNameColumn) {
            taskNameColumn.textContent = newTaskName;
        }
        
        // Atualizar o Array
        const taskIndex = taskArray.findIndex(task => task.id === id);
        taskArray[taskIndex].title = newTaskName;

        //Dar Refresh a pagina
        window.location.reload();
    }     
}