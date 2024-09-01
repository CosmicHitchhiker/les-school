function toggleQuestion(questionNumber) {
    var answer = document.getElementById("answer" + questionNumber);
    var allAnswers = document.querySelectorAll('.answer');
  
    allAnswers.forEach(function(item) {
      if (item !== answer) {
        item.style.display = 'none';
      }
    });
  
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  }
  
