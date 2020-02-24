class IZI_Carousel{

    //creates the class constructor with variables that will be used by the functions below
    constructor(customStyles){
        this.position = 0
        this.carousel_section = document.querySelectorAll(".carousel-section");
        this.carousel = document.querySelector(".carousel");
        this.customStyles = customStyles;

        this.indicator = window.onload = this.createIndicators(this);

        document.onkeydown = (e)=>{this.navigateArrowCarousel(e, this)};
        window.onload = this.createArrows(this);

    }
   
    //create the arrows to pass the carousel images
    createArrows(aux){

       // these two lines create arrows to move forward and backward in the images
        let next = document.createElement('div');
        let back = document.createElement('div');

        //add classes to the arrows 
        next.classList.add("next");
        back.classList.add("back");

        // add events that contain functions to move images back and forth
        next.addEventListener('click',function(){aux.next()});
        back.addEventListener('click',function(){aux.back()});

        //add the arrows to parent Carousel
        aux.carousel.appendChild(back);
        aux.carousel.appendChild(next);
    }

    //create the indicator image in bottom of carousel
    createIndicators(aux){
        
        //create a div element
        var indi_parent = document.createElement("div");
        
       //add a class and an id to the indicator( both exist in IZiComponents.css)
        indi_parent.classList.add("indicator-container");
        indi_parent.id = "indicators";
        
        //create indicators based on the number of images in the container 
        this.carousel_section.forEach(()=>{
            
            //create div element
            var indi = document.createElement("div");
            //add class and id who already exist in css file
            indi.classList.add("indicator-img");
            indi.id = "indicator";

            //add Event 
            indi.addEventListener("click",function(){aux.setIndicator(this);});
            
            //insert the created divs elements into the indicator parent
            indi_parent.appendChild(indi);
        });

        //add the parent indicator to the carousel
        aux.carousel.appendChild(indi_parent);
        
     
        // returns all created indicators
        return document.querySelectorAll("[id='indicator']");
    }

   // define the position of the image indicator through the clicked index
    setIndicator(a) {
        
       
        // get the index value of the clicked indicator
        var index = Array.from(a.parentElement.children).indexOf(a);

        
        /* multiplies the index value of the indicator by 100
        to be used in the 'left' property of the Carousel */
        this.position = index * 100;
    
       
        /* cycle through all existing carousels
        on the page and adds the value of position */
        this.carousel_section.forEach((a, i)=>{

            // insert the position value for all the carousels
            a.style.left = `-${this.position}%`;

            // defines default color for all indicator 
            this.indicator[i].style.backgroundColor = this.customStyles.indicatorUnselectedColor;
            i++;
        })
        
        //define 'indicatorSelectedColor' color from the selected indicator
        this.indicator[index].style.backgroundColor = this.customStyles.indicatorSelectedColor;
    }
    
    //navigate into the carousel ugin the arrrows of keyboard
     navigateArrowCarousel(e, aux) {
        
        // get the event off key pressed
        e = e || window.event;
        
        //get the value of key pressed then Go Next Or Back
        switch(e.keyCode){
         
          case 40: //ArrowDown
          case 37: //ArrowLeft

            //goes to a previous image on the carousel
            aux.back()
            break;
          case 39: //ArrowRight
          case 38: //ArrowUp

            // goes forward image 
            aux.next();
            break;
        }
    }
    
    // goes to the next carousel image
    next() {
    
        
       
        // check that the selected carousel image does not exceed the container
        if (this.position < ((this.carousel_section.length - 1) * 100)) {

            //add plus 100 to each container image existent
            this.position += 100;

            //call the function who moves to the next container image
            this.loopToNext();

            //set 'indicatorSelectedColor' color from the indicator with the index of position/100 (0,1,2,...)
            this.indicator[this.position / 100].style.backgroundColor = customStyles.indicatorSelectedColor;
        }
        else {

            //return to the first carousel image
            this.position = 0;
            this.loopToNext();

            //set 'indicatorSelectedColor' to first indicator
            this.indicator[0].style.backgroundColor =  customStyles.indicatorSelectedColor;
    
        }
    }
    
    //goes to next container image
     loopToNext(){

        
        // iterates the carousel_section variable and places the next container image on the screen
        this.carousel_section.forEach((k, i)=>{

            //get the position value and sets to left property of all container images
            k.style.left = `-${this.position}%`;

            //set default style to indicator
            this.indicator[i].style.backgroundColor = customStyles.indicatorUnselectedColor;
        })
    }
    
    back() {
      
        // check if there is an image of the container on the left
        if (this.position > 0) {

            //remove 100% of left property of all containers image
            this.position -= 100;
            
            this.loopToBack( `-${this.position}%`);

            //set default style for indicator
            this.indicator[(this.position / 100)].style.backgroundColor = customStyles.indicatorSelectedColor;
        }
        else {

            // goes to last container image 
            this.loopToBack( "-" + ((this.carousel_section.length - 1) * 100) + "%");

            //get position value multiplied for the length of containers image
            this.position = (this.carousel_section.length - 1) * 100;

            //set default style for indicator
            this.indicator[this.carousel_section.length - 1].style.backgroundColor = customStyles.indicatorSelectedColor;
        }
    }
    
    //goes back to previous image on the carousel
    loopToBack(left_param){
        this.carousel_section.forEach((k, i)=>{

            //use the value of position to move the container image
            k.style.left = left_param;
            
            //set deafult styles for indicator
            this.indicator[i].style.backgroundColor = customStyles.indicatorUnselectedColor;
        })
    }
}
