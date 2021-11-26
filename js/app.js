/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */
//Section Class 
class Section {

    //Section Id
    sectionsId = 0;

    //Section Html Content
    get seactionHtmlContent() {
        return `
       <section id="section${this.sectionsId}"  data-nav="Section ${this.sectionsId}" >
       <div class="landing-container">
          <h2>Section ${this.sectionsId}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Morbi fermentum metus faucibus lectus pharetra dapibus. 
           Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. 
           Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. 
           Sed convallis sollicitudin mauris ac tincidunt. 
           Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. 
           Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. 
           Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. 
           Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
          
          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. 
          Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. 
          Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. 
          Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. 
          Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. 
          Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. 
          Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
          </div>
          </section>
          `
    };

    //Add Section To Page
    addSection() {
        this.sectionsId += 1;
        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', this.seactionHtmlContent);
    }

}
const section = new Section();

//Nav Class

class Navbar {
    //Menu Element Selected By Id 
    menuElement = document.getElementById('nav-bar-list');

    //Build Li
    buildLi() {
        this.menuElement.innerHTML = '';
        document.querySelectorAll('section')
            .forEach(element => {
                this.menuElement.insertAdjacentHTML('beforeend', `<li><a class="menu-link" href="#${element.id}" data-section-id="${element.id}"  >${element.dataset.nav}</a></li>`);
            });
        this.goToSection();
    }

    //Go To Section
    goToSection() {
        this.menuElement.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById(event.target.dataset.sectionId)
                .scrollIntoView({
                    behavior: "smooth"
                });
            activeClass(event.target.dataset.sectionId)
        });
    }

}
const menu = new Navbar()

section.addSection();
section.addSection();
section.addSection();
section.addSection();


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// Set sections as active
function activeClass(id) {

    //Set Link Active
    document.querySelector('.link-active') ?.classList.remove('link-active');
    document.querySelector(`[href="#${id}"]`)
        .classList.add('link-active');

    //Set Section Active
    document.querySelector('.your-active-class') ?.classList.remove('your-active-class');
    document.querySelector(`#${id}`)
        .classList.add('your-active-class');


}

//Check what is section on screen now

function SectionScreen(element, buff) {
    buff = typeof buff === 'undefined' ? 0 : buff;

    // Get element's position in the viewport
    const rect = element.getBoundingClientRect();

    // Check if element is in the viewport 
    if (rect.top >= buff && rect.left >= buff &&
        rect.right <=
        ((window.innerWidth || document.documentElement.clientWidth) - buff) &&
        rect.bottom <=
        ((window.innerHeight || document.documentElement.clientHeight) - buff)) {
        return true
    } else {
        return false;
    }
}
window.addEventListener('scroll', () => {
    document.querySelectorAll('section')
        .forEach(element => {
            if (SectionScreen(element, -600)) {
                activeClass(element.id);
            }
        });

});



menu.buildLi();