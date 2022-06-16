import { Fragment, useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Stream from "./components/Video/Stream";
import Chat from "./components/Chat/Chat";
import Container from "./UI/Container";
import SettingModal from "./components/Header/SettingModal";
import SideBar from "./components/SideBar/SideBar";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [showStream, setShowStream] = useState(false);
  // const [searchedStreams, setSearchedStreams] = useState("");
  const [searchedStreams, setSearchedStreams] = useState([]);
  const [addStreamButton, setAddStreamButton] = useState(0);

  console.log(searchedStreams);

  const addStream = (value) => {
    setShowStream(true);
    setSearchedStreams([...searchedStreams, value]);
  };
  // setAddStreamButton(addStreamButton + 1);

  const clickAddStreamButton = () => {
    setAddStreamButton(addStreamButton + 1);
    setSearchedStreams("");
  };

  return (
    <Fragment>
      <Header
        setStreams={setSearchedStreams}
        addStream={addStream}
        clickAddStreamButton={clickAddStreamButton}
      >
        <SettingModal />
      </Header>
      <SideBar />
      {!showStream && <HomePage onClick={addStream} />}
      {showStream && (
        <Container>
          <Chat url={searchedStreams.label} />
          <Stream
            url={searchedStreams}
            searchedStreams={searchedStreams}
            key={searchedStreams.value}
          />
        </Container>
      )}
    </Fragment>
  );
}

export default App;

// {streamList.map((stream) => (
//   <Stream url={stream.url} />
// ))}

// const streamList = [
//   {
//     url: "http://twitter.com",
//   },
//   {
//     url: "http://twitch.com",
//   },
// ];
