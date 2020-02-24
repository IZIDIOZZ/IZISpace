

function Init({indicatorSelectedColor='white' , indicatorUnselectedColor ='rgba(214, 214, 214, 0.5)' } = {}){
  
    this.customStyles = {
        indicatorSelectedColor : indicatorSelectedColor,
        indicatorUnselectedColor : indicatorUnselectedColor
    }

    const Carousel = new IZI_Carousel(this.customStyles);
}