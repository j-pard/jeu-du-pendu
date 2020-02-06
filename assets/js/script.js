(async () => {
  let word = "Bonjour";
  const getWord = async () => {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?key=HF42K463&number=1"
    );
    const data = await response.json();
    if (typeof data != "string") {
      console.log("test");
      word = data;
    } else {
      getWord();
    }
  };
  await getWord();
  console.log(word);
})();
