(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

fillProjects();
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("project-column");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("show");
    if(c === 'all'){
      x[i].classList.add("show");
    }
    else if (x[i].classList.contains(c)) x[i].classList.add("show");
  }
}


var btnContainer = document.getElementById("project-btns");
var btns = btnContainer.getElementsByClassName("project-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = btnContainer.getElementsByClassName("active");
    console.log(this.innerHTML)
    current[0].classList.remove('active')
    this.classList.add('active');
  });
}
function fetchJSONData(jsonPath) {
  return fetch(jsonPath)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Unable to fetch data:", error);
    });
}

async function fillProjects() {
  const p = document.getElementById('project-gallery');
  try {
    const projects = await fetchJSONData("./js/projects.json");
    let html = '';
    for (let index = 0; index < projects.length; index++) {
      const element = projects[index];
      let tagsHtml = '';
      for (let tagIndex = 0; tagIndex < element.tags.length; tagIndex++) {
        const tag = element.tags[tagIndex];
        tagsHtml += '<p class="tag-txt">'+ tag+'</p>'
      }
      html += '<div class="project-column '+ element.category+'">\
        <a href="' + element.url + '">\
          <div class="project-content">\
            <img src="'+element.img+'" class="project-content-img">\
            <div class="img-inner-text">\
              <h4>'+element.name+'</h4>\
              <p>'+element.desc+'</p>\
              <div class="tags">'+ tagsHtml +'\
              </div>\
            </div>\
          </div>\
        </a>\
      </div>';
    }
    p.innerHTML = html;
  filterSelection("all"); 

  } catch (error) {
    console.error("Unable to fetch data:", error);
  }
}

