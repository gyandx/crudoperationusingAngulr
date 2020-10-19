import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { DataService } from './dataService.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Crud Application Using Angular-In-Memory-Web-Api'; //title of the project
  player : Player[] = []; //player variable is of Player class type
  playerId: number = null        //variable to store player id
  show: string = 'none'; // To show the add Data form
  types = ['WK','Batting','Bowling','All-Rounder'] //select tag values
  teams = ['CSK','RCB','RR','DB', 'SRH', 'KKR', 'MI', 'KXIP'] //select tag values
  addDataForm: FormGroup; //Add Data Form assign of formgroup type
  idMatch : boolean = false; //Variable to check id is matched or not
  toast: boolean = false; //Variable to show msg if form action is successfully done
  toastDel: boolean = false; //Variable to show msg if data delete action is successfully done
  toastUpdate: boolean = false; //Variable to show msg if data updated action is successfully done
  showModal: boolean = false; // variable to show modal on row click

  constructor(private dataService: DataService, private _fb: FormBuilder){
  }

  ngOnInit(){
    this.getAllPlayers() //calling getAllPlayers function
    this.createAddForm()  //calling createForm function
  }

  //method to get all Players
  getAllPlayers(){
    this.dataService.getPlayers().subscribe(
      res=>{
        if(res){
          this.player = res;
        }
      },
      err=>{
        alert(err.error.body) //if error comes it shows alert of error body
      }
    )
  }

  //creating add form
  createAddForm(){
    this.addDataForm = this._fb.group({                 //using formBuilder to create raectiveform group
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      average: new FormControl('', Validators.required)
    })
  }

  getControls(){
    return this.addDataForm['controls'] //accessing the formControl of each field
  }

  //checking if input playerId is present in player table
  checkMatch(playerId){
    let player = parseInt(playerId)

    const result = this.player.filter(res=> res.id === player) //using filter function to filter particular id form player array
    if( result.length != 0){ //checking result array length is 0 or not
      if(result[0].id === player){ //checking result of array index 0 id is matched from input form id
        this.idMatch = true         //if matched then assign true to isMatch variable
        return                        //if matched then return without going further check
      }else{
        this.idMatch = false    //if matched then assign false to isMatch variable
      }
    }else{
      this.idMatch = false        //if res array length is 0 then assign false to idMatched
    }
  }

  //calling add Player function to add new player to Player Table
  createPlayer(form){
    if(this.playerId){
      this.dataService.updatePlayer(this.addDataForm.value).subscribe(
        res=>{
          if(res){
            this.toastUpdate = true
            setTimeout(()=>{   //after 2 sec closes the toast msg
              this.toastUpdate = false
              this.getAllPlayers()
            },2000)
            this.addDataForm.reset() //reset the addForm
            this.hideForm()
          }
        }
      )
    }else{
      this.dataService.addPlayers(form.value).subscribe(
        res=>{
          if(res){
            this.toast = true
            setTimeout(()=>{   //after 2 sec closes the toast msg
              this.toast = false
              this.getAllPlayers()
            },2000)
            this.addDataForm.reset() //reseting the form
          }
        },
        err=>{
          alert(err.error.body) //if error comes it shows alert of error body
        }
      )
    }
  }

  //set value fuction to set value to the form controls
  setValue(res){
    this.addDataForm.setValue({
      id: res.id,
      name: res.name,
      team: res.team,
      type: res.type,
      average: res.average
    })
  }

  //get particular player through id function
  getPlayer(id){
    this.dataService.getPlayersById(parseInt(id)).subscribe(  //parseInt in a js function to convert string to integer
      res=>{
        if(res){
          this.setValue(res) //calling setValue function
        }
        this.showModal = true
      },
      err=>{
        alert(err.error.body) //if error comes it shows alert of error body
      }
    )
  }

  //delete player function
  deletePlayer(id){
    if(confirm(`Are you want to delete ${id}`)){
      this.dataService.deletePlayer(parseInt(id)).subscribe(
        res=>{
          this.toastDel = true
          setTimeout(()=>{  //after 2 sec closes the toast msg
            this.toastDel = false
          }, 2000)
          this.getAllPlayers()
        },
        err=>{
          alert(err.error.body) //if error comes it shows alert of error body
        }
      )
    }
  }

  //update player function
  updatePlayer(playerData){
    this.setValue(playerData)
    this.playerId = playerData.id
    this.showForm()
  }

  //hide or show add data form function
  showForm(){
    this.show = 'block'; //to change display of form i.e to show the add Form
  }

  hideForm(){
    this.show = 'none'; //to change display of form i.e to hide the add Form
  }


}
