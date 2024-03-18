import React, { useCallback, useEffect, useState } from "react";

function Controls({ passedIdValue, allelements, currentAudioType, muteAudio }) {
  const splitArr = passedIdValue.split("_");
  const finalString = splitArr.join(" ");
  let isDragging = false;
  let powerOn = true;
  let bankOn = false;
  const [percentage, setPercentage] = useState(50);
  const [audioElements, setAudioElements] = useState([]);
  const [audioType, setAudioType] = useState("Heater");

  //Parse the allelements that has been recieved from App.jsx to a state variable audioElements.
  useEffect(() => {
    setAudioElements(allelements);
  }, [allelements]);

  useEffect(() => {
    currentAudioType(audioType)
  }, [audioType])

  // Function that handles mouseDown on the scrollbar
  const handleMouseDown = useCallback((event) => {
    isDragging = true;
    const display = document.getElementById("display");
    const scrollBar = document.getElementById("scrollBar");
    const slider = document.getElementById("slider");
    const scrollBarRect = scrollBar.getBoundingClientRect();
    setPercentage(() => {
      const newPercentage =
        ((event.clientX - scrollBarRect.left) / scrollBarRect.width) * 100;
      slider.style.left = newPercentage + "%";
      display.textContent = `Volume: ${Math.floor(newPercentage)}`;
      return Math.round(newPercentage);
    });
  }, []);

  //Function that handles when the mouse is down and moves
  const handleMouseMove = useCallback((event) => {
    const display = document.getElementById("display");
    const scrollBarRect = scrollBar.getBoundingClientRect();

    const slider = document.getElementById("slider");

    setPercentage((prevPercentage) => {
      const newPercentage =
        ((event.clientX - scrollBarRect.left) / scrollBarRect.width) * 100;
      if (isDragging && newPercentage <= 100 && newPercentage >= 0) {
        slider.style.left = newPercentage + "%";
        display.textContent = `Volume: ${Math.floor(newPercentage)}`;
        return Math.round(newPercentage);
      }
      return prevPercentage;
    });
  }, []);

  const handleMouseUp = () => {
    isDragging = false;
  };

  // Upon Powe Toggle.
  const handlePowerToggle = () => {
    const power = document.getElementById("power");
    const display = document.getElementById("display");
    const scrollBar = document.getElementById("scrollBar");
    const bankToggle = document.getElementById("bankToggle");
    if (powerOn) {
      muteAudio(powerOn);
      power.style.marginLeft = "0px";
      power.style.backgroundColor = "red";
      display.textContent = "Power OFF";
      scrollBar.style.pointerEvents = "none";
      bankToggle.style.pointerEvents = "none";
      powerOn = false;
    } else {
      muteAudio(powerOn);
      power.style.marginLeft = "23px";
      power.style.backgroundColor = "green";
      display.textContent = "Power ON";
      setTimeout(() => (display.textContent = ""), 2000);
      scrollBar.style.pointerEvents = "all";
      bankToggle.style.pointerEvents = "all";
      powerOn = true;
    }
  };

  // Upon Bank toggle. Switches from the Heater Kit to Piano Kit.
  const handleBankToggle = () => {
    const bank = document.getElementById("bank");
    const display = document.getElementById("display");
    if (bankOn) {
      display.textContent = "Heater Kit";
      bank.style.marginLeft = "0px";
      setAudioType("Heater");
      bankOn = false;
    } else {
      display.textContent = "Smooth Piano Kit";
      bank.style.marginLeft = "23px";
      setAudioType("Piano");
      bankOn = true;
    }
  };
  useEffect(() => {
    if (audioElements) {
      audioElements.forEach((audio) => {
        if (!isNaN(percentage)) {
          audio.volume = percentage / 100;
        } else {
          console.log("invalid Percentage value: ", percentage);
        }
      });
    }
  }, [audioElements, percentage]);

  //event listeners to be added when component fully mounts.
  useEffect(() => {
    const scrollBar = document.getElementById("scrollBar");
    scrollBar.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    const powerToggle = document.getElementById("powerToggle");
    powerToggle.addEventListener("click", handlePowerToggle);

    const bankToggle = document.getElementById("bankToggle");
    bankToggle.addEventListener("click", handleBankToggle);
  }, []);

  return (
    <div className="controls">
      <div className="control">
        <p>Power</p>
        <div className="toggleContainer" id="powerToggle">
          <div className="toggle" id="power"></div>
        </div>
      </div>
      <div className="control">
        <div id="display">{finalString}</div>
      </div>
      <div className="control">
        <div id="scrollBar">
          <div id="slider"></div>
        </div>
      </div>
      <div className="control">
        <p>Bank</p>
        <div className="toggleContainer" id="bankToggle">
          <div className="toggle" id="bank"></div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
