import { useState } from "react";
import "./App.css";
import { Route, Routes} from "react-router-dom";
import MainPage from "./components/Main_components/MainPage";
import { AuthContextProvider } from "./context/AuthContext";
import NeedToLogIn from "./components/Main_components/NeedToLogIn";
import Help from "./components/Main_components/Help";
import CustomLink from "./components/Main_components/CustomLink";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CertainTrack2 from "./components/Main_components/CertainTrack copy";

function App() {
  //declaring states and  consts
  const [tracks, setTracks] = useState([]);
  const [links, setLinks] = useState([]);
  const [success, setSuccess] = useState("s");
  const [name, setName] = useState("");

  return (
    <SkeletonTheme baseColor="#c4c4c4" highlightColor="#fff">
      <AuthContextProvider>
        <div>
          <div className="App">
            {/* <Header title="Awesome" success={success} name={success}/> */}
            {/*   <div className="container">{newTracks}</div> */}
            <Routes>
              <Route
                path="/"
                element={
                  <MainPage
                    allTrack={tracks}
                    allLinks={links}
                    getDownData={success}
                    getDownData2={name}
                    allLinksSetter={setLinks}
                    allTracksSetter={setTracks}
                  />
                }
              />
              <Route path="/needtologin" element={<NeedToLogIn />} />
              <Route path="/help" element={<Help />} />
              <Route path="/tracks/:id/:hashcode" element={<CustomLink />} />
              <Route
              path="/tracks/:id/2"
              element={
              
                  <CertainTrack2
                    allTrack={tracks}
                    getDownData={success}
                    getDownData2={name}
                    /* getDownData3={slots}  */ //getUpData={setChange}
                  />
              
              }
            />
            </Routes>
          </div>
        </div>
      </AuthContextProvider>
    </SkeletonTheme>
  );
}

export default App;
