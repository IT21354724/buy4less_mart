import a4paper from "@/assets/products/a4paper.png";
import lunchsheets from "@/assets/products/lunchsheets.png";
import serviette from "@/assets/products/serviette.png";
import sponge1 from "@/assets/products/sponge1.png";
import sponge24 from "@/assets/products/sponge24.png";
import steelwool12 from "@/assets/products/steelwool12.png";
import steelwool1 from "@/assets/products/steelwool1.png";

export type Product = {
  id: string;
  name: string;
  quantity: string;
  price: number;
  image: string;
  category: "Cleaning" | "Paper & Kitchen";
};

export const products: Product[] = [
  { id: "a4-paper-1kg", name: "A4 Paper", quantity: "1 kg", price: 500, image: a4paper, category: "Paper & Kitchen" },
  { id: "lunch-sheets-350", name: "Lunch Sheets", quantity: "350 sheets", price: 600, image: lunchsheets, category: "Paper & Kitchen" },
  { id: "serviette", name: "Serviette", quantity: "1 pack", price: 170, image: serviette, category: "Paper & Kitchen" },
  { id: "sponge-1", name: "Sponge", quantity: "1 piece", price: 15, image: sponge1, category: "Cleaning" },
  { id: "sponge-24", name: "Sponge", quantity: "24 pieces", price: 360, image: sponge24, category: "Cleaning" },
  { id: "steel-wool-1", name: "Steel Wool", quantity: "1 piece", price: 60, image: steelwool1, category: "Cleaning" },
  { id: "steel-wool-12", name: "Steel Wool", quantity: "12 pieces", price: 650, image: steelwool12, category: "Cleaning" },
];

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-LK")}`;
