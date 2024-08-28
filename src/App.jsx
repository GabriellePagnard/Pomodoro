import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, CircularProgressLabel, VStack, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';

/**
 * Composant principal de l'application Pomodoro.
 * Gère le minuteur, la personnalisation des durées de travail et de pause,
 * ainsi que l'affichage du cercle de progression.
 */
function App() {
  // État pour la gestion du minuteur
  const [minutes, setMinutes] = useState(25); // Minutes restantes
  const [seconds, setSeconds] = useState(0); // Secondes restantes
  const [isActive, setIsActive] = useState(false); // Si le minuteur est actif ou en pause
  const [isBreak, setIsBreak] = useState(false); // Si le minuteur est en mode pause
  const [progress, setProgress] = useState(100); // Progression du cercle
  const [workMinutes, setWorkMinutes] = useState(25); // Durée personnalisée de travail
  const [breakMinutes, setBreakMinutes] = useState(5); // Durée personnalisée de pause

  // États pour les inputs (comme chaînes de caractères pour gérer la saisie)
  const [workInput, setWorkInput] = useState(String(workMinutes));
  const [breakInput, setBreakInput] = useState(String(breakMinutes));

  // Fonction pour jouer un son d'alerte à la fin du minuteur
  const playSound = () => {
    const audio = new Audio('/assets/alarm.mp3');
    audio.play();
  };

  // Utilisation d'un effet pour gérer le minuteur
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          playSound();
          // Alterne entre le temps de travail et de pause
          if (isBreak) {
            setMinutes(workMinutes);
            setIsBreak(false);
          } else {
            setMinutes(breakMinutes);
            setIsBreak(true);
          }
        } else if (seconds === 0) {
          // Si les secondes atteignent zéro, décrémente les minutes et réinitialise les secondes
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          // Décrémente les secondes
          setSeconds((prevSeconds) => prevSeconds - 1);
        }

        // Mise à jour de la progression du cercle
        const totalSeconds = isBreak ? breakMinutes * 60 : workMinutes * 60;
        const remainingSeconds = minutes * 60 + seconds;
        setProgress((remainingSeconds / totalSeconds) * 100);
      }, 1000);
    } else if (!isActive && minutes !== 0 && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak, workMinutes, breakMinutes]);

  // Fonction pour réinitialiser le minuteur
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workMinutes);
    setSeconds(0);
    setProgress(100);
  };

  // Sauvegarde des préférences de durées dans le localStorage
  useEffect(() => {
    localStorage.setItem("workMinutes", workMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);
  }, [workMinutes, breakMinutes]);

  // Récupération des préférences de durées depuis le localStorage
  useEffect(() => {
    const savedWorkMinutes = localStorage.getItem("workMinutes");
    const savedBreakMinutes = localStorage.getItem("breakMinutes");
    if (savedWorkMinutes) setWorkMinutes(Number(savedWorkMinutes));
    if (savedBreakMinutes) setBreakMinutes(Number(savedBreakMinutes));
  }, []);

  // Gère la saisie des minutes de travail
  const handleWorkInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== '') {
      setWorkInput(value);
      setWorkMinutes(Number(value));
    } else if (value === '') {
      setWorkInput('');
    }
  };

  // Gère la saisie des minutes de pause
  const handleBreakInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== '') {
      setBreakInput(value);
      setBreakMinutes(Number(value));
    } else if (value === '') {
      setBreakInput('');
    }
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
              value={workInput}
              onChange={handleWorkInputChange}
              size="sm"
              type="text" // Utilise "text" pour gérer correctement la saisie
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
              value={breakInput}
              onChange={handleBreakInputChange}
              size="sm"
              type="text" // Utilise "text" pour gérer correctement la saisie
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
