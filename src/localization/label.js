// ES6 module syntax
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   enter_m:"Enter Columns(m)",
   enter_n:"Enter Rows(n)",
   placeholder_m:"Enter size of the Columns(m)",
   placeholder_n:"Enter size of the Rows(n)",
   submit_button_label:"Create Minesweeper",
   form_title:"Create your own customized minesweeper",
   reset:"Reset",
   game_over_title:"Game Over !!!",
   next_steps:"Start Over Again",
   restart:"Restart",
   create_new_game:"Replay or Create a diff size game",
   game_completed:"You Won The Game !!! "
 }
});

export default strings;