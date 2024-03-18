import React, { useEffect, useState } from "react";

function Drumpads({ passToParent, passElements, newAudioType, muted }) {
  const [clicked, setClicked] = useState(null);
  const [audioType, setAudioType] = useState("Heater");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setAudioType(newAudioType);
  }, [newAudioType]);

  useEffect(() => {
    const allAudioElements = document.querySelectorAll("audio");
    passElements(allAudioElements);
  }, []);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  //Array that holds the Piano and Heater Kit
  const kitsArr = [
    {
      pianoName: "Chord_1",
      pianoLink: "./public/Piano/Chord_1.mp3",
      heaterName: "heater_1",
      heaterLink: "./public/Heater/Heater-1.mp3",
      letter: "Q",
      click: "One",
    },
    {
      pianoName: "Chord_2",
      pianoLink: "./public/Piano/Chord_2.mp3",
      heaterName: "heater_2",
      heaterLink: "./public/Heater/Heater-2.mp3",
      letter: "W",
      click: "Two",
    },
    {
      pianoName: "Chord_3",
      pianoLink: "./public/Piano/Chord_3.mp3",
      heaterName: "heater_3",
      heaterLink: "./public/Heater/Heater-3.mp3",
      letter: "E",
      click: "Three",
    },
    {
      pianoName: "Shaker",
      pianoLink: "./public/Piano/Give_us_a_light.mp3",
      heaterName: "heater_4",
      heaterLink: "./public/Heater/Heater-4_1.mp3",
      letter: "A",
      click: "Four",
    },
    {
      pianoName: "Open_HH",
      pianoLink: "./public/Piano/Dry_Ohh.mp3",
      heaterName: "clap",
      heaterLink: "./public/Heater/Heater-6.mp3",
      letter: "S",
      click: "Five",
    },
    {
      pianoName: "Closed_HH",
      pianoLink: "./public/Piano/Bld_H1.mp3",
      heaterName: "Open_HH",
      heaterLink: "./public/Heater/Dsc_Oh.mp3",
      letter: "D",
      click: "Six",
    },
    {
      pianoName: "Punchy_Kick",
      pianoLink: "./public/Piano/punchy_kick_1.mp3",
      heaterName: "Kick_n'_Hat",
      heaterLink: "./public/Heater/Kick_n_Hat.mp3",
      letter: "Z",
      click: "Seven",
    },
    {
      pianoName: "Side_Stick",
      pianoLink: "./public/Piano/side_stick_1.mp3",
      heaterName: "Kick",
      heaterLink: "./public/Heater/RP4_KICK_1.mp3",
      letter: "X",
      click: "Eight",
    },
    {
      pianoName: "Snare",
      pianoLink: "./public/Piano/Brk_Snr.mp3",
      heaterName: "Closed_HH",
      heaterLink: "./public/Heater/Cev_H2.mp3",
      letter: "C",
      click: "Nine",
    },
  ];

  function addStyle(code) {
    setClicked(code);
    setTimeout(() => setClicked(null), 105);
  }

  const handleClick = (buttonId) => {
    if (isMuted) {
      return;
    } else {
      passToParent(buttonId); // Where i pass the button id to the parent then to controls.. these are the names.
      const audioId = document.getElementById(buttonId).innerText;
      const audioElement = document.getElementById(audioId);
      audioElement.currentTime = 0;
      audioElement.play();
    }
  };

  useEffect(() => {
    function keyPressed(event) {
      if (isMuted) {
        return;
      } else {
        const audioElement = document.getElementById(event.key.toUpperCase());

        const letters = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
        if (letters.includes(event.key.toUpperCase())) {
          audioElement.currentTime = 0;
          audioElement.play();

          if (audioType === "Heater") {
            for (let i = 0; i < kitsArr.length; i++) {
              if (kitsArr[i].letter === event.key.toUpperCase()) {
                passToParent(kitsArr[i].heaterName);
              }
            }
          } else {
            for (let i = 0; i < kitsArr.length; i++) {
              if (kitsArr[i].letter === event.key.toUpperCase()) {
                passToParent(kitsArr[i].pianoName);
              }
            }
          }

          for (let i = 0; i < kitsArr.length; i++) {
            if (kitsArr[i].letter === event.key.toUpperCase()) {
              addStyle(kitsArr[i].click);
            }
          }
        }
      }
    }

    window.addEventListener("keydown", keyPressed);
  }, [audioType, isMuted]);

  return (
    <div id="padsContainer">
      {kitsArr.map((value, index) => {
        return (
          <button
            key={index}
            className={
              clicked === value.click ? "clicked drum-pad" : "drum-pad"
            }
            id={audioType === "Heater" ? value.heaterName : value.pianoName}
            onClick={() => {
              addStyle(value.click);
              audioType === "Heater"
                ? handleClick(value.heaterName)
                : handleClick(value.pianoName);
            }}
          >
            {value.letter}
            <audio
              src={audioType === "Heater" ? value.heaterLink : value.pianoLink}
              className="clip"
              id={value.letter}
            ></audio>
          </button>
        );
      })}
    </div>
  );
}

export default Drumpads;
