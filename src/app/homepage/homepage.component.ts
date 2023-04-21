import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public params: string = "";
  public poke_list: any;
  public limit: number = 12;
  public offset: number = 0;
  public img_url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  public max: number = 900;
  public pages: any = [];
  public page: number = 1;
  public count_page: number = 0;
  public name: string = "";
  public loading: boolean = true;

  constructor(public adminService: AdminService) { }

  ngOnInit(){
    this.filterData("all")
  }

  filterData(type:string, pokemon?:any){
    this.loading = true;
    let param = "";
    type = pokemon == "" ? "all" : type;
    if (type == "all") {
      param = "pokemon?limit="+this.limit+"&offset="+this.offset;
      console.log(param);
    }else{
      param = "pokemon/"+pokemon;
      console.log(param);
    }
    
    this.adminService.allData(param).subscribe((data: any) => {
      
      if (type != "name" || this.name == "") {
        this.poke_list = data.results;
        this.count_page = this.max/12;
        for (let i = 0; i < this.count_page; i++) {
          this.pages.push(i+1);
        }
      
        for (let i = 0; i < this.poke_list.length; i++) {
          let id = this.poke_list[i].url.split('/')[6];
          this.adminService.properties("pokemon/"+id).subscribe((data: any) => {
            this.poke_list[i].properties = data;
          });
        }
        console.log(this.poke_list);
      }else{
        this.poke_list = data;
        this.poke_list.url = this.poke_list.forms[0].url;
        let id = this.poke_list.url.split('/')[6];
        let id_format = id.length == 1 ? "00"+id : (id.length == 2 ? "0"+id : id);
        this.poke_list.imgUrl = this.img_url+id_format+".png";
      }
      console.log(this.poke_list);
      this.loading = false;
    });
  }

  getImage(url:string){
    let id = url.split('/')[6];
    let id_format = id.length == 1 ? "00"+id : (id.length == 2 ? "0"+id : id);
    
    
    return this.img_url+id_format+".png";
  }

  prevPage(){
    this.offset = this.offset-this.limit;
    this.page = this.page-1;
    this.filterData("all");
  }

  changePage(event?:any){
    this.offset = this.limit*(this.page-1);
    console.log(this.limit,this.page);
    
    this.filterData("all");
  }

  nextPage(){
    this.offset = this.limit*this.page;
    this.page = this.page+1;
    this.filterData("all");
  }

}
