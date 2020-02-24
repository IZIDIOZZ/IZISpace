
// this function starts all components 
function Init({indicatorSelectedColor='white' , indicatorUnselectedColor ='rgba(214, 214, 214, 0.5)' } = {}){
  
    //passing arguments received to properties of
    this.customStyles = {
        indicatorSelectedColor : indicatorSelectedColor,
        indicatorUnselectedColor : indicatorUnselectedColor
    }

    const Carousel = new IZI_Carousel(this.customStyles);
}