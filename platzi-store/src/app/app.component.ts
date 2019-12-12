import { Component } from "@angular/core";

import { IProduct } from "./product.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "platzi-store";
  items = ["Nicolas", "Andrés", "Julian", "Santiago"];
  dynamicItem = "";
  products: IProduct[] = [
    {
      id: "1",
      image: "assets/images/camiseta.png",
      title: "Camiseta",
      price: 80000,
      description: "bla bla bla bla bla"
    },
    {
      id: "2",
      image: "assets/images/hoodie.png",
      title: "Hoodie",
      price: 80000,
      description: "bla bla bla bla bla"
    },
    {
      id: "3",
      image: "assets/images/mug.png",
      title: "Mug",
      price: 80000,
      description: "bla bla bla bla bla"
    },
    {
      id: "4",
      image: "assets/images/pin.png",
      title: "Pin",
      price: 80000,
      description: "bla bla bla bla bla"
    },
    {
      id: "5",
      image: "assets/images/stickers1.png",
      title: "Stickers",
      price: 80000,
      description: "bla bla bla bla bla"
    },
    {
      id: "6",
      image: "assets/images/stickers2.png",
      title: "Stickers",
      price: 80000,
      description: "bla bla bla bla bla"
    }
  ];

  handleAddItem() {
    this.items.push(this.dynamicItem);
    this.dynamicItem = "";
  }

  handleDeleteItem(index: number) {
    this.items.splice(index, 1);
  }
}
