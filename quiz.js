
// const div = document.querySelector("#quiz");
// const btn = document.querySelector("#next");
// let index = 0;
// let result = 0;
// let totalMarks = 0;
// let questionsArr = [];

// // ShuffleArray Function 

// function shuffleArray(arr) {
//   for (let i = arr.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }


// const renderQuestion = (arr) => {
//   if (index < questionsArr.length) {
//     const answerArr = [
//       ...arr[index].incorrectAnswers,
//       arr[index].correctAnswer,
//     ];
//     // console.log(answerArr);
//     div.innerHTML += `
//       <h1>Q${index + 1}: ${arr[index].question.text}</h1>
//       <ul>
//       ${shuffleArray(answerArr).map(
//       (items) => `
//         <li>
//         <input type="radio" name="choice" class="choice" id=${items} value=${items}><label for=${items}>${items}</label>
//         </li>`
//     )}
//       </ul>
//       `;
//   } else {
//     console.log("question completed");
//     window.location = "result.html";
//     localStorage.setItem(
//       "result",
//       JSON.stringify({
//         totalMarks,
//         result,
//       })
//     );
//   }
// };

// // Btn Event Function 

// btn.addEventListener("click", () => {
//   const choice = document.querySelectorAll(".choice");
//   div.innerHTML = "";
//   choice.forEach((item) => {
//     if (item.checked) {
//       if (item.nextElementSibling.innerHTML === questionsArr[index].correctAnswer) {
//         result += 10;
//       }
//     }
//   });
//   index += 1;
//   renderQuestion(questionsArr)
// });


// // Founction of async await 


// const getQuestions = async () => {

//   try {
//     const data = await fetch("https://the-trivia-api.com/v2/questions");
//     const response = await data.json();
//     console.log(response);
//     totalMarks = response.lenght * 10;
//     renderQuestion = response;
//   } catch (error) {
//     console.log("error===>", error);
//   }
// };

// getQuestions();








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