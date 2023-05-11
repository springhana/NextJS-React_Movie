interface infoType {
  ref: string;
  img: string;
  title: string;
  url: string;
  contain: string;
}

const info: infoType[] = [
  {
    ref: "ref1",
    img: "/images/teacher.png",
    title: "Lecture",
    url: "https://nomadcoders.co/",
    contain: "NomadCoders.co",
  },
  {
    ref: "ref2",
    img: "/images/api.png",
    title: " API",
    url: "https://www.themoviedb.org/documentation/api",
    contain: "The Movie Database",
  },
  {
    ref: "ref3",
    img: "/images/flaticon.png",
    title: "Icons",
    url: "https://www.flaticon.com/",
    contain: "flaticon",
  },
  {
    ref: "ref4",
    img: "/images/font-adjustment.png",
    title: "Font",
    url: "https://github.com/hurss/fonts",
    contain: "hurss/fonts",
  },
  {
    ref: "ref5",
    img: "/images/github.png",
    title: "Github",
    url: "https://github.com/springhana/NextJS-React_Movie",
    contain: "springhana/NextJS-React_Movie",
  },
];

export default info;
