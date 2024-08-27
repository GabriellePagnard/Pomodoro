import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, CircularProgressLabel, VStack, Text, useMediaQuery } from '@chakra-ui/react';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);

  // Utilisation de useMediaQuery pour ajuster la disposition des boutons en fonction de la taille de l'écran
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

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
        <Text fontSize="3xl" fontWeight="bold" color="cyan.900">
          {isBreak ? 'Pause ! 💤' : 'Temps de Concentration ! 🚀'}
        </Text>

        <Box position="relative" display="inline-flex" >
          <CircularProgress
            value={progress}
            size="200px"
            thickness="2px" // Réduit l'épaisseur du cercle
            color="cyan.900" // Utilise la couleur #065666
            trackColor="gray.200"
            capIsRound
          >
            <CircularProgressLabel fontSize="2xl" fontWeight="bold" color="cyan.900">
              {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>

        <Box
          display="flex"
          flexDirection={isLargerThan600 ? "row" : "column"} // Affichage en ligne ou en colonne selon la taille de l'écran
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
