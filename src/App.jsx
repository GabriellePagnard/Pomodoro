import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, CircularProgressLabel, VStack, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  // Son d'alerte à jouer lorsque le timer se termine
  const playSound = () => {
    const audio = new Audio('/assets/alarm.mp3');
    audio.play();
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          playSound();
          if (isBreak) {
            setMinutes(workMinutes);
            setIsBreak(false);
          } else {
            setMinutes(breakMinutes);
            setIsBreak(true);
          }
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }

        const totalSeconds = isBreak ? breakMinutes * 60 : workMinutes * 60;
        const remainingSeconds = minutes * 60 + seconds;
        setProgress((remainingSeconds / totalSeconds) * 100);
      }, 1000);
    } else if (!isActive && minutes !== 0 && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak, workMinutes, breakMinutes]);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workMinutes);
    setSeconds(0);
    setProgress(100);
  };

  useEffect(() => {
    localStorage.setItem("workMinutes", workMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);
  }, [workMinutes, breakMinutes]);

  useEffect(() => {
    const savedWorkMinutes = localStorage.getItem("workMinutes");
    const savedBreakMinutes = localStorage.getItem("breakMinutes");
    if (savedWorkMinutes) setWorkMinutes(Number(savedWorkMinutes));
    if (savedBreakMinutes) setBreakMinutes(Number(savedBreakMinutes));
  }, []);

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
        <Text fontSize="3xl" fontWeight="bold" color="cyan.900">
          {isBreak ? 'Pause ! 💤' : 'Temps de Concentration ! 🚀'}
        </Text>

        <Box position="relative" display="inline-flex">
          <CircularProgress
            value={progress}
            size="200px"
            thickness="4px"
            color={isBreak ? "pink.500" : "cyan.900"} // Change la couleur en fonction de l'état isBreak
            trackColor="gray.200"
            capIsRound
          >
            <CircularProgressLabel fontSize="2xl" fontWeight="bold" color={isBreak ? "pink.500" : "cyan.900"}>
              {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>

        {/* Champs de personnalisation des durées */}
        <VStack spacing={4} align="center" width="100%">
          <FormControl>
            <FormLabel color="gray.800" fontWeight="bold">Durée de travail (minutes)</FormLabel>
            <Input
              placeholder="Durée de travail"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              size="sm"
              type="number"
              width="100%"
              focusBorderColor="gray.400"
              borderColor="gray.400"
              color="gray.200"
              _placeholder={{ color: 'gray.600' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.800" fontWeight="bold">Durée de pause (minutes)</FormLabel>
            <Input
              placeholder="Durée de pause"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              size="sm"
              type="number"
              width="100%"
              focusBorderColor="gray.400"
              borderColor="gray.400"
              color="gray.200"
              _placeholder={{ color: 'gray.600' }}
            />
          </FormControl>
        </VStack>

        <Box
          display="flex"
          flexDirection="row"
          gap={4}
        >
          <Button
            colorScheme="purple"
            bg="purple.900"
            size="lg"
            textTransform="uppercase"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause' : 'Démarrer'}
          </Button>
          <Button
            colorScheme="pink"
            bg="pink.900"
            size="lg"
            textTransform="uppercase"
            onClick={resetTimer}
          >
            Réinitialiser
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
