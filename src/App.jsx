import { useEffect, useState } from "react";
import "./App.css";
import Controls from "./Controls";
import Drumpads from "./Drumpads";

function App() {
  const [newId, setNewId] = useState("");
  const [elements, setElements] = useState(null);
  const [audioType, setAudiotype] = useState("");
  const [muted, setMuted] = useState(false);

  const clickedId = (id) => {
    setNewId(id);
  };

  const passElements = (allelements) => {
    setElements(Array.from(allelements));
  };

  const currentAudioType = (audioType) => {
    setAudiotype(audioType);
  };

  const muteAudio = (value) => {
    setMuted(value);
  };

  return (
    <>
      <div id="drum-machine">
        <Drumpads
          passToParent={clickedId}
          passElements={passElements}
          newAudioType={audioType}
          muted={muted}
        />
        <Controls
          passedIdValue={newId}
          allelements={elements}
          currentAudioType={currentAudioType}
          muteAudio={muteAudio}
        />
      </div>
      <div id="developerDiv">
        <p>Designed and Coded By</p>
        <p id="developer">Baraka Karuru</p>
      </div>
    </>
  );
}

export default App;
