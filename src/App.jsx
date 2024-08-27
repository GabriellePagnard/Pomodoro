import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, CircularProgressLabel, VStack, Text } from '@chakra-ui/react';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          if (isBreak) {
            setMinutes(25);
            setIsBreak(false);
          } else {
            setMinutes(5);
            setIsBreak(true);
          }
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }

        const totalSeconds = isBreak ? 5 * 60 : 25 * 60;
        const remainingSeconds = minutes * 60 + seconds;
        setProgress((remainingSeconds / totalSeconds) * 100);
      }, 1000);
    } else if (!isActive && minutes !== 0 && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setProgress(100);
  };

  return (
    <Box
      display="inline-flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="rgba(255, 255, 255, 0.3)"
      borderRadius="16px"
      p={6}
      boxShadow="md"
    >
      <VStack spacing={8} align="center">
        <Text fontSize="3xl" fontWeight="bold">
          {isBreak ? 'Pause ! 💤' : 'Temps de Concentration ! 🚀'}
        </Text>

        <Box position="relative" display="inline-flex">
          <CircularProgress
            value={progress}
            size="200px"
            thickness="6px"
            color="cyan.500"
            trackColor="gray.200"
          >
            <CircularProgressLabel fontSize="2xl" color="cyan.800">
              {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>

        <VStack spacing={4}>
          <Button colorScheme="teal" onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Pause' : 'Démarrer'}
          </Button>
          <Button colorScheme="red" onClick={resetTimer}>
            Réinitialiser
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default App;
