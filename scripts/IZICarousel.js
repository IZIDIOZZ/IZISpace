class IZI_Carousel{

    constructor(customStyles){
        this.posicao = 0
        this.section_modal = document.querySelectorAll(".carousel-section");
        this.container = document.querySelector(".carousel");
        this.customStyles = customStyles;
        this.indica = window.onload = this.CreateIndicators(this);

        document.onkeydown = (e)=>{this.NavigateSection(e, this)};
        window.onload = this.CreateArrows(this);
    }
   
    CreateArrows(aux){

        let next = document.createElement('div');
        let back = document.createElement('div');

        next.classList.add("next");
        back.classList.add("back");

        next.addEventListener('click',function(){aux.Next()});
        back.addEventListener('click',function(){aux.Back()});

        // let container= document.querySelector(".carousel");
        aux.container.appendChild(back);
        aux.container.appendChild(next);
    }

    setIndicator(a) {
    
        var index = Array.from(a.parentElement.children).indexOf(a);
        this.posicao = index * 100;
    
        this.section_modal.forEach((a, i)=>{
            a.style.left = `-${this.posicao}%`;
            this.indica[i].style.backgroundColor = this.customStyles.indicatorUnselectedColor;
            i++;
        })
        
        this.indica[index].style.backgroundColor = this.customStyles.indicatorSelectedColor;
    }
    
    CreateIndicators(aux){
        
        var indi_parent = document.createElement("div");
        
        indi_parent.classList.add("indicator-container");
        indi_parent.id = "indicators";
    
        this.section_modal.forEach(()=>{
            var indi = document.createElement("div");
            indi.classList.add("indicator-img");
            indi.id = "indicator";
            indi.addEventListener("click",function(){aux.setIndicator(this);});
    
            indi_parent.appendChild(indi);
        });

        aux.container.appendChild(indi_parent);
        
        return document.querySelectorAll("[id='indicator']");
    }
    
     NavigateSection(e, aux) {
    
        e = e || window.event;
        

        switch(e.keyCode){
           case 37:
            //    left
            aux.Back()
            break;
          case 38:
            //   top
            aux.Next();
            break;
         case 39:
            //  right
            aux.Next();
            break; 
         case 40:
            //  bottom
            aux.Back();
            break; 
        }
    }
    
    Next() {
    
        if (this.posicao < ((this.section_modal.length - 1) * 100)) {
    
            this.posicao += 100;
            this.loopToNext();
            this.indica[this.posicao / 100].style.backgroundColor = customStyles.indicatorSelectedColor;
        }
        else {
            this.posicao -= this.posicao;
            this.loopToNext();
            this.indica[0].style.backgroundColor =  customStyles.indicatorSelectedColor;
    
        }
    }
    
     loopToNext(){
        this.section_modal.forEach((k, i)=>{
            k.style.left = `-${this.posicao}%`;
            this.indica[i].style.backgroundColor = customStyles.indicatorUnselectedColor;
        })
    }
    
    Back() {
    
        if (this.posicao > 0) {
            this.posicao -= 100;
            this.loopToBack( `-${this.posicao}%`);
            this.indica[(this.posicao / 100)].style.backgroundColor = "white";
        }
        else {
            this.loopToBack( "-" + ((this.section_modal.length - 1) * 100) + "%");
            this.posicao = (this.section_modal.length - 1) * 100;
            this.indica[this.section_modal.length - 1].style.backgroundColor = "white";
        }
    }
    
    loopToBack(left_param){
        this.section_modal.forEach((k, i)=>{
            k.style.left = left_param;
            this.indica[i].style.backgroundColor = customStyles.indicatorUnselectedColor;
        })
    }
}
