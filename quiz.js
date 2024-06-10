
const btn = document.querySelector("#next");
let index = 0;
let result = 0;
let totalMarks = 0;
let questionsArr = [];

// ShuffleArray Function
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const renderQuestion = (arr, div) => {
  if (index < arr.length) {
    const answerArr = [
      ...arr[index].incorrectAnswers,
      arr[index].correctAnswer,
    ];
    div.innerHTML += `
      <h1 id="questions">Q${index + 1}: ${arr[index].question.text}</h1>
      <ul>
      ${shuffleArray(answerArr).map(
      (items) => `
        <li>
        <input type="radio" name="choice" class="choice" id=${items} value=${items}><label for=${items}>${items}</label>
        </li>`
    )}
      </ul>
      `;
  } else {
    console.log("question completed");
    window.location = "result.html";
    localStorage.setItem(
      "result",
      JSON.stringify({
        totalMarks,
        result,
      })
    );
  }
};

// Btn Event Function
btn.addEventListener("click", () => {
  const div = document.querySelector("#questions");
  const choice = document.querySelectorAll(".choice");
  div.innerHTML = "";
  choice.forEach((item) => {
    if (item.checked) {
      if (item.nextElementSibling.innerHTML === questionsArr[index].correctAnswer) {
        result += 10;
      }
    }
  });
  index += 1;

  renderQuestion(questionsArr, div);
});

// Submit Function 

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  hello();
});

function hello() {
  const div = document.querySelector("#questions");
  div.innerHTML += "";
  div.innerHTML = `
    <h1 class="res">Result</h1>
    <h1>${result} out of ${totalMarks}</h1>
    <h4>Thank You For Attempting The Quiz</h4>

  `;
  const nextButton = document.querySelector("#next");
  const submitButton = document.querySelector("#submit");
  nextButton.style.display = "none";
  submitButton.style.display = "none";
}


// Function of async await
const getQuestions = async () => {
  try {
    const data = await fetch("https://the-trivia-api.com/v2/questions");
    const response = await data.json();
    console.log(response);
    questionsArr = response;
    totalMarks = response.length * 10;
    const div = document.querySelector("#questions");

    renderQuestion(questionsArr, div)

  } catch (error) {
    console.log("error===>", error);
  }
};

getQuestions();