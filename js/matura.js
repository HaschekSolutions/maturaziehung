jQuery.ajaxSetup({ cache: false });
var database = {};
var selectedsubject = undefined;
var drawInProgress = false;
loadData();

window.addEventListener("beforeunload", (event) => {
  if (!drawInProgress) return;
  event.preventDefault();
  event.returnValue = "";
});

$("#subjects").on("change", function () {
  var hash = this.value;
  if (hash !== undefined) {
    selectedsubject = hash;
    $("#subjectwrapper").html("<h2>Fach: " + database.subjects[hash] + "</h2>");
    $("#buttonwrapper").fadeIn();
  }
});

function ziehung() {
  drawInProgress = true;
  $("#ziehungbutton").fadeOut();
  var subj = selectedsubject;
  var topics = database[subj].topics;
  var keys = Object.keys(topics);
  var topicCount = keys.length;

  var r1 = Math.floor(Math.random() * topicCount);
  var r2 = Math.floor(Math.random() * topicCount);
  while (r2 == r1) {
    r2 = Math.floor(Math.random() * topicCount);
  }

  // Keys are 1-based
  var key1 = keys[r1];
  var key2 = keys[r2];
  var topic1 = topics[key1];
  var topic2 = topics[key2];

  // Show loader overlay during the suspense phase
  var loader = $(
    '<div class="loader-overlay">' +
      '<div class="spinner"></div>' +
      '<div class="spinner-text">Ziehung l&auml;uft&hellip;</div>' +
      "</div>",
  );
  $("body").append(loader);

  // Build the result HTML — cards start with placeholder text
  var html =
    '<h2 class="result-heading">Gezogene Themen</h2>' +
    '<div class="topic-card card-1" id="topic1">' +
    '<div class="card-shimmer"></div>' +
    '<span class="topic-number">?</span>' +
    '<span class="topic-text">. . .</span>' +
    "</div>" +
    '<div class="topic-card card-2" id="topic2">' +
    '<div class="card-shimmer"></div>' +
    '<span class="topic-number">?</span>' +
    '<span class="topic-text">. . .</span>' +
    "</div>";

  $("#output").html(html);

  // After a short suspense pause, hide loader and start the roulette
  setTimeout(function () {
    loader.fadeOut(250, function () {
      $(this).remove();

      // Reveal first card and start cycling
      var $card1 = $("#topic1");
      $card1.addClass("visible").addClass("cycling");

      cycleTopics($card1, keys, topics, key1, 18, function () {
        $card1.removeClass("cycling").addClass("revealed").addClass("locked");
        $card1.find(".card-shimmer").fadeOut(200);

        // After first card locks, start the second
        setTimeout(function () {
          var $card2 = $("#topic2");
          $card2.addClass("visible").addClass("cycling");

          cycleTopics($card2, keys, topics, key2, 20, function () {
            $card2
              .removeClass("cycling")
              .addClass("revealed")
              .addClass("locked");
            $card2.find(".card-shimmer").fadeOut(200);
            drawInProgress = false;
          });
        }, 250);
      });
    });
  }, 1000);
}

/**
 * Topic roulette: rapidly cycles through actual topics, decelerating
 * until it lands on the final one.
 *
 * @param {jQuery}    $card      The card element
 * @param {string[]}  keys       Array of topic keys (1-based strings)
 * @param {object}    topics     Map of key → topic text
 * @param {string}    finalKey   The key to land on
 * @param {number}    totalSteps Number of cycling steps
 * @param {function}  callback   Called when animation finishes
 */
function cycleTopics($card, keys, topics, finalKey, totalSteps, callback) {
  var $number = $card.find(".topic-number");
  var $text = $card.find(".topic-text");
  var step = 0;
  var topicCount = keys.length;

  function nextStep() {
    if (step >= totalSteps) {
      // Land on the final topic
      $number.text(finalKey);
      $text.text(topics[finalKey]);
      if (callback) callback();
      return;
    }

    // Pick a random topic; avoid showing the final one until the last step
    var idx;
    if (step < totalSteps - 2) {
      idx = Math.floor(Math.random() * topicCount);
    } else {
      // Near the end, avoid the final key so there's still a "reveal"
      do {
        idx = Math.floor(Math.random() * topicCount);
      } while (keys[idx] === finalKey);
    }

    var key = keys[idx];
    $number.text(key);
    $text.text(topics[key]);

    step++;

    // Quadratic deceleration: starts fast (~40ms), ends slow (~500ms)
    var progress = step / totalSteps;
    var delay = 40 + Math.pow(progress, 2.5) * 460;

    setTimeout(nextStep, delay);
  }

  nextStep();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loadData() {
  $.get(
    "data/database.json",
    function (data) {
      database = data;
      makeSelectBox(data.subjects);
    },
    "json",
  );
}

function makeSelectBox(subjects) {
  for (var key in subjects) {
    $("#subjects").append($("<option>", { value: key, text: subjects[key] }));
  }
}
