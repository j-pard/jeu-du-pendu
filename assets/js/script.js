(async () => {
  // needed variables
  let tries = 0;
  let word = "Bonjour";

  /*
   * Try to get a word from the api asynchronously and update the value of the word in the game
   *
   * input: nothing
   * output: nothing
   *
   */
  const getWord = async () => {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?key=BO4MEEGG&number=1"
    );
    const data = await response.json();
    if (typeof data != "string") {
      console.log("test");
      word = data[0].toUpperCase();
    } else {
      getWord();
    }
  };
  /*
   * check ifp arty is over and update game status
   *
   * input: nothing
   * output: nothing
   *
   */
  const checkIfpartyIsOver = () => {
    if (arrFound.filter(e => e == null).length == 0) {
      alert(`Well done you found it! Billy is free!`);
      endGame();
    } else if (tries > 5) {
      alert(`Too bad Billy died!`);
      endGame();
    }
  };

  /*
   * end the game
   *
   * input: nothing
   * output: nothing
   *
   */
  const endGame = () => {
    //Display right word

    //block onClick event
    document
      .getElementsByClassName("buttons-container")[0]
      .childNodes.forEach(e => (e.className = "failed"));
  };

  /*
   * Update buttons and found array for an inputed letter
   *
   * input: Char letter
   * output: nothing
   *
   */
  const updateFound = letter => {
    let found = false;
    for (let i = 0; i < arrWord.length; i++) {
      if (arrWord[i] == letter) {
        arrFound[i] = letter;
        found = true;
      }
    }

    if (found) {
      document.getElementById(letter).className = "success";
    } else {
      document.getElementById(letter).className = "failed";
      tries++;
    }

    // found
    //   ? (document.getElementById(letter).className = "success")
    //   : (document.getElementById(letter).className = "failed");
    checkIfpartyIsOver();
    displayFound();
  };

  /*
   * Update in the DOM the displayed divs with founded letter
   *
   * input: nothing
   * output: nothing
   *
   */
  const displayFound = () => {
    document.getElementById("word").childNodes.forEach((div, i) => {
      div.innerText = arrFound[i - 1] != null ? arrFound[i - 1] : "";
    });
  };

  await getWord();
  const arrWord = word.split("");
  console.log(arrWord);
  let arrFound = new Array(arrWord.length).fill(null);
  console.log(arrFound);

  // place empty div for each letters of the word
  arrWord.forEach(e => {
    const node = document.createElement("DIV");
    const textnode = document.createTextNode(" ");
    node.className = "letters";
    node.appendChild(textnode);
    document.getElementById("word").appendChild(node);
  });

  // event listener
  document
    .getElementsByClassName("buttons-container")[0]
    .childNodes.forEach(btn => {
      btn.addEventListener("click", e => {
        if (e.target.className == "failed") {
          console.error("alredy used");
        } else {
          console.log(e.target.id);
          updateFound(e.target.id);
        }
      });
    });
})();
