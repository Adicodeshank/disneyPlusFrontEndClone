import styled from "styled-components";
import React, { useEffect } from "react";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Reccomendation from "./Reccomendation";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { db } from "../firebaseConfig";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trending = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        switch (doc.data().type) {
          case "recommend":
            console.log(recommends);
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            console.log(newDisneys);
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            console.log(originals);
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            console.log(trending);
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    };

    fetchData();
  }, []);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Reccomendation />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
  width:90vw;
`;

export default Home;

// import styled from "styled-components";
// import React from "react";
// import ImageSlider from "./ImageSlider";
// import Viewers from "./Viewers";
// import Reccomendation from "./Reccomendation";
// import NewDisney from "./NewDisney";
// import Orignals from "./Orignals";
// import Trending from "./Trending";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { app } from "../firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { setMovies } from "../features/movie/movieSlice";
// import { selectUserName } from "../features/user/userSlice";
// import { db } from "../firebaseConfig";
// const Home = (props) => {
//   const dispatch = useDispatch();
//   const userName = useSelector(selectUserName);
//   let recommends = [];
//   let newDisneys = [];
//   let originals = [];
//   let trending = [];

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const querySnapshot = await getDocs(collection(db, "movies"));
//       querySnapshot.forEach((doc) => {
//         console.log(doc);
//         switch (doc.data().type) {
//           case "recommend":
//             recommends.push({ id: doc.id, ...doc.data() });
//             break;
//           case "new":
//             newDisneys.push({ id: doc.id, ...doc.data() });
//             break;
//           case "original":
//             originals.push({ id: doc.id, ...doc.data() });
//             break;
//           case "trending":
//             trending.push({ id: doc.id, ...doc.data() });
//             break;
//         }
//       });

//       dispatch(
//         setMovies({
//           recommended: recommends,
//           newDisney: newDisneys,
//           original: originals,
//           trending: trending,
//         })
//       );
//     };

//     fetchMovies();
//   }, [userName]);

//   return (
//     <Container>
//       <ImageSlider />
//       <Viewers />
//       <Reccomendation />
//       <NewDisney />
//       <Orignals />
//       <Trending />
//     </Container>
//   );
// };

// const Container = styled.main`
//   position: relative;
//   min-height: calc(100vh - 250px);
//   overflow-x: hidden;
//   display: block;
//   top: 72px;
//   padding: 0 calc(3.5vw + 5px);

//   &:after {
//     background: url("/images/home-background.png") center center / cover
//       no-repeat fixed;
//     content: "";
//     position: absolute;
//     inset: 0px;
//     opacity: 1;
//     z-index: -1;
//   }
// `;

// export default Home;
