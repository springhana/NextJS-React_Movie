/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
  },
  async redirect() {
    return [
      {
        source: "/popular",
        destination: "/populat/1",
        permanent: false,
      },
      {
        source: "/now_playing",
        destination: "/now_playing/1",
        permanent: false,
      },
      {
        source: "/top_rated",
        destination: "/top_rated/1",
        permanent: false,
      },
      {
        source: "/search/:keyword",
        destination: "/search/:keyword/1",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies", // /api/movies이 url에 검색하면 밑에 ↓ 주소가 뜬다
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
      {
        source: `/api/movies/popular/page=:page`,
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=:page`,
      },
      {
        source: `/api/movies/top_rated/page=:page`,
        destination: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=:page`,
      },
      {
        source: `/api/movies/now_playing/page=:page`,
        destination: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=:page`,
      },
      {
        source: `/api/search/keyword=:keyword/page=:page`,
        destination: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=:keyword&page=:page`,
      },
    ];
  },
};

module.exports = nextConfig;
