import inithinithu from "../assets/inithuinithu_book.jpeg";

import arivuamudhu from "../assets/Arivuamudhu_book.png";
import Paachcharam from "../assets/Paachcharam_book.png";
const products = [
  {
    id: 1,
    title: "Inithinithu",

    category: "Baby Songs",

    price: 80,

    images: [
     inithinithu,
    ],

    description:
      "Tamil rhymes book designed for preschool kids.",
  },

  {
    id: 2,

    title: "Arivuamudhu",

    category: "Baby Songs",

    price: 80,

    images: [
  arivuamudhu,
    ],

    description:
      "Tamil rhymes book designed for preschool kids.",
  },

  {
    id: 3,

    title: "Paachcharam",

    category: "Kids Stories",

    price: 120,

    images: [
      Paachcharam,
    ],

    description:
      "Beautiful Tamil story book for kids with colorful illustrations.",
  },

];

export default products;
