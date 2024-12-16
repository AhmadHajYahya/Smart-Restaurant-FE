import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

// Define your keyframes for the animation
const rotate = keyframes`
  0% {
    stroke-dashoffset: 440;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimerWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const SvgContainer = styled.svg`
  transform: rotate(-90deg);
  width: 150px;
  height: 150px;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 10;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: #3498db;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
  animation: ${rotate} ${(props) => props.d * 60}s linear forwards;
`;

const InnerCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

function CircularTimeCounter({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const intervalRef = useRef(null);

  // Save the time left to local storage so it persists across navigations
  useEffect(() => {
    const savedTime = localStorage.getItem("timeLeft");
    if (savedTime) {
      setTimeLeft(parseInt(savedTime, 10));
    } else {
      setTimeLeft(duration * 60); // Initial setup
    }
  }, [duration]);

  // Update the timer and handle intervals
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      localStorage.removeItem("timeLeft");
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        const updatedTime = prevTime - 1;
        localStorage.setItem("timeLeft", updatedTime);
        return updatedTime;
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Container>
      <TimerWrapper>
        <SvgContainer>
          <CircleBackground cx="75" cy="75" r="70" />
          <CircleProgress cx="75" cy="75" r="70" d={duration} />
        </SvgContainer>
        <InnerCircle>{formatTime(timeLeft)}</InnerCircle>
      </TimerWrapper>
    </Container>
  );
}

export default CircularTimeCounter;
