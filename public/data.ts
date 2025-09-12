export interface Candle {
  id: string
  name: string
  price: number
  originalPrice?: number
  packPrice?: number
  image: string
  images?: string[] // Additional images for the candle
  description: string
  scent: string
}

export interface CartItem extends Candle {
  quantity: number
}

export interface BestSeller {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  description: string
  scent: string
}

export const candlesData: Candle[] = [
  {
    id: "1",
    name: "Shades of Nature",
    price: 199,
    originalPrice: 249,
    image: "/shades-of-nature-main.jpg",
    images: [
      "/shades-of-nature-main.jpg",
      "/shades-of-nature1.jpg",
      "/shades-of-nature2.jpg",
      "/shades-of-nature3.jpg",
    ],
    description:
      "A beautifully crafted jar candle with a romantic rose fragrance, perfect for creating a warm and inviting atmosphere.",
    scent: "Floral",
  },
  {
    id: "2",
    name: "Motichoor Laddu Candle",
    price: 199,
    originalPrice: 249,
    image: "/motichoor-laddu-candle.jpg",
    description:
      "This elegant peony-scented jar candle combines floral and rose notes to bring a touch of sophistication to any space.",
    scent: "Floral, Rose",
  },
  {
    id: "3",
    name: "Rose Teddy Candle",
    price: 149,
    originalPrice: 199,
    image: "/rose-teddy-candle-main.jpg",
    images: [
      "/rose-teddy-candle-main.jpg",
      "/rose-teddy-candle1.jpg",
      "/rose-teddy-candle2.jpg",
      "/rose-teddy-candle3.jpg",
      "/rose-teddy-candle4.jpg"
    ],
    description:
      "A luxurious candle with a blend of vanilla and floral scents, ideal for adding warmth and elegance to your home.",
    scent: "Vanilla, Floral",
  },
  {
    id: "4",
    name: "Blooming Heart Tin Candle",
    price: 250,
    originalPrice: 349,
    image: "/Blooming-Heart-Tin-Candle-main.jpg",
    images: [
      "/Blooming-Heart-Tin-Candle-main.jpg",
      "/Blooming-Heart-Tin-Candle1.jpg",
      "/Blooming-Heart-Tin-Candle2.jpg",
      "/Blooming-Heart-Tin-Candle3.jpg",
    ],
    description:
      "A compact candle with a delightful mix of floral, rose, and lavender scents, perfect for small spaces or gifting.",
    scent: "Floral, Rose, Lavender",
  },
  {
    id: "5",
    name: "Luxury Marble Jar Candle",
    price: 249,
    image: "/Marble-candle-lavender-main.jpg",
    images: [
      "/Marble-candle-lavender-main.jpg",
      "/Marble candle lavender1.jpg",
      "/Marble candle lavender2.jpg",
      "/Marble candle lavender3.jpg",
    ],
    description:
      "A soothing lavender-scented jar candle with a marble finish, designed to promote relaxation and tranquility.",
    scent: "Lavender",
  },
  {
    id: "6",
    name: "Shades of Nature Blue Candle",
    price: 240,
    image: "/Shades-of-Nature-blue-main.jpg",
    images: [
      "/Shades-of-Nature-blue-main.jpg",
      "/Shades-of-Nature-blue1.jpg",
      "/Shades-of-Nature-blue2.jpg",
      "/Shades-of-Nature-blue3.jpg",
    ],
    description:
      "A charming small candle infused with the classic scent of roses, ideal for romantic settings or thoughtful gifts.",
    scent: "Rose",
  },
  {
    id: "7",
    name: "Rose Heart Jar Candle",
    price: 499,
    image: "/Rose-Heart-Jar-Candle-main.jpg",
    images: [
      "/Rose-Heart-Jar-Candle-main.jpg",
      "/Rose-Heart-Jar-Candle1.jpg",
      "/Rose-Heart-Jar-Candle1.jpg",
      "/Rose-Heart-Jar-Candle1.jpg",
    ],
    description:
      "A stunning bouquet of scented candles with a floral fragrance, perfect as a centerpiece or luxurious gift.",
    scent: "Floral",
  },
  {
    id: "8",
    name: "Peony Jar Candle",
    price: 200,
    originalPrice: 249,
    image: "/Peony-Jar-Candle-main.jpg",
    images: [
      "/Peony-Jar-Candle1.jpg",
      "/Peony-Jar-Candle2.jpg",
      "/Peony-Jar-Candle3.jpg",
      "/Peony-Jar-Candle4.jpg",
      "/Peony-Jar-Candle5.jpg",
    ],
    description:
      "A pack of four candles inspired by the sweet aroma of mothi choor laddu, offering a warm vanilla scent.",
    scent: "Vanilla",
  },
  {
    id: "9",
    name: "Mini Bubble Candles",
    price: 199,
    image: "/Mini Bubble Candles.jpg",
    description:
      "A pack of three mini bubble candles with a blend of floral, vanilla, rose, and lavender scents for a versatile ambiance.",
    scent: "Floral, Vanilla, Rose, Lavender",
  },
  {
    id: "10",
    name: "Scented Candles Bouquet",
    price: 499,
    originalPrice: 649,
    image: "/Scented-Candles-Bouquet.jpg",
    description:
      "A heart-shaped tin candle with floral and rose notes, designed to add a touch of romance to any setting.",
    scent: "Floral, Rose",
  },
  {
    id: "11",
    name: "Luxury Sinking Heart's Jar Candle",
    price: 299,
    image: "/sinking-hearts-main.jpg",
    images: [
      "/sinking-hearts1.jpg",
      "/sinking-hearts2.jpg",
      "/sinking-hearts3.jpg",
    ],
    description:
      "A single candle with a vibrant floral scent, inspired by tulips and daisies, perfect for a fresh and lively atmosphere.",
    scent: "Floral",
  },
  {
    id: "12",
    name: "Scented Diya Candle",
    price: 160,
    image: "/scented-diya-candle.jpg",
    description:
      "A beautifully designed marble candle with a refreshing floral daisy scent, ideal for modern home decor.",
    scent: "Floral",
  },
  {
    id: "13",
    name: "Jar of Hearts",
    price: 299,
    image: "/jar-of-hearts-main.jpg",
    images: [
      "/jar-of-hearts1.jpg",
      "/jar-of-hearts2.jpg",
      "/jar-of-hearts3.jpg",
      "/jar-of-hearts4.jpg",
      "/jar-of-hearts5.jpg",
    ],
    description:
      "A pack of six floating candles with a floral daisy fragrance, perfect for creating a serene and elegant ambiance.",
    scent: "Floral",
  },
  {
    id: "14",
    name: "Luxury Marble Jar Candle",
    price: 299,
    originalPrice: 399,
    image: "/luxury-marble-jar-candle.jpg",
    description:
      "An elegant marble jar candle with a sophisticated design, perfect for adding a touch of luxury to any room.",
    scent: "Sandalwood, Vanilla",
  },
  {
    id: "15",
    name: "Elegant Floral Candle Set",
    price: 319,
    originalPrice: 399,
    image: "/elegant-floral-candle-set.jpg",
    description:
      "A beautiful set of floral-designed candles that bring a touch of nature and elegance to your home decor.",
    scent: "Rose, Jasmine",
  },
  {
    id: "16",
    name: "Scented Diya Candle",
    price: 45,
    originalPrice: 50,
    packPrice: 160,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "Beautiful scented diya candles, perfect for festive occasions and home decoration. Single piece ₹45, pack of 4 for ₹160.",
    scent: "Customizable",
  },
  {
    id: "17",
    name: "Scented T-Light Candles",
    price: 278,
    originalPrice: 300,
    image: "/placeholder.svg?height=260&width=280",
    description: "Pack of 6 scented t-light candles, perfect for creating a warm and inviting atmosphere in any room.",
    scent: "Customizable",
  },
  {
    id: "18",
    name: "Rose Teddy Candle",
    price: 150,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "Adorable rose-scented teddy bear shaped candle, perfect for gifting and adding a cute touch to your decor.",
    scent: "Rose, Customizable",
  },
  {
    id: "19",
    name: "Motichoor Laddu Candle",
    price: 199,
    originalPrice: 250,
    image: "/placeholder.svg?height=260&width=280",
    description: "Pack of 6 motichoor laddu shaped candles, perfect for festive occasions and celebrations.",
    scent: "Sweet, Customizable",
  },
  {
    id: "20",
    name: "Scented Modak Candle",
    price: 250,
    originalPrice: 300,
    image: "/placeholder.svg?height=260&width=280",
    description: "Pack of 9 scented modak shaped candles, ideal for festivals and special occasions.",
    scent: "Sweet, Customizable",
  },
  {
    id: "21",
    name: "Shades of Nature Scented Candles",
    price: 249,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "Beautiful layered candles inspired by the colors of nature, perfect for adding a touch of elegance to any room.",
    scent: "Natural, Customizable",
  },
  {
    id: "22",
    name: "Combo 2Diya+2Laddu Candles",
    price: 150,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "Combination pack of 2 diya candles and 2 laddu candles, perfect for festive occasions and celebrations.",
    scent: "Customizable",
  },
]

export const bestSellersData: BestSeller[] = [
  {
    id: "bs1",
    name: "Scented Candles Bouquet",
    category: "Candles",
    price: 499,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "A stunning bouquet of scented candles with a floral fragrance, perfect as a centerpiece or luxurious gift.",
    scent: "Floral",
  },
  {
    id: "bs2",
    name: "Luxury Marble Jar Candle",
    category: "Premium",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "An elegant marble jar candle with a sophisticated design, perfect for adding a touch of luxury to any room.",
    scent: "Sandalwood, Vanilla",
  },
  {
    id: "bs3",
    name: "Elegant Floral Candle Set",
    category: "Gift Sets",
    price: 319,
    originalPrice: 399,
    image: "/placeholder.svg?height=260&width=280",
    description:
      "A beautiful set of floral-designed candles that bring a touch of nature and elegance to your home decor.",
    scent: "Rose, Jasmine",
  },
]
