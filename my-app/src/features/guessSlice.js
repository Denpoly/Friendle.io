import { createSlice } from '@reduxjs/toolkit'
import { isWordValid, randomWord } from '../util/randomWordPicker';
import { userWon, resetRoundSocket } from '../app/actionCreator';
const initialState = {
    guesses: ["","","","","",""],
    guessCount: 0,
    currentGuess: "",
    correctWord: randomWord(),
    letters: {'q':0, 'w':0, 'e':0, 'r':0, 't':0, 'y':0, 'u':0,'i':0,'o':0,'p':0,
                'a':0,'s':0, 'd':0,'f':0,'g':0,'h':0,'j':0,'k':0, 'l':0,
                'z':0,'x':0,'c':0,'v':0,'b':0,'n':0, 'm':0}
}

const guessSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    saveGuess : (state,action) => {
        if (state.currentGuess.length == 5 && isWordValid(state.currentGuess) && !state.guesses.includes(state.currentGuess)){
            if(state.currentGuess == state.correctWord){
                console.log("you won")
                if(action.payload.inRound){
                    action.asyncDispatch(userWon(action.payload.userName, action.payload.roomId));
                }
                
                state.correctWord = randomWord();
                state.guessCount = 0;
                state.currentGuess = "";
                state.guesses = ["","","","","",""]
                state.letters = {'q':0, 'w':0, 'e':0, 'r':0, 't':0, 'y':0, 'u':0,'i':0,'o':0,'p':0,
                                'a':0,'s':0, 'd':0,'f':0,'g':0,'h':0,'j':0,'k':0, 'l':0,
                                'z':0,'x':0,'c':0,'v':0,'b':0,'n':0, 'm':0};
            }
            else {
                const guessArr = state.currentGuess.split("");
                const correctArr = state.correctWord.split("");
                state.guesses[state.guessCount] = state.currentGuess;
                state.guessCount ++
                state.currentGuess = ""
                
                console.log(guessArr);
                guessArr.forEach((letter, index) => {
                    console.log(letter);
                    if(correctArr[index] == letter) {
                        state.letters[letter] = 1;
                    } else if (correctArr.includes(letter)) {
                        state.letters[letter]= 2;
                    } else {
                        state.letters[letter]= 3;
                    }
                })
            }
        }
    },
    saveLetterToGuess : (state, action) => {
        if(state.currentGuess.length < 5) {
            state.currentGuess = state.currentGuess + action.payload.toLocaleLowerCase()
        }
    },
    deleteLetterFromGuess: (state, action) => {
        if(state.currentGuess.length > 0) {
            state.currentGuess = state.currentGuess.slice(0,-1)
        }
    },
    newWord: (state, action) => {
        console.log("in newWord");
        state.correctWord = action.newWord;
    },
    resetRound: (state, action) => {
        state.correctWord = randomWord();
        state.guessCount = 0;
        state.currentGuess = "";
        state.guesses = ["","","","","",""]
        state.letters = {'q':0, 'w':0, 'e':0, 'r':0, 't':0, 'y':0, 'u':0,'i':0,'o':0,'p':0,
        'a':0,'s':0, 'd':0,'f':0,'g':0,'h':0,'j':0,'k':0, 'l':0,
        'z':0,'x':0,'c':0,'v':0,'b':0,'n':0, 'm':0};
        action.asyncDispatch(resetRoundSocket());
    }

  }
});

export const {saveGuess, saveLetterToGuess, deleteLetterFromGuess} = guessSlice.actions

export const selectGuesses = state => state.guesses.guesses

export const selectCurrentGuess = state => state.guesses.currentGuess

export default guessSlice.reducer


