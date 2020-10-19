import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //import HttpClient from angular/common/http
import { Player } from './player'; //imported the player class
import { map } from 'rxjs/operators'; // import map operator from rxjs library i.e used to transform each data

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = '/api/players'; //created data can be accessed using this apiUrl from playerDataService

  constructor(private http: HttpClient) { } //injected the HTtp service to communicate with data

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/Json')
  options = {
    headers: this.httpHeaders // passing the header in options body for update & create method
  }

  //methods
  getPlayers = () => {return this.http.get<Player[]>(this.apiUrl)} //getAllPlayers from player-data-service
  getPlayersById = (id) => {return this.http.get<Player>(this.apiUrl + '/' + id)} //get particular Player from player-data-service using id
  addPlayers = (data) => {return this.http.post<Player>(this.apiUrl, data, this.options)} //add Player To Player Table
  deletePlayer = (id) => {return this.http.delete<Player>(this.apiUrl + '/' + id, this.options)} //delete Player from Player Table
  updatePlayer = (data: Player) => {return this.http.put<Player>(this.apiUrl + '/' + data.id, data, this.options).pipe(map(()=> data))}
}
