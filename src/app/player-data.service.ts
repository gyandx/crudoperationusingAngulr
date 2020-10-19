import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerData implements InMemoryDbService {

  createDb(){
    const players: Player[] = [
      {id: 1, name: 'MS Dhoni', team: 'CSK', type: 'WK', average: 41.52},
      {id: 2, name: 'Virat Kholi', team: 'RCB', type: 'Batting', average: 37.91},
      {id: 3, name: 'Rohit Sharma', team: 'MI', type: 'Batting', average: 31.37},
      {id: 4, name: 'Bhubaneswar Kumar', team: 'SRH', type: 'Bowling', average: 4.00},
      {id: 5, name: 'SHREYAS GOPAL', team: 'RR', type: 'All-Rounder', average: 3.50}
    ];

    return {players}
  }

  constructor() { }
}
